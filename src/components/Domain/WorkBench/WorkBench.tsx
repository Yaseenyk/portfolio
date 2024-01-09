import { motion } from "framer-motion";
import ReactImg from "../../../assets/React.svg";
import Javascript from "../../../assets/Javascript.svg";
import TypeScript from "../../../assets/TypeScript.svg";
import GitHub from "../../../assets/Github (1).svg";
import Shape from "../../../assets/Shape.svg";
import HTML from "../../../assets/HTML.svg";
import Figma from "../../../assets/Figma.svg";
const WorkBench = () => {
  const imgVariants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 1,
      },
    },
  };
  return (
    <motion.div className="workBench">
      <motion.div className="skills" variants={imgVariants} initial="initial" animate="animate">
        <p>🧑‍💻 Expirence &#x387; Skills</p>
      </motion.div>
      <motion.div className="Technologies" variants={imgVariants} initial="initial" animate="animate">Technologies Worked In</motion.div>
      <motion.div className="major" variants={imgVariants} initial="initial" animate="animate">Daily Life Work Libraries/Framework</motion.div>
      <motion.div className="imgWrapper" variants={imgVariants} initial="initial" animate="animate">
      <motion.img src={ReactImg} whileHover={{scale:1.1}}/>
      <motion.img src={Javascript} whileHover={{scale:1.1}}/>
      <motion.img src={TypeScript} whileHover={{scale:1.1}}/>
      <motion.img src={HTML} whileHover={{scale:1.1}}/>
      <motion.img src={GitHub} whileHover={{scale:1.1}}/>
      <motion.img src={Shape} whileHover={{scale:1.1}}/>
      <motion.img src={Figma} whileHover={{scale:1.1}}/>
    </motion.div>
      <motion.div className="major" variants={imgVariants} initial="initial" animate="animate">Have Knowledge About Libraries/Framework</motion.div>
      <motion.div className="imgWrapper" variants={imgVariants} initial="initial" animate="animate">
      <motion.img src={ReactImg} whileHover={{scale:1.1}}/>
      <motion.img src={Javascript} whileHover={{scale:1.1}}/>
      <motion.img src={TypeScript} whileHover={{scale:1.1}}/>
      <motion.img src={HTML} whileHover={{scale:1.1}}/>
      <motion.img src={GitHub} whileHover={{scale:1.1}}/>
      <motion.img src={Shape} whileHover={{scale:1.1}}/>
      <motion.img src={Figma} whileHover={{scale:1.1}}/>
    </motion.div>
    </motion.div>
  );
};

export default WorkBench;
