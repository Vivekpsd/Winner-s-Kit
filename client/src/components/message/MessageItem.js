import React, { Fragment } from 'react';

import { FcCalendar, FcClock, FcInfo } from 'react-icons/fc';

const MessageItem = ({
  profile,
  message: { message, sentBy, senderID, date },
}) => {
  return (
    <Fragment>
      <div>
        {profile.user._id === senderID ? (
          <Fragment>
            <div className='container '>
              <div className='row'>
                <div className='col-10  mt-3'>
                  <div
                    className='pl-5 pt-4 pb-3 pr-5'
                    style={{
                      border: '2px solid black',
                      borderRadius: '10px',
                      backgroundColor: 'white',
                      opacity: '0.9',
                    }}
                  >
                    <blockquote className='blockquote'>
                      <p className='mb-0'>{message}</p>

                      <footer className='blockquote-footer'>
                        <cite title='Source Title'>
                          {profile.user._id === senderID ? (
                            <span>Send by you</span>
                          ) : (
                            <span>{sentBy}</span>
                          )}
                        </cite>
                      </footer>
                    </blockquote>

                    {/* <p>{senderID}</p> */}
                    <div className='container'>
                      <div className='row'>
                        <div className='col-12'>
                          <FcCalendar />
                          &nbsp;&nbsp;
                          {date.substring(0, 10)}
                          &nbsp;&nbsp;&nbsp;&nbsp;
                          <FcClock />
                          &nbsp;&nbsp;
                          {date.substring(11, 16)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Fragment>
        ) : (
          <Fragment>
            <div className='container'>
              <div className='row'>
                <div className='col-10 mt-4'>
                  <div
                    className='pl-5 pt-4 pb-3 pr-5'
                    style={{
                      border: '2px solid black',
                      borderRadius: '10px',
                      backgroundColor: 'white',
                      opacity: '0.9',
                    }}
                  >
                    <blockquote className='blockquote'>
                      <p className='mb-0'>{message}</p>

                      <footer className='blockquote-footer'>
                        <cite title='Source Title'>
                          {profile.user._id === senderID ? (
                            <span>Send By You</span>
                          ) : (
                            <span>{sentBy}</span>
                          )}
                        </cite>
                      </footer>
                    </blockquote>
                    <p>
                      <FcCalendar />
                      &nbsp;&nbsp;
                      {date.substring(0, 10)}
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <FcClock />
                      &nbsp;&nbsp;
                      {date.substring(11, 16)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

export default MessageItem;
