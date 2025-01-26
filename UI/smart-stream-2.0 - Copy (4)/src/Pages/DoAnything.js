import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo, faPlay, faPlus } from '@fortawesome/free-solid-svg-icons';
import { loadFull } from "tsparticles";
import Particles from "react-tsparticles";
import Base from '../component/Base';

function DoAnything() {
  const [timeLeft, setTimeLeft] = useState(3600); // 1-hour countdown

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer); // Cleanup on unmount
  }, []);

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const particleOptions = {
    particles: {
      number: {
        value: 100,
      },
      shape: {
        type: "circle",
      },
      size: {
        value: 3,
      },
      move: {
        speed: 2,
      },
    },
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    fontFamily: "'Poppins', sans-serif",
    textAlign: 'center',
    padding: '0 20px',
    color: '#fff',
    animation: 'gradientAnimation 15s ease infinite',
    background: 'linear-gradient(45deg, #1a2a6c, #b4b8e1)',
    backgroundSize: '300% 300%',
    position: 'relative',
    overflow: 'hidden',
  };

  const headingStyle = {
    fontSize: '40px',
    fontWeight: '700',
    marginBottom: '20px',
    color: '#fff',
    textShadow: '2px 2px 6px rgba(0, 0, 0, 0.3)',
    letterSpacing: '1px',
  };

  const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '30px',
    flexWrap: 'wrap',
    marginTop: '20px',
  };

  const buttonStyle = {
    padding: '16px 32px',
    fontSize: '18px',
    fontWeight: '500',
    cursor: 'pointer',
    border: 'none',
    borderRadius: '30px',
    textTransform: 'uppercase',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease',
    boxShadow: '0 6px 15px rgba(0, 0, 0, 0.2)',
    color: 'white',
    background: 'linear-gradient(135deg, #ff3b3f, #d64d56)',
  };

  const fabStyle = {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    backgroundColor: '#ff3b3f',
    border: 'none',
    borderRadius: '50%',
    padding: '15px',
    fontSize: '24px',
    color: 'white',
    cursor: 'pointer',
    boxShadow: '0 6px 15px rgba(0, 0, 0, 0.3)',
    transition: 'transform 0.3s ease',
  };

  const getTimeBasedGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) return "Good Morning!";
    if (hours < 18) return "Good Afternoon!";
    return "Good Evening!";
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <Base>
      <div style={containerStyle}>
        <style>
          {`
          @keyframes gradientAnimation {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          `}
        </style>
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={particleOptions}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        />
        <h1 style={headingStyle}>
          {getTimeBasedGreeting()} The Best Place to Do Anything!
        </h1>
        <div style={{ fontSize: '32px', color: 'white', marginBottom: '20px' }}>
          Time Left: {formatTime(timeLeft)}
        </div>
        <div style={buttonContainerStyle}>
          <Link to="/live">
            <button style={buttonStyle}>
              <FontAwesomeIcon icon={faVideo} style={{ marginRight: '8px' }} /> Streaming
            </button>
          </Link>
          <Link to="/focusroom2">
            <button style={buttonStyle}>
              <FontAwesomeIcon icon={faPlay} style={{ marginRight: '8px' }} /> Meet
            </button>
          </Link>
        </div>
        <button style={fabStyle}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
    </Base>
  );
}

export default DoAnything;
