import React, { useState } from 'react';
import { Container } from 'react-bootstrap'
import Card from '../components/card';
import Androidsvg from '../assets/androidsvg.svg';
import Websvg from '../assets/web.svg';
import Gatsbysvg from '../assets/gatsby.svg';
import Footer from '../components/footer';

export default function Courses() {

    // const [ cardState ] = useState({
    //     cards: [
    //       { id: '1', title: 'Android App Development', tutor: 'joe Biden', rating: '4.4'},
    //       { id: '2', title: 'Android App Development', tutor: 'joe Biden', rating: '$4.2'},
    //       { id: '3', title: 'Android App Development', tutor: 'joe Biden', rating: '4.4'},
    //       { id: '4', title: '2021 Complete Python Bootcamp', tutor: 'Donald trump', rating: '$5'},
    //       { id: '5', title: 'Android App Development', tutor: 'joe Biden', rating: '4.4'},
    //       { id: '6', title: 'Android App Development', tutor: 'joe Biden', rating: '$4.2'},
    //       { id: '7', title: 'Android App Development', tutor: 'joe Biden', rating: '4.4'},
    //       { id: '8', title: '2021 Complete Python Bootcamp', tutor: 'Donald trump', rating: '$5'}
    //     ]
    //   });
    
    //   let cards = (
        
    //     <div className = "courses-cards">
    //       {cardState.cards.map((card, index) => {
    
    //         return <Card
    //         svg = {Androidsvg}
    //         title = { card.title }
    //         tutor = { card.tutor }
    //         rating = { card.rating}
    //         key = { card.id }
    //         />
    //       })}
    //     </div>
    //   );

    const style1 = {
        fontWeight: 800,
        marginTop: "60px"
    };

    const style2 = {
        fontWeight: 500
    };

    return (
        <div>
            <Container>
                <h3 style = {style1}>Learn the best tools <br/> and platforms</h3>
                <p style = {style2}>We focus on industry leading platforms so that <br/> 
                you can be prepared for your next job.</p>
                
                {/* <div className = "courses-cards">
                    { cards }
                </div> */}
                

                <div className = "courses-cards">
                    <Card svg = {Androidsvg} title = "Android App Development" tutor = "joe Biden" rating = "4.4"/>
                    <Card svg = {Websvg} title = "Web Development" tutor = "Donald Trump" rating = "4.9"/>
                    <Card svg = {Gatsbysvg} title = "Full Gatsbay Bootcamp" tutor = "Raju Muna" rating = "3.3"/>
                    <Card svg = {Androidsvg} title = "Android App Development" tutor = "joe Biden" rating = "4.4"/>
                </div>

                <div className = "courses-cards">
                    <Card svg = {Androidsvg} title = "Android App Development" tutor = "joe Biden" rating = "4.4"/>
                    <Card svg = {Androidsvg} title = "Android App Development" tutor = "joe Biden" rating = "4.4"/>
                    <Card svg = {Androidsvg} title = "Android App Development" tutor = "joe Biden" rating = "4.4"/>
                    <Card svg = {Androidsvg} title = "Android App Development" tutor = "joe Biden" rating = "4.4"/>
                </div>
                
            </Container>

            <Footer />
        </div>
    )
}
