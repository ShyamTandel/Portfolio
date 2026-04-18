import { useEffect, useRef } from "react";
import { gsap } from "gsap";

import defaultPreview from "@/assets/delta-preview.svg";

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);
const lerp = (start: number, end: number, amount: number) => start + (end - start) * amount;

type LiquidRipple = {
  alpha: number;
  life: number;
  radius: number;
  x: number;
  y: number;
};

const InteractiveCursor = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const auraRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const previewImageRef = useRef<HTMLImageElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const supportsFinePointer = window.matchMedia("(pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!supportsFinePointer || prefersReducedMotion) {
      return;
    }

    const root = rootRef.current;
    const cursor = cursorRef.current;
    const aura = auraRef.current;
    const label = labelRef.current;
    const preview = previewRef.current;
    const previewImage = previewImageRef.current;
    const light = lightRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (!root || !cursor || !aura || !label || !preview || !previewImage || !light || !canvas || !context) {
      return;
    }

    document.documentElement.classList.add("has-custom-cursor");

    const position = { x: window.innerWidth * 0.5, y: window.innerHeight * 0.5 };
    const target = { ...position };
    const pointerVelocity = { value: 0 };
    const liquidIntensity = { value: 0.34 };
    const hoverStrength = { value: 0 };
    const ripples: LiquidRipple[] = [];
    const cleanups: Array<() => void> = [];
    const devicePixelRatio = Math.min(window.devicePixelRatio || 1, 2);

    let frame = 0;
    let lastFrameTime = performance.now();
    let lastTrailTime = 0;
    let lastImageTrailTime = 0;
    let hoveredElement: HTMLElement | null = null;
    let activePreview = "";

    const cursorX = gsap.quickSetter(cursor, "x", "px");
    const cursorY = gsap.quickSetter(cursor, "y", "px");
    const auraX = gsap.quickSetter(aura, "x", "px");
    const auraY = gsap.quickSetter(aura, "y", "px");
    const previewX = gsap.quickSetter(preview, "x", "px");
    const previewY = gsap.quickSetter(preview, "y", "px");
    const lightX = gsap.quickSetter(light, "x", "px");
    const lightY = gsap.quickSetter(light, "y", "px");

    gsap.set([cursor, aura, preview, light], { xPercent: -50, yPercent: -50 });
    gsap.set(label, { opacity: 0 });
    gsap.set(preview, { opacity: 0, scale: 0.86, rotate: -4, filter: "blur(18px)" });
    gsap.set(light, { opacity: 0 });
    gsap.set(root, { opacity: 0 });

    const setCanvasSize = () => {
      canvas.width = window.innerWidth * devicePixelRatio;
      canvas.height = window.innerHeight * devicePixelRatio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    };

    const spawnDomTrail = (x: number, y: number, speed: number) => {
      const trail = document.createElement("span");
      trail.className = "cursor-trail-dot";
      root.appendChild(trail);

      const size = clamp(12 + speed * 0.18, 12, 28);

      gsap.set(trail, {
        x,
        y,
        xPercent: -50,
        yPercent: -50,
        opacity: 0.26,
        scale: 0.45,
        width: size,
        height: size,
      });

      gsap.to(trail, {
        opacity: 0,
        scale: 1.5,
        duration: 0.7,
        ease: "power2.out",
        onComplete: () => trail.remove(),
      });
    };

    const spawnImageTrail = (x: number, y: number) => {
      const imageTrail = document.createElement("span");
      imageTrail.className = "cursor-image-trail";
      imageTrail.style.backgroundImage = `url(${activePreview || defaultPreview})`;
      root.appendChild(imageTrail);

      gsap.set(imageTrail, {
        x,
        y,
        xPercent: -50,
        yPercent: -50,
        opacity: 0.22,
        scale: 0.62,
        rotate: gsap.utils.random(-12, 12),
      });

      gsap.to(imageTrail, {
        x: x + gsap.utils.random(-28, 28),
        y: y + gsap.utils.random(-18, 18),
        opacity: 0,
        scale: 1,
        duration: 0.9,
        ease: "power3.out",
        onComplete: () => imageTrail.remove(),
      });
    };

    const spawnRipple = (x: number, y: number) => {
      const ripple = document.createElement("span");
      ripple.className = "cursor-click-ripple";
      root.appendChild(ripple);

      gsap.set(ripple, {
        x,
        y,
        xPercent: -50,
        yPercent: -50,
        scale: 0.3,
        opacity: 0.46,
      });

      gsap.to(ripple, {
        scale: 1.9,
        opacity: 0,
        duration: 0.65,
        ease: "power3.out",
        onComplete: () => ripple.remove(),
      });

      ripples.push({ x, y, radius: 28, alpha: 0.22, life: 1 });
    };

    const updateHoverState = (nextElement: HTMLElement | null) => {
      if (hoveredElement === nextElement) {
        return;
      }

      hoveredElement = nextElement;

      const nextLabel = nextElement?.dataset.cursor ?? "";
      const nextPreview = nextElement?.dataset.cursorPreview ?? "";
      const previewEnabled = Boolean(nextPreview);
      const isInteractive = Boolean(nextElement);

      label.textContent = nextLabel;

      gsap.to(label, {
        opacity: nextLabel ? 1 : 0,
        duration: 0.18,
        ease: "power2.out",
      });

      gsap.to(cursor, {
        scale: previewEnabled ? 2.8 : nextLabel ? 1.85 : isInteractive ? 1.15 : 1,
        duration: 0.35,
        ease: "power3.out",
      });

      gsap.to(aura, {
        scale: previewEnabled ? 1.45 : isInteractive ? 1.16 : 1,
        opacity: previewEnabled ? 0.82 : isInteractive ? 0.54 : 0.36,
        duration: 0.45,
        ease: "power3.out",
      });

      gsap.to(light, {
        scale: previewEnabled ? 1.38 : isInteractive ? 1.18 : 1,
        opacity: previewEnabled ? 0.9 : isInteractive ? 0.48 : 0.22,
        duration: 0.45,
        ease: "power3.out",
      });

      gsap.to(liquidIntensity, {
        value: previewEnabled ? 0.78 : isInteractive ? 0.54 : 0.34,
        duration: 0.6,
        ease: "power2.out",
      });

      gsap.to(hoverStrength, {
        value: isInteractive ? 1 : 0,
        duration: 0.45,
        ease: "power2.out",
      });

      if (nextPreview && activePreview !== nextPreview) {
        activePreview = nextPreview;
        previewImage.src = nextPreview;
      }

      if (previewEnabled) {
        gsap.to(preview, {
          opacity: 1,
          scale: 1,
          rotate: 0,
          filter: "blur(0px)",
          duration: 0.45,
          ease: "power3.out",
        });
      } else {
        gsap.to(preview, {
          opacity: 0,
          scale: 0.9,
          rotate: 3,
          filter: "blur(16px)",
          duration: 0.28,
          ease: "power2.out",
        });
      }
    };

    const animateProjectVisual = (element: HTMLElement, active: boolean) => {
      const media = element.querySelector<HTMLElement>("[data-project-media]");
      const visual = element.querySelector<HTMLElement>("[data-project-visual]");

      if (media) {
        gsap.to(media, {
          scale: active ? 1.04 : 1,
          duration: 0.8,
          ease: "power3.out",
        });
      }

      if (visual) {
        gsap.to(visual, {
          scale: active ? 1.12 : 1,
          filter: active ? "blur(0.8px)" : "blur(0px)",
          duration: 0.8,
          ease: "power3.out",
        });
      }
    };

    const addMagneticListeners = (element: HTMLElement) => {
      const strength = Number(element.dataset.magneticStrength ?? 0.12);
      const moveX = gsap.quickTo(element, "x", { duration: 0.45, ease: "power3.out" });
      const moveY = gsap.quickTo(element, "y", { duration: 0.45, ease: "power3.out" });

      const handleMove = (event: PointerEvent) => {
        const rect = element.getBoundingClientRect();
        const offsetX = ((event.clientX - (rect.left + rect.width * 0.5)) / rect.width) * rect.width * strength;
        const offsetY = ((event.clientY - (rect.top + rect.height * 0.5)) / rect.height) * rect.height * strength;

        moveX(clamp(offsetX, -22, 22));
        moveY(clamp(offsetY, -22, 22));
      };

      const handleEnter = () => {
        if (element.hasAttribute("data-project-card")) {
          animateProjectVisual(element, true);
        }
      };

      const handleLeave = () => {
        moveX(0);
        moveY(0);

        if (element.hasAttribute("data-project-card")) {
          animateProjectVisual(element, false);
        }
      };

      element.addEventListener("pointermove", handleMove);
      element.addEventListener("pointerenter", handleEnter);
      element.addEventListener("pointerleave", handleLeave);

      cleanups.push(() => {
        element.removeEventListener("pointermove", handleMove);
        element.removeEventListener("pointerenter", handleEnter);
        element.removeEventListener("pointerleave", handleLeave);
      });
    };

    const addParallaxListeners = (element: HTMLElement) => {
      const layers = Array.from(element.querySelectorAll<HTMLElement>("[data-parallax]"));

      if (!layers.length) {
        return;
      }

      const handleMove = (event: PointerEvent) => {
        const rect = element.getBoundingClientRect();
        const normalizedX = (event.clientX - rect.left) / rect.width - 0.5;
        const normalizedY = (event.clientY - rect.top) / rect.height - 0.5;

        layers.forEach((layer) => {
          const depth = Number(layer.dataset.parallax ?? 0);
          gsap.to(layer, {
            x: normalizedX * depth * 2,
            y: normalizedY * depth * 2,
            duration: 0.9,
            ease: "power3.out",
            overwrite: "auto",
          });
        });
      };

      const handleLeave = () => {
        layers.forEach((layer) => {
          gsap.to(layer, {
            x: 0,
            y: 0,
            duration: 1.1,
            ease: "power3.out",
            overwrite: "auto",
          });
        });
      };

      element.addEventListener("pointermove", handleMove);
      element.addEventListener("pointerleave", handleLeave);

      cleanups.push(() => {
        element.removeEventListener("pointermove", handleMove);
        element.removeEventListener("pointerleave", handleLeave);
      });
    };

    const renderLiquid = () => {
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);
      context.globalCompositeOperation = "source-over";
      context.filter = "blur(22px)";
      context.globalAlpha = 1;

      const baseRadius = 56 + pointerVelocity.value * 0.2 + hoverStrength.value * 22;
      const glow = context.createRadialGradient(position.x, position.y, 0, position.x, position.y, baseRadius);
      glow.addColorStop(0, `hsla(160, 84%, 62%, ${liquidIntensity.value})`);
      glow.addColorStop(0.5, `hsla(195, 94%, 67%, ${liquidIntensity.value * 0.54})`);
      glow.addColorStop(1, "hsla(210, 100%, 60%, 0)");

      context.fillStyle = glow;
      context.beginPath();
      context.arc(position.x, position.y, baseRadius, 0, Math.PI * 2);
      context.fill();

      context.globalCompositeOperation = "lighter";

      const leadingBlob = context.createRadialGradient(target.x, target.y, 0, target.x, target.y, 34 + hoverStrength.value * 10);
      leadingBlob.addColorStop(0, "hsla(195, 94%, 67%, 0.28)");
      leadingBlob.addColorStop(1, "hsla(195, 94%, 67%, 0)");

      context.fillStyle = leadingBlob;
      context.beginPath();
      context.arc(target.x, target.y, 34 + hoverStrength.value * 10, 0, Math.PI * 2);
      context.fill();

      ripples.forEach((ripple) => {
        ripple.radius += 3.8;
        ripple.alpha *= 0.94;
        ripple.life *= 0.93;

        context.strokeStyle = `hsla(160, 84%, 68%, ${ripple.alpha})`;
        context.lineWidth = 2;
        context.beginPath();
        context.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        context.stroke();
      });

      for (let index = ripples.length - 1; index >= 0; index -= 1) {
        if (ripples[index].life < 0.04) {
          ripples.splice(index, 1);
        }
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      target.x = event.clientX;
      target.y = event.clientY;

      const nextElement =
        event.target instanceof Element
          ? event.target.closest<HTMLElement>("[data-cursor], [data-cursor-preview], [data-magnetic]")
          : null;

      updateHoverState(nextElement);

      gsap.to(root, {
        opacity: 1,
        duration: 0.28,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const handlePointerLeaveViewport = () => {
      updateHoverState(null);
      gsap.to(root, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const handlePointerDown = () => {
      spawnRipple(target.x, target.y);
      gsap.to(cursor, {
        scale: hoveredElement?.dataset.cursorPreview ? 2.45 : hoveredElement ? 1.55 : 0.86,
        duration: 0.16,
        ease: "power2.out",
        yoyo: true,
        repeat: 1,
      });
    };

    const tick = (time: number) => {
      const delta = time - lastFrameTime;
      lastFrameTime = time;

      position.x = lerp(position.x, target.x, 0.16);
      position.y = lerp(position.y, target.y, 0.16);

      const dx = target.x - position.x;
      const dy = target.y - position.y;
      pointerVelocity.value = Math.hypot(dx, dy);

      cursorX(position.x);
      cursorY(position.y);
      auraX(position.x);
      auraY(position.y);
      previewX(position.x + 82);
      previewY(position.y - 82);
      lightX(position.x);
      lightY(position.y);

      if (pointerVelocity.value > 2 && time - lastTrailTime > 42) {
        spawnDomTrail(position.x, position.y, pointerVelocity.value);
        lastTrailTime = time;
      }

      if (pointerVelocity.value > 18 && time - lastImageTrailTime > 92) {
        spawnImageTrail(position.x, position.y);
        lastImageTrailTime = time;
      }

      if (delta < 34) {
        renderLiquid();
      }

      frame = window.requestAnimationFrame(tick);
    };

    setCanvasSize();

    Array.from(document.querySelectorAll<HTMLElement>("[data-magnetic]")).forEach(addMagneticListeners);
    Array.from(document.querySelectorAll<HTMLElement>("[data-parallax-root]")).forEach(addParallaxListeners);

    window.addEventListener("resize", setCanvasSize);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    window.addEventListener("mouseout", (event) => {
      if (!(event.relatedTarget instanceof Node)) {
        handlePointerLeaveViewport();
      }
    });
    window.addEventListener("blur", handlePointerLeaveViewport);

    cleanups.push(() => window.removeEventListener("resize", setCanvasSize));
    cleanups.push(() => window.removeEventListener("pointermove", handlePointerMove));
    cleanups.push(() => window.removeEventListener("pointerdown", handlePointerDown));
    cleanups.push(() => window.removeEventListener("blur", handlePointerLeaveViewport));

    frame = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(frame);
      cleanups.forEach((cleanup) => cleanup());
      updateHoverState(null);
      document.documentElement.classList.remove("has-custom-cursor");
      root.querySelectorAll(".cursor-trail-dot, .cursor-image-trail, .cursor-click-ripple").forEach((element) => {
        element.remove();
      });
    };
  }, []);

  return (
    <div ref={rootRef} className="cursor-system" aria-hidden="true">
      <canvas ref={canvasRef} className="cursor-liquid-canvas" />
      <div ref={lightRef} className="cursor-light" />
      <div ref={previewRef} className="cursor-preview">
        <img ref={previewImageRef} src={defaultPreview} alt="" />
      </div>
      <div ref={auraRef} className="cursor-aura" />
      <div ref={cursorRef} className="cursor-core">
        <span ref={labelRef} className="cursor-label" />
      </div>
    </div>
  );
};

export default InteractiveCursor;
