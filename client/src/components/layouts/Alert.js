import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Bounce from 'react-reveal/Bounce';
import { FaTimes } from 'react-icons/fa';

const Alert = ({ alerts }) => (
  <div
    style={{
      marginTop: '450px',
      position: 'fixed',
      zIndex: '99',
      marginLeft: '10px',
    }}
  >
    {alerts !== 0 &&
      alerts.length > 0 &&
      alerts.map((alert) => (
        <Bounce left duration={500}>
          <div
            key={alert.id}
            className={`alert alert-${alert.alertType}`}
            style={{ border: '2px solid ' }}
          >
            {alert.alertType === 'danger' ? (
              <span>
                <strong>
                  <FaTimes />
                </strong>
                &nbsp;
                {alert.msg}
              </span>
            ) : (
              <span>
                <strong>Success : </strong>
                {alert.msg}
              </span>
            )}
          </div>
        </Bounce>
      ))}
  </div>
);

alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
