import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import Base from '../component/Base'; // Assuming this is your Base component

const HomePage = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(moment.duration(30, 'minutes'));
  
  // Reference to the video element
  const videoRef = useRef(null);

  // Countdown Timer Effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev.subtract(1, 'second'));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Ensure the video plays with sound
  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;
      video.play().catch((error) => {
        console.log('Error trying to play the video:', error);
      });
    }
  }, []);

  // Set video volume to 10% when component mounts
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = 0.1; // 10% volume
    }
  }, []);

  const handleSignUpClick = () => {
    navigate('/signup'); // Navigate to Sign Up page
  };

  const handleSignInClick = () => {
    navigate('/login'); // Navigate to Sign In page
  };

  const bannerStyles = {
    width: '100%',
    height: '100vh',
    position: 'relative',
    background: 'rgb(0 0 0 / 17%)',
  };

  const overlayStyles = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.40)', // Dark overlay
    zIndex: 1, // Ensures the overlay is above the video but below the content
  };

  const videoStyles = {
    position: 'fixed', // Fixed background video
    top: 0,
    left: 0,
    width: '100%', // Full width
    height: '100%', // Full height
    objectFit: 'cover', // Ensures the video covers the area
    zIndex: -1, // Ensure the video stays behind the overlay
  };

  const contentStyles = {
    width: '100%',
    position: 'absolute',
    color: 'white',
    top: '45%',
    transform: 'translateY(-50%)', // Center the content vertically
    textAlign: 'center',
    zIndex: 2, // Content should be above the overlay
  };

  const headingStyles = {
    marginTop: '80px',
    fontSize: '50px',
    fontWeight: 800,
  };

  const subheadingStyles = {
    marginTop: '36px',
    fontSize: '23px',
    fontWeight: 700,
  };

  const buttonStyles = {
    width: '200px',
    padding: '15px',
    margin: '20px 10px',
    textAlign: 'center',
    borderRadius: '30px', // Round button edges
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
    fontWeight: 600,
    transition: '0.3s ease-in-out',
    outline: 'none',
  };

  const signupButtonStyles = {
    background: 'linear-gradient(148deg, #0043f0, #858585)',
    marginRight: '10px',
    color: '#efefef',
    borderRadius: '12px',
  };

  const signupButtonHoverStyles = {
    background: 'linear-gradient(135deg, #2575fc, #6a11cb)', // Reverse gradient on hover
  };

  const signinButtonStyles = {
    background: 'linear-gradient(148deg, #ff107e, #858585)',
    marginRight: '10px',
    color: '#efefef',
    borderRadius: '12px',
  };

  const signinButtonHoverStyles = {
    background: 'linear-gradient(135deg, #dd2476, #ff512f)', // Reverse gradient on hover
  };

  return (
    <Base>
      <div style={bannerStyles}>
        {/* Video element */}
        <video ref={videoRef} autoPlay loop playsInline style={videoStyles}>
          <source src="video1.mp4" type="video/mp4" />
          {/* Fallback if the video file is not found */}
          Your browser does not support the video tag.
        </video>

        {/* Dark overlay */}
        <div style={overlayStyles}></div>

        {/* Content */}
        <div style={contentStyles}>
          <h1 style={headingStyles}>
            Working towards your dreams is hard. Not reaching them is harder.
          </h1>
          <h2 style={subheadingStyles}>
            Get work done with others from around the 🌎
          </h2>
          {/* Sign Up and Sign In buttons */}
          <button
            style={{ ...buttonStyles, ...signupButtonStyles }}
            onClick={handleSignUpClick}
            onMouseOver={(e) => (e.currentTarget.style.background = signupButtonHoverStyles.background)}
            onMouseOut={(e) => (e.currentTarget.style.background = signupButtonStyles.background)}
          >
            Sign Up
          </button>
          <button
            style={{ ...buttonStyles, ...signinButtonStyles }}
            onClick={handleSignInClick}
            onMouseOver={(e) => (e.currentTarget.style.background = signinButtonHoverStyles.background)}
            onMouseOut={(e) => (e.currentTarget.style.background = signinButtonStyles.background)}
          >
            Sign In
          </button>
        </div>
      </div>
    </Base>
  );
};

export default HomePage;
