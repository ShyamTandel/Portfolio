import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);
const lerp = (start: number, end: number, amount: number) => start + (end - start) * amount;

const InteractiveCursor = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const auraRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

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

    if (!root || !cursor || !aura || !label) {
      return;
    }

    document.documentElement.classList.add("has-custom-cursor");

    const position = { x: window.innerWidth * 0.5, y: window.innerHeight * 0.5 };
    const target = { ...position };
    const pointerVelocity = { value: 0 };
    const cleanups: Array<() => void> = [];

    let frame = 0;
    let lastTrailTime = 0;
    let hoveredElement: HTMLElement | null = null;

    const cursorX = gsap.quickSetter(cursor, "x", "px");
    const cursorY = gsap.quickSetter(cursor, "y", "px");
    const auraX = gsap.quickSetter(aura, "x", "px");
    const auraY = gsap.quickSetter(aura, "y", "px");

    gsap.set([cursor, aura], { xPercent: -50, yPercent: -50 });
    gsap.set(label, { opacity: 0 });
    gsap.set(root, { opacity: 0 });

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
    };

    const updateHoverState = (nextElement: HTMLElement | null) => {
      if (hoveredElement === nextElement) {
        return;
      }

      hoveredElement = nextElement;

      const nextLabel = nextElement?.dataset.cursor ?? "";
      const isInteractive = Boolean(nextElement);

      label.textContent = nextLabel;

      gsap.to(label, {
        opacity: nextLabel ? 1 : 0,
        duration: 0.18,
        ease: "power2.out",
      });

      gsap.to(cursor, {
        scale: nextLabel ? 1.85 : isInteractive ? 1.15 : 1,
        duration: 0.35,
        ease: "power3.out",
      });

      gsap.to(aura, {
        scale: isInteractive ? 1.16 : 1,
        opacity: isInteractive ? 0.54 : 0.36,
        duration: 0.45,
        ease: "power3.out",
      });
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

    const handleMouseOut = (event: MouseEvent) => {
      if (!(event.relatedTarget instanceof Node)) {
        handlePointerLeaveViewport();
      }
    };

    const tick = (time: number) => {
      position.x = lerp(position.x, target.x, 0.16);
      position.y = lerp(position.y, target.y, 0.16);

      const dx = target.x - position.x;
      const dy = target.y - position.y;
      pointerVelocity.value = Math.hypot(dx, dy);

      cursorX(position.x);
      cursorY(position.y);
      auraX(position.x);
      auraY(position.y);

      if (pointerVelocity.value > 2 && time - lastTrailTime > 42) {
        spawnDomTrail(position.x, position.y, pointerVelocity.value);
        lastTrailTime = time;
      }

      frame = window.requestAnimationFrame(tick);
    };

    Array.from(document.querySelectorAll<HTMLElement>("[data-magnetic]")).forEach(addMagneticListeners);
    Array.from(document.querySelectorAll<HTMLElement>("[data-parallax-root]")).forEach(addParallaxListeners);

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    window.addEventListener("mouseout", handleMouseOut);
    window.addEventListener("blur", handlePointerLeaveViewport);

    cleanups.push(() => window.removeEventListener("pointermove", handlePointerMove));
    cleanups.push(() => window.removeEventListener("pointerdown", handlePointerDown));
    cleanups.push(() => window.removeEventListener("mouseout", handleMouseOut));
    cleanups.push(() => window.removeEventListener("blur", handlePointerLeaveViewport));

    frame = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(frame);
      cleanups.forEach((cleanup) => cleanup());
      updateHoverState(null);
      document.documentElement.classList.remove("has-custom-cursor");
      root.querySelectorAll(".cursor-trail-dot, .cursor-click-ripple").forEach((element) => {
        element.remove();
      });
    };
  }, []);

  return (
    <div ref={rootRef} className="cursor-system" aria-hidden="true">
      <div ref={auraRef} className="cursor-aura" />
      <div ref={cursorRef} className="cursor-core">
        <span ref={labelRef} className="cursor-label" />
      </div>
    </div>
  );
};

export default InteractiveCursor;
