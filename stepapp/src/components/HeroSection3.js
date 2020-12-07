import React from 'react';
import './App.css';
import './HeroSection.css';
import video from '../assets/suggestions.mp4'; 

function HeroSection3() {
  return (
    <div className='hero-container'>
      <video src={video} autoPlay loop muted />
      <div className = 'hero-container'><h1>These are your recommendations!</h1>
      <p></p>
      </div>
      
    </div>
  );
}

export default HeroSection3;