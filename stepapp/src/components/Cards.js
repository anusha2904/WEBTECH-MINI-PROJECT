import React from 'react';
import './Cards.css';
import './App.css';
import CardItem from './CardItem';
import image1 from '../assets/img/img-1.jpg'; 
import image2 from '../assets/img/24.jpg';
function Cards() {
  return (
    <div className='cards'>
      <h2>No TheIdealUniversity office near you? No problem. At TheIdealUniversity, great college advice isn't confined to our physical offices. A meeting with your TheIdealUniversity counselor is just a click away.</h2>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src={image2}
              text='Check out which colleges suit you!'
              label='Courses'
              path='/suggestion'
            />
            <CardItem
              src={image1}
              text='How COVID-19 Impacts College Life'
              label='COVID-19'
              path='/covid'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;