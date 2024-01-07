import { useRef } from "react";
import "./Portfolio.scss";
import { motion, useScroll } from "framer-motion";
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
  return <section>{item.name}</section>;
};

const Portfolio = () => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["end end", "start start"],
  });
  return (
    <div>
      <div className="progress" ref={ref}>
        <h1 className="Features">Projects</h1>
        <div className="progressBar"></div>
      </div>
      {items.map((item) => (
        <Single key={item.id} item={item} />
      ))}
    </div>
  );
};

export default Portfolio;
