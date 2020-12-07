import React from 'react';
import '../components/App.css';
import Cards from '../components/Cards';
import HeroSection from '../components/HeroSection';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet'

const TITLE = 'TheIdealUniversity'

function Home() {
  return (
    <div>
      <Helmet>
          <title>{ TITLE }</title>
        </Helmet>
      <HeroSection />
      <Cards />
      <Footer />
    </div>
  );
}

export default Home;