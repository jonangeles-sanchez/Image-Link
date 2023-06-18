import { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

const Reveal = ({ children, threshold = 0.2, delay = 0.2, ...rest }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  return (
    <div ref={ref} style={{ overflow: "hidden" }}>
      <motion.div
        variants={{
          hidden: { opacity: 0, scale: 0.8 },
          visible: { opacity: 1, scale: 1, transition: { delay: delay } },
        }}
        initial="hidden"
        animate="visible"
        transition={{ duration: 1 }}
        {...rest}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default Reveal;
