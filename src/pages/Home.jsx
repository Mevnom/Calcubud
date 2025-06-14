import React from 'react';
import './Home.css';
import EquationQuizGame from '../EquationGenerator';
import HamburgerMenu from "../HamburgerMenu";
import Header from '../Header';


function Home() {
    return (<div>
        <Header /><br /><br />
        <span className='equspan'>
            <EquationQuizGame />
        </span>
    </div>
    );
}

export default Home;