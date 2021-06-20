import React, { Fragment } from 'react';
import Profile from './Profile.jpg';

const ProfilePic = () => (
  <Fragment>
    <img
      src={Profile}
      style={{
        width: '150px',
        margin: 'auto',
        display: 'block',
        borderRadius: '5px',
      }}
      alt='Loading...'
    />
  </Fragment>
);

export default ProfilePic;
