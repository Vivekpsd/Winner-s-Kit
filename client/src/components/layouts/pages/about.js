import React from 'react';
import Topsection from '../components/topsection';
import Footer from '../components/footer';
import Svg from '../assets/about.svg';
import { Container } from 'react-bootstrap';
import MapSvg from '../assets/map.svg';
import TeamSvg from '../assets/team.svg';
import ShopSvg from '../assets/shop.svg';

export default function about() {
  const styles = {
    marginRight: '90px',
  };

  return (
    <div>
      <Container>
        <Topsection
          headimage={Svg}
          head='About us'
          description={
            <p>
              About Winner's Kit <br /> We believe in excellence!
            </p>
          }
        />
      </Container>
      <hr />
      <Container className='about-info'>
        <div className='info-holder'>
          <img src={MapSvg} alt='svg' />
          <div className='info'>
            <h4>Winner's Kit Academy</h4>
            <i>
              H.No. 246, SD Road, Model Town Besides RnD Constructions,
              Jalandhar, Punjab 144001
            </i>
            <p>
              Courses by Government of India are running here. The courses are
              free of cost with 100% placements assistance. Currently, there are
              2 Courses running Beauty Therapist and Documentation Assistance.
            </p>
          </div>
        </div>
        <br></br>
        <hr></hr>
        <div className='info-holder' style={styles}>
          <div className='info'>
            <h4>Winner's Kit SHOP</h4>
            <i>
              SBlock 13-200, Cabin 21, Skills Based Training Center, Model Town,
              Phagwara, Punjab 144411
            </i>
            <p>
              From its start, Winner's Kit has developed a visualization of
              providing professional education services for developing a major
              section of the technologically advancing India through the young
              students.
            </p>
          </div>
          <img src={ShopSvg} alt='svg' />
        </div>
        <br></br>
        <hr></hr>
        <div className='info-holder'>
          <img src={TeamSvg} alt='svg' />
          <div className='info'>
            <h4>Our Trainers</h4>
            <p>
              At winner's kit we have a team of highly skilled and experienced
              trainers to ensure the quality of the training. A team of highly
              experienced academicians and industry experts makes a perfect team
              of trainers, which is highly qualified and certified in their
              domains.
            </p>
            <p>
              Our trainers are Oracle, CEH, RedHat, Cisco/HP certified and have
              worked with multiple organizations for years.
            </p>
          </div>
        </div>
        <br></br>
        <br></br>
      </Container>
    </div>
  );
}
