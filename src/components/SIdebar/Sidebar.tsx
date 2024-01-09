import { useState } from 'react';
import Links from './Links/Links';
import MenuButton from './MenuButton/MenuButton';
import './Sidebar.scss';
import {motion} from 'framer-motion';
const Sidebar = () => {
  const[open,setOpen]=useState(false);
  
  const variants = {
    open:{
      clipPath:'circle(1600px at 50px 50px)',
      transition:{
        type:'spring',
        stiffness:10,
        duration:1,
      }
    },
    closed:{
      clipPath:'circle(0px at 50px 50px)',
      borderRadius:"2px",
      transition:{
        type:'spring',
        stiffness:10,
        duration:2,
      }
    }
  }
  return (
    <motion.div className='sidebar' animate={open?'open':'closed'}>
      <motion.div className="bg" variants={variants}>
        <Links/>
      </motion.div>
      <MenuButton setOpen={setOpen}/>
    </motion.div>
  )
}

export default Sidebar
