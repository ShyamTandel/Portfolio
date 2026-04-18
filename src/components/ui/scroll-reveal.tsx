import { motion, useReducedMotion, type HTMLMotionProps, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

const createRevealVariants = (reduceMotion: boolean, distance: number): Variants => ({
  hidden: {
    opacity: 0,
    y: reduceMotion ? 0 : distance,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
});

const groupVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

type ScrollRevealProps = HTMLMotionProps<"div"> & {
  distance?: number;
};

export const ScrollReveal = ({ children, className, distance = 56, variants, ...props }: ScrollRevealProps) => {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={cn(className)}
      variants={variants ?? createRevealVariants(Boolean(reduceMotion), distance)}
      {...props}
    >
      {children}
    </motion.div>
  );
};

type ScrollRevealGroupProps = HTMLMotionProps<"div"> & {
  once?: boolean;
  amount?: number;
};

export const ScrollRevealGroup = ({
  children,
  className,
  once = true,
  amount = 0.2,
  initial = "hidden",
  whileInView = "visible",
  viewport,
  variants,
  ...props
}: ScrollRevealGroupProps) => (
  <motion.div
    className={cn(className)}
    initial={initial}
    whileInView={whileInView}
    viewport={{ once, amount, ...viewport }}
    variants={variants ?? groupVariants}
    {...props}
  >
    {children}
  </motion.div>
);
