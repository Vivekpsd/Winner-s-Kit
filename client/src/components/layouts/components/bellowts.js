import React from 'react';
import videoIcon from '../assets/icons/video.png';
import infinityIcon from '../assets/icons/infinity.png';
import medalIcon from '../assets/icons/medal.png';

const titles = () => {

    return (
        <div className = "title-holder">

            <div className = "title">

                <img src={videoIcon} alt="icon"/>

                <div className = "hp">

                    <h5>130,000 online courses</h5>
                    <p>Enjoy a variety of fresh topics</p>

                </div>

            </div>

            <div className = "title">

                <img src={medalIcon} alt="icon"/>

                <div className = "hp">

                    <h5>Expert instruction</h5>
                    <p>Find the right instructor for you</p>

                </div>

            </div>

            <div className = "title">

                <img src={infinityIcon} alt="icon"/>

                <div className = "hp">

                    <h5>Lifetime access</h5>
                    <p>Learn on your schedule</p>

                </div>

            </div>

        </div>
    )
}

export default titles;