import { motion, useScroll, useSpring } from "framer-motion";

// Thin bar at the top of the page showing how far you have scrolled.
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-30 h-[3px] origin-left bg-accent"
    />
  );
}
