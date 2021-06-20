import React from 'react';
import { Container } from 'react-bootstrap';
import Topsection from '../components/topsection';
import Footer from '../components/footer';
import Svg from '../assets/contactus.svg';
import CallIcon from '../assets/icons/callus.png';
import MailIcon from '../assets/icons/mail.png';
import LinkdinIcon from '../assets/icons/linkdinicon.svg';
import YoutubeIcon from '../assets/icons/yticon.svg';
import FacebookIcon from '../assets/icons/facebookicon.svg';
import InstaIcon from '../assets/icons/instaicon.svg';

export default function contact() {
  return (
    <div>
      <Container>
        <Topsection
          headimage={Svg}
          head='Contact us'
          description={
            <p>
              How can we help you? <br /> Reach out or browse below to find the
              answers you need.{' '}
            </p>
          }
        />
      </Container>
      <Container>
        <div className='th'>
          <center>
            <div className='tle'>
              <img src={CallIcon} alt='icon' />
              <br></br>
              <div className='hp'>
                <h5>Call us</h5>

                <p>+91 9876377610</p>
              </div>
            </div>
          </center>

          <center>
            <div className='tle'>
              <img src={MailIcon} alt='icon' />
              <br></br>

              <div className='hp'>
                <h5>Mail us</h5>

                <p>winnerkit10@gmail.com</p>
              </div>
            </div>
          </center>
        </div>
      </Container>
      <hr />
      <Container>
        <div className='followus'>
          <h3>Follow us</h3>

          <div className='social-icons'>
            <a href=''>
              <img src={LinkdinIcon} alt='icon' />
            </a>
            <a href=''>
              <img src={InstaIcon} alt='icon' />
            </a>
            <a href=''>
              <img src={FacebookIcon} alt='icon' />
            </a>
            <img src={YoutubeIcon} alt='icon' />
          </div>
        </div>
      </Container>
      <br></br>
    </div>
  );
}
