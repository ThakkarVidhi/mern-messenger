import React from 'react';
import { Link } from "react-router-dom";
import NavBar from '../components/NavBar';
import videochat from "../assets/video-chat.jpg";
import groupchat from "../assets/groupchat.jpg";
import chat from "../assets/chat.jpg";
import audiochat from "../assets/audiochat.jpg";
import { DivProps } from '../types';
import Loading from '../components/Loading';

function Div({headingText, text, img}: DivProps) {

    const imgRef = React.useRef<HTMLImageElement>(null!);
    const [isLoaded, setIsLoaded] = React.useState(false);

    const handleLoad = () => {
        setIsLoaded(imgRef.current.complete);
    }

    return (
        <div className='flex items-center flex-wrap justify-around mb-20 even:flex-row-reverse'>
            {
                !isLoaded && <Loading />
            }
            <img onLoad={handleLoad} ref={imgRef} loading='lazy' 
                className={`${isLoaded ? "sm:w-[300px] w-72" : "w-0" } rounded-md`} src={img} alt="chat" />
            <div className='flex flex-col gap-6'>
                <h2 className='font-heading text-2xl text-center sm:text-3xl sm:text-start'>{ headingText }</h2>
                <p className='sm:text-lg sm:text-start text-base text-center'>{ text }</p>
            </div>
        </div>
    )
}

function LandingPage() {
    return (
        <div>
            <NavBar />

            <div className='mt-20'>
                <Div img={chat} headingText="Instant Realtime messaging." 
                text='Sending message in realtime to loved ones and friends from all over the world.' />
            </div>

            <div className='flex justify-center items-center mb-8'>
                <button className='bg-register text-gray-600 px-4 py-2 rounded-lg font-bold drop-shadow-2xl active:scale-75 duration-300'>
                    <Link to="/register">Get started</Link>
                </button>
            </div>

            <div className='w-3/4 m-auto h-[2px] bg-white'></div>

            <div className='flex justify-center items-center my-10 text-base text-center sm:text-lg'>
                <p>Copyright &copy; Connexus, 2025. All rights reserved. </p>
            </div>
        </div>
    );
}

export default LandingPage;