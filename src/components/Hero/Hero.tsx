import "./Hero.scss";
import { Variants, motion } from "framer-motion";
import ProfilePhoto from "../../assets/Profile Photo.png";
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
        <motion.h1
          className="static-txt"
          variants={text}
          initial="initial"
          animate="animate"
        >
          I Work as a <span className="highlightSpan">Software Developer</span>,{" "}
          <span className="highlightSpan">Full Stack Developer</span>,{" "}
          <span className="highlightSpan">FreeLancer!</span>
        </motion.h1>
        <span>
          I've 2+ years of experience as a{" "}
          <span className="highlight">Full Stack Developer</span> in
          <span className="highlight"> React</span> ,
          <span className="highlight">Node</span>, and{" "}
          <span className="highlight">Redux Library</span>. Also worked on
          Angular, ASP.net, and Various Rest APIs.
        </span>
      </motion.div>
      <motion.div
        className="imgContainer"
        variants={text}
        initial="initial"
        animate="animate"
      >
        <motion.img src={ProfilePhoto} alt="Yaseen Khatib" />
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
