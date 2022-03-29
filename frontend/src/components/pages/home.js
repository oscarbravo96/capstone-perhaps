import React, {useState, useEffect} from 'react';
import logo from "./arcade-logo.png";


export default function Home() {

    return (
        <div className='home-container'>
            <img src={logo} />
            <div className='welcome'>Thank You For Visiting My Site</div>
            <div className='construction'>We are curently still under construction and only have one playable game but MORE WILL BE ADDED SOON</div>
            <div className='instructions'>Please Sign Up with the link above to be taken to the game and the soon to be game library!</div>
        </div>
    );

}