import {motion} from 'framer-motion'
const ContactDetails = () => {
    const variants = {
        initial:{
            x:3000,

        },
        animate:{
            x:0,
            transition:{
                duration: 1,
            }
        }
    }
  return (
    <motion.div className="Form" variants={variants} initial='initial' animate='animate'>
        <h2>Contact Me!</h2>
      <input type="text" placeholder="Enter your Name"/>
      <input type="text" placeholder="Enter your Email"/>
      <textarea name="" id=""></textarea>
      <button>Submit Query!</button>
    </motion.div>
  )
}

export default ContactDetails
