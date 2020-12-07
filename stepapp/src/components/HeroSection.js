import React from 'react';
import './App.css';
import { Button } from './Button';
import './HeroSection.css';
import video from '../assets/video.mp4'; 

function HeroSection() {
  return (
    <div className='hero-container'>
      <video src={video} autoPlay loop muted />
      <h1>YOUR COLLEGE LIFE AWAITS!!</h1>
      <p></p>
      <div className='hero-btns'>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
        >
          GET STARTED
        </Button>
      </div>
    </div>
  );
}

export default HeroSection;