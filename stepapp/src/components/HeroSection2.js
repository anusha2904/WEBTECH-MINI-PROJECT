import React from 'react';
import './App.css';
import './HeroSection.css';
import video from '../assets/covid.mp4'; 

function HeroSection2() {
  return (
    <div className='hero-container'>
      <video src={video} autoPlay loop muted />
      <p></p>
      <div className = 'hero-container1'><h1>Life as a University Student During COVID-19</h1>
      <p>
University during COVID-19
Starting university is rarely easy for students. Meeting new friends, getting to grips with your course and moving away from home for the first time are all challenges. But what is it like to start university and have to deal with these things while also trying to remain safe from coronavirus?</p>
<p>Most universities are putting measures in place to protect students and staff against the threat of coronavirus. The same QS survey revealed that over half (52 percent) of the students questioned had been given a limit on the number of visitors at their place of residence.</p>
<p>Other popular methods of protecting against the virus in universities included having online lectures rather than face to face lectures, making face coverings in public places compulsory, distributing hand gel and increasing the frequency of cleaning in university facilities.</p></div>
      
    </div>
  );
}

export default HeroSection2;