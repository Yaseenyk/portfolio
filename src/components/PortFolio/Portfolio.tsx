import { useRef } from "react";
import "./Portfolio.scss";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import YKPortfolio from "../../assets/Projects/PortfolioHeder.png";
import WaveChat from "../../assets/Projects/Wavechat main.png";
interface Item {
  id: number;
  name: string;
  img: string;
  desc: string;
}

const items: Item[] = [
  {
    id: 1,
    name: "Yaseen's Portfolio",
    img: `${YKPortfolio}`,
    desc: "Developed portfolio website with TypeScript and SCSS for robust code and modular styling, ensuring seamless user experience across devices. Implemented lazy loading techniques, resulting in a 1.5X performance boost for enhanced website speed. Optimized functionality using the useMemo hook, showcasing commitment to best practices and delivering a high-quality, user-friendly digital representation of skills and projects.",
  },
  {
    id: 2,
    name: "WaveChat",
    img: `${WaveChat}`,
    desc: "WaveChat enables user interactions with secure sign-up, profiles, and login. Firebase Firestore stores data, while React ensures a responsive frontend. Optimizations include `useMemo` for efficient rendering, code splitting for faster loading, and SEO-friendly design for better visibility and accessibility.",
  },
  // {
  //   id: 3,
  //   name: "Typescript",
  //   img: "dummy",
  //   desc: "Lorem",
  // },
];

const Single = ({ item }: { item: Item }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yAxis = useTransform(scrollYProgress, [0, 1], ["0%", "-300%"]);
  return (
    <section className="modifiedSection" ref={ref}>
      <div className="wrapper">
        <div className="leftcontainer">
          <img src={item.img} alt={item.name}></img>
        </div>
        <motion.div className="rightContainer" style={{ y: yAxis }}>
          <div className="ItemName">{item.name}</div>
          <div className="ItemDesc">{item.desc}</div>

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
