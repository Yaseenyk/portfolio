import { motion } from "framer-motion";
import Code from '../../../assets/CodeIcon.svg'
import Design from '../../../assets/DesignIcon.svg'
interface Item {
  id: number;
  name: string;
  years: string;
  img?: string;
}

const Speciality = () => {
  const items: Item[] = [
    {
      id: 1,
      name: "Full Stack Developer",
      years: '2+ Years',
      img:`${Code}`
    },
    {
      id: 2,
      name: "Software Engineer SDE 1",
      years: "1 Year",
      img:`${Design}`
    },
  ];

  const variants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 3, 
      },
    },
  };

  const SilderVariant = {
    initial:{
        y:500,
    },
    animate:{
        y:0,
        transition:{
            duration: 1,
        }
    }
  }
  const textVariant = {
    initial:{
        x:-500,
    },
    animate:{
        x:0,
        transition:{
            duration: 1,
        }
    }
  }
  return (
    <motion.div className="Speciality" >
      <motion.h1 variants={textVariant} initial="initial" animate="animate">Work Experience</motion.h1>
      {/* <motion.h2>2+ Years in</motion.h2> */}
      <motion.div className="box" variants={variants} initial="initial" animate="animate">
        {items.map((item) => (
          <motion.div key={item.id} className="boxes" whileHover={{scale:1.1}}>
            {item.img && <motion.img src={item.img} alt={item.name} />}
            <div className="textWrapper">
            <motion.h3>{item.name}</motion.h3>
            <motion.p>{item.years}</motion.p>
            </div>
          </motion.div>
        ))}
      </motion.div>
      <motion.div className="fullStack" variants={SilderVariant} initial="initial" animate="animate">
        {/* <div className="textWrapper"></div> */}
        <div className="frontend">Frontend</div>
        <div className="backend">Backend</div>
        <div className="designer">UI &#x387; UX</div>


      </motion.div>
    </motion.div>
  );
};

export default Speciality;
