import Header from "../Header";
import React from 'react';
import './About.css';

function About() {
    return (
        <div className='about'>
            <Header /><br />
            <div className="context">
                <h2>-Game description-</h2>
                <p>
                    Calcubud is a fun math quiz game made for nerds to fidget with, it generates random equations that players are expected to finish within a specific time. It'll
                    help you practice and keep your brain sharp.</p>
                <span>
                    <h3>-Tips-</h3>
                    <ul>
                        <li> Difficulty increases with mode i.e from basic to pro  </li>
                        <li> Calculators are prohibited</li>
                        <li> If you're overwhelmed, you can solve on a plain rough sheet</li>
                        <li> There's a time-out function, Get schwifty!</li>
                        <li> You'll see the summary of your exercise when your time runs out or you finih the game</li>
                        <li> Plug in headphones and increase volume to the max</li>
                    </ul>
                    <br /><br />
                    <h4>-Good luck, Spartan!-</h4>
                </span>
            </div>
        </div>
    );
}

export default About;