import './App.scss'
import Domain from './components/Domain/Domain'
import Hero from './components/Hero/Hero'
import Navbar from './components/Navbar/Navbar'
import Portfolio from './components/PortFolio/Portfolio'

function App() {

  return (
    <>
    <section id='Homepage'><Navbar/><Hero/></section>
      <section id='Services'><Domain/></section>
      <Portfolio/>
      <section id='Contact'>Contact</section>
    </>
  )
}

export default App
