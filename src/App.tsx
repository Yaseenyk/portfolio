import { lazy, Suspense, memo } from 'react';
import './App.scss';

const LazyNavbar = lazy(() => import('./components/Navbar/Navbar'));
const LazyHero = lazy(() => import('./components/Hero/Hero'));
const LazyDomain = lazy(() => import('./components/Domain/Domain'));
const LazyPortfolio = lazy(() => import('./components/PortFolio/Portfolio'));
const LazyContacts = lazy(() => import('./components/Contacts/Contacts'));

function App() {
  return (
    <>
      <section id='Homepage'>
        <Suspense fallback={<div>Loading...</div>}>
          <LazyNavbar />
          <LazyHero />
        </Suspense>
      </section>
      
      <section id='Services'>
        <Suspense fallback={<div>Loading...</div>}>
          <LazyDomain />
        </Suspense>
      </section>

      <Suspense fallback={<div>Loading...</div>}>
        <LazyPortfolio />
      </Suspense>

      <section id='Contact' className='Contacts'>
        <Suspense fallback={<div>Loading...</div>}>
          <LazyContacts />
        </Suspense>
      </section>
    </>
  );
}

export default memo(App);
