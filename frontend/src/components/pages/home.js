import React, {useState, useEffect} from 'react';
import logo from "./arcade-logo.png";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWrench } from "@fortawesome/free-solid-svg-icons";
import ImageSlider from './ImageSlider';
import { SliderData } from './SliderData';

library.add(faWrench);

export default function Home() {

    return (
        <div className='home-container'>
            <img src={logo} />
            <div className='welcome'>Thank You For Visiting My Site</div>
            <div className='construction'><FontAwesomeIcon icon="fa-solid fa-wrench" />We are curently still under construction and only have one playable game but MORE WILL BE ADDED SOON<FontAwesomeIcon icon="fa-solid fa-wrench" /></div>
            <div className='instructions'>Please Sign Up with the link above to be taken to the game and the soon to be game library!</div>
            <ImageSlider slides={SliderData} />;
        </div>
    );

}