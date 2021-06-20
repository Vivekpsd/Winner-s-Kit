import React, { useState, Fragment, useEffect } from 'react';
import './pages.css';
import Card from '../card/card';
import Navbar from '../components/navbar';
import { Container } from 'react-bootstrap';
import Topsection from '../components/topsection';
import Titles from '../components/bellowts';
import FeaturedCource from '../components/featuredCource';
import Footer from '../components/footer';
import Svg from '../assets/undraw_teaching_f1cm.svg';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import StudentCourseItem from './StudentCourseItem';
import Spinner from '../layouts/Spinner';
import { getCourses } from '../../../actions/course';

const Home = ({ getCourses, course: { courses } }) => {
  useEffect(() => {
    getCourses();
  }, [getCourses]);

  return (
    <div className='App'>
      <Container>
        <Topsection
          headimage={Svg}
          head='Winners Kit'
          description={
            <p>
              A new way to get educate <br /> and learn from anywhere.
            </p>
          }
        />

        <Titles />
      </Container>
      <hr />
      <Container fluid>
        <div className='heading-bts'>
          <h3>The world's ok selection of courses</h3>
          <p>
            Choose from various courses taught by the professional teachers.
          </p>
        </div>
        <h1>okok</h1>
        <FeaturedCource
          title='Expand your career opportunities with Python'
          description="Whether you work in machine learning or finance, or are pursuing a career in web development or data science, Python is one of the most important skills you can learn. Python's simple syntax is especially suited for desktop, web, and business applications. Python's design philosophy emphasizes readability and usability."
          explore='Explore more >'
        />
      </Container>
      <Footer />
    </div>
  );
};

Home.propTypes = {
  getCourses: PropTypes.func.isRequired,
};
const mapSatateToProps = (state) => ({
  course: state.course,
});

export default connect(mapSatateToProps, {
  getCourses,
})(Home);
