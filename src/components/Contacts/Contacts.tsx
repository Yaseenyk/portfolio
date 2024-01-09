import "./Contacts.scss";
import GmailSend from "../../assets/gmailSend.svg";
import ContactDetails from "../ContactDetails/ContactDetails";
import {motion} from 'framer-motion'
const Contacts = () => {
    const variants = {
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
    <div className="contactWrapper">
      <motion.div className="leftWrapper" variants={variants} initial='initial' animate='animate'>
        <div className="h1">
            Details :
        </div>
        <div className="itemContainer">
          <div className="email">
            Email : yaseenkhatib04@gmail.com
            <img src={GmailSend} />
          </div>
          <div className="linkedIn">
            <a href="https://www.linkedin.com/in/yaseen-yk/" />Linkedin : Yaseen-YK
          </div>
          <div className="phoneNumber">Phone Number : 8208335028</div>
        </div>
      </motion.div>
      <div className="rightWrapper"><ContactDetails/></div>
    </div>
  );
};

export default Contacts;
