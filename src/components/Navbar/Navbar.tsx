import './Navbar.scss';
import Github from '../../assets/github.svg';
import Linkedin from '../../assets/linkedin.svg';
import Sidebar from '../SIdebar/Sidebar';
const Navbar = () => {
  return (
    <div className='navbar'>
      
      <div className='wrapper'>
      <Sidebar/>
        <span>Yaseen YK</span>
        <div className='Socials'>
            <img src={Github} alt='Github'/>
            <img src={Linkedin} alt='Linkedin'/>
        </div>
      </div>
    </div>
  )
}

export default Navbar
