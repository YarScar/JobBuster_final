import React, { useEffect, useState } from 'react';
import '../styles/Stars.css';

function Stars() {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const generateStars = () => {
      const starArray = Array.from({ length: 30 }, () => ({
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: `${Math.random() * 5 + 5}px`,
        animationDelay: `${Math.random() * 5}s`,
      }));
      setStars(starArray);
    };

    generateStars();
  }, []);

  return (
    <div className="stars-container">
      {stars.map((star, index) => (
        <div
          key={index}
          className="star"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            animationDelay: star.animationDelay,
          }}
        ></div>
      ))}
    </div>
  );
}

export default Stars;
