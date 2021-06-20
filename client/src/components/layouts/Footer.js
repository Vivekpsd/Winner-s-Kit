import React from 'react';
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaArrowRight,
  FaEnvelope,
  FaUser,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { FiPhone } from 'react-icons/fi';
import EgLogo from '../../img/EgLogo2.png';
import ISO from '../../img/isologo.png';
import ISO2 from '../../img/isologo2.png';

const Footer = () => {
  return (
    <div
      class='container-fluid pb-0 mb-0 justify-content-center text-light mainFooter'
      style={{ backgroundColor: 'black' }}
    >
      <footer>
        <div class='row my-5 justify-content-center py-5'>
          <div class='col-11'>
            <div class='row '>
              <div class='col-xl-8 col-md-4 col-sm-4 col-12 my-auto mx-auto a'>
                <h3 class='text-muted mb-md-0 mb-5 bold-text'>
                  Winner's Kit
                  <br></br>
                  <hr></hr>
                  <span>
                    <img src={ISO} alt='iso' height='100' />
                    &nbsp;&nbsp;
                    <img src={ISO2} alt='iso' height='90' />
                  </span>
                </h3>
              </div>
              <div class='col-xl-2 col-md-4 col-sm-4 col-12'>
                <h6 class='mb-3 mb-lg-4 bold-text ml-3'>
                  <b>MENU</b>
                </h6>
                <ul class='list-unstyled'>
                  <li>
                    <Link
                      className='nav-link'
                      to='/'
                      style={{ textDecoration: 'none', color: 'white' }}
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      className='nav-link'
                      to='/about'
                      style={{ textDecoration: 'none', color: 'white' }}
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      className='nav-link'
                      to='/contact'
                      style={{ textDecoration: 'none', color: 'white' }}
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
              <div class='col-xl-2 col-md-4 col-sm-4 col-12'>
                <h6 class='mb-3 mb-lg-4 text-muted bold-text mt-sm-0 mt-5'>
                  <b>ADDRESS</b>
                </h6>
                <p class='mb-1'>H.No. 246, SD Road, Model Town</p>
                <p>Besides RnD Constructions, Jalandhar, Punjab 144001</p>
              </div>
            </div>
            <div class='row '>
              <div class='col-xl-8 col-md-4 col-sm-4 col-auto my-md-0 mt-5 order-sm-1 order-3 align-self-end'>
                <p class='social text-muted mb-0 pb-0 bold-text'>
                  {' '}
                  <span class='mx-2'>
                    <a
                      href=''
                      style={{ textDecoration: 'none', color: 'grey' }}
                    >
                      <FaFacebook />
                    </a>
                  </span>{' '}
                  <span class='mx-2'>
                    <FaYoutube />
                  </span>{' '}
                  <span class='mx-2'>
                    <a
                      href=''
                      style={{ textDecoration: 'none', color: 'grey' }}
                    >
                      <FaInstagram />
                    </a>
                  </span>{' '}
                  <span class='mx-2'>
                    <FaTwitter />
                  </span>{' '}
                </p>
                <small class='rights'>
                  <span>&#174;</span> Winner's Kit All Rights Reserved.
                </small>
              </div>
              <div class='col-xl-2 col-md-4 col-sm-4 col-auto order-1 align-self-end '>
                <h6 class='mt-55 mt-2 text-muted bold-text'>
                  <b>Name</b>
                </h6>
                <small>
                  {' '}
                  <span>
                    <FaUser />
                    &nbsp;
                  </span>{' '}
                  Winner's Kit
                </small>
              </div>
              <div class='col-xl-2 col-md-4 col-sm-4 col-auto order-2 align-self-end mt-3 '>
                <h6 class='text-muted bold-text'>
                  <b>Contacts</b>
                </h6>
                <small>
                  <span>
                    <FiPhone />
                  </span>{' '}
                  +91 9876377610
                </small>
                <br></br>
                <small>
                  <span>
                    <FaEnvelope />
                    &nbsp; winnerkit10@gmail.com
                  </span>
                </small>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default Footer;
