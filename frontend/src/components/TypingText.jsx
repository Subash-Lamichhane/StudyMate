import { motion } from "framer-motion";

const TypingText = ({ text }) => {
  const textArray = text.split("");

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 5 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      style={{ display: "inline-block", whiteSpace: "pre" }}
    >
      {textArray.map((letter, index) => (
        <motion.span
          key={index}
          variants={letterVariants}
          style={{ display: "inline-block", marginRight: "1px" }}
          className="text-yellow-600"
        >
          {letter}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default TypingText;
