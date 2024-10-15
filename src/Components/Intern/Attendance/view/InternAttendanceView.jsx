import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const InternAttendanceView = ({ handleTimeIn, handleTimeOut, isTimeInDisabled, isTimeOutDisabled }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const savedTimeIn = Cookies.get('timeIn');
    const savedTimeOut = Cookies.get('timeOut');

    if (savedTimeIn) {
      setCurrentTime(new Date(savedTimeIn)); 
    } else if (savedTimeOut) {
      setCurrentTime(new Date(savedTimeOut)); 
    } else if (!isTimeInDisabled) {
      const interval = setInterval(() => {
        setCurrentTime(new Date());
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isTimeInDisabled, isTimeOutDisabled]);

  const getRotation = (type) => {
    const hours = currentTime.getHours() % 12;
    const minutes = currentTime.getMinutes();
    const seconds = currentTime.getSeconds();

    switch (type) {
      case 'hours':
        return (hours + minutes / 60) * 30; 
      case 'minutes':
        return (minutes + seconds / 60) * 6; 
      case 'seconds':
        return seconds * 6; 
      default:
        return 0;
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '70vh',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          gap: '350px',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div className='heading'>Time In</div>
          <div
            onClick={!isTimeInDisabled ? handleTimeIn : null}
            style={{
              cursor: isTimeInDisabled ? 'not-allowed' : 'pointer',
              marginTop: '20px',
              opacity: isTimeInDisabled ? 0.5 : 1,
              pointerEvents: isTimeInDisabled ? 'none' : 'auto', 
            }}
          >
            <div
              className={`card ${isTimeInDisabled ? 'disabled' : ''}`} 
            >
              <div className="numbers">
                <span className="number"></span>
                <span className="number"></span>
                <span className="number"></span>
                <span className="number"></span>
                <span className="number"></span>
                <span className="number"></span>
                <span className="number"></span>
                <span className="number"></span>
                <span className="number"></span>
                <span className="number"></span>
                <span className="number"></span>
                <span className="number"></span>
              </div>
              <div className="needles">
                <span
                  className="h"
                  style={{
                    transform: `translate(-50%, -100%) rotateZ(${getRotation('hours')}deg)`,
                    animation: isTimeInDisabled ? 'none' : '', 
                  }}
                ></span>
                <span
                  className="m"
                  style={{
                    transform: `translate(-50%, -100%) rotateZ(${getRotation('minutes')}deg)`,
                    animation: isTimeInDisabled ? 'none' : '',
                  }}
                ></span>
                <span
                  className="s"
                  style={{
                    transform: `translate(-50%, -80%) rotateZ(${getRotation('seconds')}deg)`,
                    animation: isTimeInDisabled ? 'none' : '',
                  }}
                ></span>
                <span className="center"></span>
              </div>
              <div className="pie"></div>
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div className='heading'>Time Out</div>
          <div
            onClick={!isTimeOutDisabled ? handleTimeOut : null}
            style={{
              cursor: isTimeOutDisabled ? 'not-allowed' : 'pointer',
              marginTop: '20px',
              opacity: isTimeOutDisabled ? 0.5 : 1,
            }}
          >
            <div className="card">
              <div className="numbers">
                <span className="number"></span>
                <span className="number"></span>
                <span className="number"></span>
                <span className="number"></span>
                <span className="number"></span>
                <span className="number"></span>
                <span className="number"></span>
                <span className="number"></span>
                <span className="number"></span>
                <span className="number"></span>
                <span className="number"></span>
                <span className="number"></span>
              </div>
              <div className="needles">
                <span className="h" style={{ transform: `translate(-50%, -100%) rotateZ(${getRotation('hours')}deg)` }}></span>
                <span className="m" style={{ transform: `translate(-50%, -100%) rotateZ(${getRotation('minutes')}deg)` }}></span>
                <span className="s" style={{ transform: `translate(-50%, -80%) rotateZ(${getRotation('seconds')}deg)` }}></span>
                <span className="center"></span>
              </div>
              <div className="pie"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternAttendanceView;