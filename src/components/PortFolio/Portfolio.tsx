import { useRef } from "react";
import "./Portfolio.scss";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
interface Item {
  id: number;
  name: string;
  img: string;
  desc: string;
}

const items: Item[] = [
  {
    id: 1,
    name: "React",
    img: "dummy",
    desc: "Lorem",
  },
  {
    id: 2,
    name: "JS",
    img: "dummy",
    desc: "Lorem",
  },
  {
    id: 3,
    name: "Typescript",
    img: "dummy",
    desc: "Lorem",
  },
];

const Single = ({ item }: { item: Item }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yAxis = useTransform(scrollYProgress, [0, 1], ['0%', "-300%"]);
  return (
    <section className="modifiedSection" ref={ref}>
      <div className="wrapper">
        <div className="leftcontainer">
          <img src={""} alt={item.name}></img>
        </div>
        <motion.div className="rightContainer" style={{y:yAxis}}>
          <div>{item.name}</div>
          <div>{item.desc}</div>

          <div className="buttonWrapper">
            <button>Github</button>
            <button>Live</button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Portfolio = () => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["end end", "start start"],
  });
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });
  return (
    <div className="portfolio" ref={ref}>
      <div className="progress">
        <h1 className="Features">Projects</h1>
        <motion.div style={{ scaleX }} className="progressBar"></motion.div>
      </div>
      {items.map((item) => (
        <Single key={item.id} item={item} />
      ))}
    </div>
  );
};

export default Portfolio;
