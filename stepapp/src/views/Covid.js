import React from 'react';
import '../components/App.css';
import Cards from '../components/Cards';
import HeroSection from '../components/HeroSection2';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet'

const TITLE = 'TheIdealUniversity'

function Covid() {
  return (
    <div>
      <Helmet>
          <title>{ TITLE }</title>
        </Helmet>
      <HeroSection />
      
      
    </div>
  );
}

export default Covid;