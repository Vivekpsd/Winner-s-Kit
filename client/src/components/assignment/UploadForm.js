import React, { Fragment, useEffect, useState } from 'react';
import { getCourses } from '../../actions/course';
import { getCurrentProfile } from '../../actions/profile';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';
import { uploadAssignment } from '../../actions/course';
import ViewAssignmentsTeacher from './ViewAssignmentsTeacher';
const UploadForm = ({
  getCourses,
  getCurrentProfile,
  course: { courses, loading },
  profile: { profile },
  uploadAssignment,
}) => {
  useEffect(() => {
    getCourses();
    getCurrentProfile();
  }, [getCourses]);

  //const [formData, setFormData] = useState('');
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');
  const [formdetails, setformdetails] = useState({
    title: '',
    endDate: '',
    description: '',
  });

  const { title, description, endDate } = formdetails;
  const onChange3 = (e) =>
    setformdetails({ ...formdetails, [e.target.name]: e.target.value });
  //const [uploadedFile, setUploadedFile] = useState({});
  //const [message, setMessage] = useState('');
  //const [uploadPercentage, setUploadPercentage] = useState(0);
  const [courseID, setCourse] = useState('');
  // const { title, description, endDate } = formData;

  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };
  const onChange2 = (e) => {
    setCourse(e.target.value);
    console.log(courseID);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    console.log(formData);
    uploadAssignment(formData, formdetails, courseID);
  };

  return (
    <Fragment>
      <div className='container pt-5'>
        <Link to='view-assignments' className='course-btn'>
          View All Assignment
        </Link>
        <br></br>
        <form onSubmit={onSubmit}>
          <div className='form-group pt-4'>
            <label htmlFor='title'>Assignment Title</label>
            <input
              id='title'
              className='form-control'
              type='text'
              placeholder='Title'
              name='title'
              value={title}
              onChange={onChange3}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='descirption'>Assignment Description</label>
            <textarea
              placeholder='A breif intro of the course'
              id='description'
              className='form-control'
              name='description'
              value={description}
              onChange={onChange3}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='endDate'>End Date</label>
            <input
              id='endDate'
              type='date'
              className='form-control'
              name='endDate'
              value={endDate}
              onChange={onChange3}
            />
          </div>
          <label htmlFor='enrolledCourse'>Select Course</label>
          <select
            id='typeMsg'
            className='form-control'
            name='typeMsg'
            onChange={(e) => onChange2(e)}
          >
            {!profile.loading &&
              profile.enrolledCourse.map((courseID) =>
                courses.map((course) => {
                  if (course._id === courseID) {
                    return (
                      <option value={course._id} key={course._id}>
                        {course.title}
                      </option>
                    );
                  } else {
                    return <p>No Course</p>;
                  }
                })
              )}
          </select>
          <br></br>
          <div className='custom-file mb-4'>
            <input
              type='file'
              className='custom-file-input'
              id='customFile'
              onChange={onChange}
              accept='application/pdf'
            />
            <small className='text-muted'>Upload Only PDF Files</small>
            <label className='custom-file-label' htmlFor='customFile'>
              {filename}
            </label>
          </div>

          <input
            type='submit'
            value='Upload'
            className='btn btn-primary btn-block mt-4'
          />
        </form>
        <br></br>
      </div>
    </Fragment>
    // <Fragment>
    //   <form
    //     className='form'
    //     method='POST'
    //     action='/'
    //     encType='multipart/form-data'
    //     onSubmit={onSubmit}
    //   >
    //     {/* <div className='form-group'>
    //       <label htmlFor='title'>Assignment Title</label>
    //       <input
    //         id='title'
    //         className='form-control'
    //         type='text'
    //         placeholder='Title'
    //         name='title'
    //         value={title}
    //         onChange={onChange}
    //       />
    //     </div>

    //     <div className='form-group'>
    //       <label htmlFor='descirption'>Assignment Description</label>
    //       <textarea
    //         placeholder='A breif intro of the course'
    //         id='description'
    //         className='form-control'
    //         name='description'
    //         value={description}
    //         onChange={onChange}
    //       />
    //     </div>
    //     <div className='form-group'>
    //       <label htmlFor='endDate'>End Date</label>
    //       <input
    //         id='endDate'
    //         type='date'
    //         className='form-control'
    //         name='endDate'
    //         value={endDate}
    //         onChange={onChange}
    //       />
    //     </div> */}
    //     <div className='custom-file mb-4'>
    //       <input
    //         type='file'
    //         name='file'
    //         className='custom-file-input'
    //         id='file'
    //         onChange={onChange}
    //       />
    //       <label className='custom-file-label' htmlFor='file'>
    //         {filename}
    //       </label>
    //     </div>
    //     <input
    //       type='submit'
    //       value='Upload'
    //       className='form-group btn btn-primary float-right'
    //     />
    //     <br></br>
    //     <Link className='btn btn-light my-1' to='/dashboard'>
    //       Go Back
    //     </Link>
    //   </form>
    // </Fragment>
  );
};
UploadForm.propTypes = {
  getCourses: PropTypes.func.isRequired,
  course: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  uploadAssignment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  course: state.course,
  profile: state.profile,
});

export default connect(mapStateToProps, {
  getCourses,
  getCurrentProfile,
  uploadAssignment,
})(UploadForm);
