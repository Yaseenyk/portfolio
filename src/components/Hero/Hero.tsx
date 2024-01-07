import "./Hero.scss";
import { Variants, motion } from "framer-motion";
const text = {
  initial: {
    x: -500,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 1,
      staggerChildren: 0.1,
    },
  },
};
const sliderVariants: Variants = {
    initial: {
      x: 0,
    },
    animate: {
      x: "-480%",
      transition: {
        repeat: Infinity,
        repeatType: "mirror",
        duration: 50,
      },
    },
  };

const Hero = () => {
  return (
    <div className="hero">
      <motion.div
        className="textContainer"
        variants={text}
        initial="initial"
        animate="animate"
      >
        <motion.h2 variants={text}>Hi There, I'm Yaseen Khatib!</motion.h2>
        <motion.h1 className="static-txt" variants={text}>
          I Work as a
        </motion.h1>
        <motion.div className="wrapper" variants={text}>
          <ul className="dynamic-txts">
            <li>
              <span>Full Stack Developer</span>
            </li>
            <li>
              <span>Software Engineer</span>
            </li>
            <li>
              <span>Freelancer</span>
            </li>
          </ul>
        </motion.div>
        <div className="callToAction">
          <button>Download CV</button>
          <button>Contact Me</button>
        </div>
      </motion.div>
      <motion.div className="imgContainer" variants={text}>
        <img src="" alt="Yaseen Khatib" />
      </motion.div>
      <motion.div
        className="slidingText"
        variants={sliderVariants}
        initial="initial"
        animate="animate"
      >
        Full Stack Developer And Software Developer
      </motion.div>
    </div>
  );
};

export default Hero;
