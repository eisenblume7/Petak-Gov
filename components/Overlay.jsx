import React from 'react';
import SignInForm from './SignInForm';

const Overlay = () => {
    const [isOpen, setIsOpen] = React.useState(false);

    const toggleOverlay = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`overlay ${isOpen ? 'overlay--visible' : ''}`}>
            <button onClick={toggleOverlay}>Open Sign-In Form</button>
            {isOpen && <SignInForm />}
        </div>
    );
};

export default Overlay;