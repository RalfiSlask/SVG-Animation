import { useState, useEffect } from 'react';
import anime from 'animejs';

const ShootingStars = () => {
  const [dimensions, setDimensions] = useState({
    vw: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
    vh: Math.max(
      document.documentElement.clientHeight,
      window.innerHeight || 0
    ),
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        vw: Math.max(
          document.documentElement.clientWidth,
          window.innerWidth || 0
        ),
        vh: Math.max(
          document.documentElement.clientHeight,
          window.innerHeight || 0
        ),
      });
    };

    window.addEventListener('resize', handleResize);

    starryNight();
    shootingStars();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const starryNight = () => {
    anime({
      targets: ['#sky .star'],
      opacity: [
        { duration: 700, value: '0' },
        { duration: 700, value: '1' },
      ],
      easing: 'linear',
      loop: true,
      delay: (el, i) => 50 * i,
    });
  };

  const shootingStars = () => {
    anime({
      targets: ['#shootingstars .wish'],
      easing: 'linear',
      loop: true,
      delay: (el, i) => 1000 * i,
      opacity: [{ duration: 700, value: '1' }],
      width: [{ value: '100px' }, { value: '0px' }],
      translateX: 350,
    });
  };

  const randomRadius = () => Math.random() * 0.7 + 0.6;
  const getRandomX = () =>
    Math.floor(Math.random() * Math.floor(dimensions.vw)).toString();
  const getRandomY = () =>
    Math.floor(Math.random() * Math.floor(dimensions.vh)).toString();

  return (
    <div>
      <svg id="sky">
        {[...Array(60)].map((x, y) => (
          <circle
            cx={getRandomX()}
            cy={getRandomY()}
            r={randomRadius()}
            stroke="none"
            strokeWidth="0"
            fill="white"
            key={y}
            className="star"
          />
        ))}
      </svg>
      <div id="shootingstars">
        {[...Array(60)].map((x, y) => (
          <div
            key={y}
            className="wish"
            style={{ left: `${getRandomY()}px`, top: `${getRandomX()}px` }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ShootingStars;
