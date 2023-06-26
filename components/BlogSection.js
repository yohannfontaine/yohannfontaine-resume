import { motion } from "framer-motion";

export default function BlogSection({ isActive }) {
  const animations = {
    startShow: { opacity: 0, scale: 0.5, visibility: "hidden" },
    finishShow: { opacity: 1, scale: 1, visibility: "visible" },
  };

  const start = isActive ? animations.startShow : animations.finishShow;
  const finish = isActive ? animations.finishShow : animations.startShow;

  console.log("isActive", isActive);
  console.log("start", start);
  console.log("finish", finish);
  return (
    <motion.section
      initial={start}
      animate={finish}
      data-id="blog"
      className="animated-section"
    >
      <div className="section-content">
        <div className="page-title">
          <h2>Blog</h2>
        </div>

        <div className="row">Coming soon...</div>
      </div>
    </motion.section>
  );
}
