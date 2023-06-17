import Card from "../../components/Card";
import { motion } from "framer-motion";

function index() {
  return (
    <div className="home-container">
      <div className="home-content">
        <div className="home-welcome">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1.7 }}
          >
            <h3>Welcome to</h3>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1.5 }}
          >
            <h3>ImageLink!</h3>
          </motion.div>
        </div>
      </div>
      <div className="home-info"></div>
      <div className="home-about"></div>
    </div>
  );
}

export default index;
