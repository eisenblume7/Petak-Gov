import React from 'react';
import SignInForm from '../components/SignInForm';

const Overlay = () => {
    return (
        <div className="overlay flex items-center justify-center h-screen mb-12 bg-fixed bg-center bg-cover custom-img">
            <div className='z-[3]'>
                <SignInForm/>
            </div>
            <div className='absolute top-0 left-0 right-0 bottom-0 bg-black/70 z-[2]]'/>
        </div>
    );
};

export default Overlay;
