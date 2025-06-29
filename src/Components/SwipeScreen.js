import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 👈 Import this
import '../css/SwipeScreen.css';

const SwipeScreen = () => {
  const containerRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);

  const navigate = useNavigate(); // 👈 Initialize navigate

  const handleStart = (e) => {
    setDragging(true);
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    setStartX(clientX);
  };

  const handleMove = (e) => {
    if (!dragging) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const containerWidth = containerRef.current.offsetWidth;
    const diff = Math.min(clientX - startX, containerWidth - 50); // 50 is arrow size
    if (diff >= 0) {
      setTranslateX(diff);
    }
  };

  const handleEnd = () => {
    if (!dragging) return;
    setDragging(false);

    const containerWidth = containerRef.current.offsetWidth;

    if (translateX >= containerWidth - 60) {
      navigate('/login'); // 👈 Redirect instead of alert
    }

    setTranslateX(0); // Reset arrow
  };

  return (
    <div className="mobile-view">
      <div className="content-wrapper">
        <div className="top-section">
          <div className="logo">
            <div className="icon-placeholder">🟦</div>
            <h1 className="h1">Rabbit XQ</h1>
          </div>
          <h2 className="h2">Experience the future</h2>
          <p className="p">
            Immerse yourself in tomorrow, today - <br />
            where innovation meets imagination.
          </p>
        </div>

        <div
          className="swipe-button"
          ref={containerRef}
          onMouseMove={handleMove}
          onMouseUp={handleEnd}
          onMouseLeave={handleEnd}
          onTouchMove={handleMove}
          onTouchEnd={handleEnd}
        >
          <span className="swipe-label">SWIPE ME</span>
          <div
            className="arrow draggable-arrow"
            onMouseDown={handleStart}
            onTouchStart={handleStart}
            style={{ transform: `translateX(${translateX}px)` }}
          >
            &#10132;
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwipeScreen;
