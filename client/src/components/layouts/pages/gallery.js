import React from 'react';
import { Container } from 'react-bootstrap';
import Gi1 from '../assets/galleryimages/1.jpg';
import Gi2 from '../assets/galleryimages/2.jpg';
import Gi3 from '../assets/galleryimages/3.jpg';
import Gi4 from '../assets/galleryimages/4.jpg';
import Gi5 from '../assets/galleryimages/5.jpg';
import Gi6 from '../assets/galleryimages/6.jpg';
import Gi7 from '../assets/galleryimages/7.jpg';
import Gi8 from '../assets/galleryimages/8.jpg';
import Gi9 from '../assets/galleryimages/9.jpg';

import Footer from '../components/footer';
import TopSection from '../components/topsection';
import Gallerysvg from '../assets/gallery.svg';

export default function gallery() {
  const style1 = {
    fontWeight: 800,
    marginTop: '60px',
  };

  const style2 = {
    fontWeight: 500,
  };

  return (
    <div className='gallery-holder'>
      <Container>
        <TopSection
          headimage={Gallerysvg}
          head='Gallery'
          description='All memories made throughout our history is collected here'
        />

        {/* <h3 style = {style1}>Gallery</h3>
                <p style = {style2}>All memories made throughout our history is collectd here</p> */}

        <div className='row'>
          <div className='collumn'>
            <img src={Gi1} alt='img' />
            <img src={Gi2} alt='img' />
            <img src={Gi3} alt='img' />
          </div>

          <div className='collumn'>
            <img src={Gi4} alt='image' />
            <img src={Gi5} alt='image' />
            <img src={Gi6} alt='image' />
          </div>

          <div className='collumn'>
            <img src={Gi7} alt='image' />
            <img src={Gi8} alt='image' />
            <img src={Gi9} alt='image' />
          </div>
        </div>
      </Container>

      <br></br>
    </div>
  );
}
