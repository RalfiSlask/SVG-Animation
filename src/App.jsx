import PalmAnimation from './components/PalmAnimation';
import BirdAnimation from './components/BirdAnimation';
import MapAnimation from './components/MapAnimation';
import JackSparrow from './assets/images/Jack.png';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import Moon from './assets/images/moon.png';
import Sun from './assets/images/sun.png';
import ShootingStars from './components/ShootingStars';
import Island from './assets/images/island.png';
import CloudOne from './assets/images/cloud1.png';
import CloudTwo from './assets/images/cloud2.png';
import TextAnimation from './TextAnimation';
import ScrollAnimation from './components/ScrollAnimation';
import OpenChest from './assets/images/open.png';
import ClosedChest from './assets/images/closed.png';

function App() {
  const jackRef = useRef(null);
  const birdRef = useRef(null);
  const moonRef = useRef(null);
  const mainRef = useRef(null);
  const sunRef = useRef(null);
  const cloudOneRef = useRef(null);
  const cloudTwoRef = useRef(null);
  const waveTwoRef = useRef(null);
  const waveThreeRef = useRef(null);
  const scrollRef = useRef(null);
  const laughRef = useRef(null);
  const themeRef = useRef(null);

  const [scroll, setScroll] = useState(0);
  const [chestOpen, setChestOpen] = useState(false);

  const handleClickOnChest = () => {
    setChestOpen(true);
    if (themeRef.current) {
      themeRef.current.play();
    }
  };

  useEffect(() => {
    gsap.set(jackRef.current.querySelectorAll('path'), {
      strokeDashoffset: (i, target) => {
        return target.getTotalLength();
      },
      strokeDasharray: (i, target) => {
        return target.getTotalLength();
      },
      stroke: '#000',
      strokeWidth: 1,
      fill: 'none',
    });

    gsap.to(jackRef.current.querySelectorAll('path'), {
      strokeDashoffset: 0,
      duration: 2,
      ease: 'power1.inOut',
      stagger: 0.2,
      fill: '#000',
    });

    gsap.to(birdRef.current, {
      delay: 0.2,
      duration: 2,
      y: window.innerHeight * 0.2,
      ease: 'none',
    });

    gsap.to(waveTwoRef.current, {
      delay: 0.5,
      duration: 1,
      marginBottom: 5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      autoRound: false,
    });

    gsap.to(waveThreeRef.current, {
      delay: 1,
      duration: 1,
      marginBottom: 5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      autoRound: false,
    });

    const scrollMax = 100;
    const handleScrollDown = (event) => {
      event.preventDefault();
      setScroll((prev) => {
        let nextValue = event.deltaY > 0 ? prev + 10 : prev - 10;
        nextValue = Math.max(0, Math.min(nextValue, scrollMax));
        return nextValue;
      });
    };

    window.addEventListener('wheel', handleScrollDown, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleScrollDown);
    };
  }, []);

  useEffect(() => {
    gsap.to(birdRef.current, {
      x: (scroll / 100) * window.innerWidth,
      ease: 'none',
    });
    gsap.to(moonRef.current, {
      y: (scroll / 100) * -window.innerHeight,
      ease: 'none',
    });
    gsap.to(jackRef.current.querySelectorAll('path'), {
      stroke: scroll > 80 ? '#FFF' : '#000',
      ease: 'none',
    });
    gsap.to(sunRef.current, {
      y: (scroll / 100) * -window.innerHeight,
      ease: 'none',
    });
    gsap.to(cloudOneRef.current, {
      y: scroll > 15 && (scroll / 100) * -window.innerHeight,
      ease: 'none',
    });
    gsap.to(cloudTwoRef.current, {
      y: scroll > 30 && (scroll / 100) * -window.innerHeight,
      ease: 'none',
    });
  }, [scroll]);

  const playLaugh = () => {
    if (laughRef.current) {
      laughRef.current.play();
    }
  };

  return (
    <>
      {scroll > 90 && (
        <div>
          <ShootingStars />
        </div>
      )}
      {chestOpen && (
        <div className="absolute z-30 left-1/2 -translate-x-1/2 top-20">
          <MapAnimation />
        </div>
      )}
      <div
        ref={birdRef}
        onClick={playLaugh}
        className="w-[200px] h-[200px] absolute z-50 top-[-5%] left-1/2 cursor-pointer"
      >
        <audio
          ref={laughRef}
          src="./src/assets/sounds/laugh.mp3"
          preload="auto"
        >
          Your browser has no support
        </audio>
        <BirdAnimation />
      </div>
      <div
        ref={scrollRef}
        className={`absolute right-[5%] bottom-[20%] transition-all duration-500 ease-in z-50 ${
          scroll > 80 ? 'rotate-180' : 'rotate-0'
        }`}
      >
        <ScrollAnimation />
      </div>

      <TextAnimation jackRef={jackRef} />
      <div className="w-[700px] h-[500px] absolute z-40 bottom-20 sm:bottom-32 left-1/2 -translate-x-1/2 flex items-end">
        <div className="relative w-full h-full">
          <PalmAnimation />
          <img
            src={JackSparrow}
            alt="jack sparrow"
            height="160"
            width="160"
            className="absolute h-[160px] z-30 sm:z-40 bottom-24 sm:bottom-12 right-[15%] cursor-pointer"
          />
        </div>
      </div>
      <div>
        <img
          ref={themeRef}
          onClick={handleClickOnChest}
          src={chestOpen ? OpenChest : ClosedChest}
          alt="chest"
          width="200"
          height="400"
          className="absolute left-1/2 hover:scale-110 transition-all duration-300 ease-in-out -translate-x-1/2 bottom-20 sm:bottom-44 cursor-pointer h-[80px] w-[120px] z-[34] sm:z-50"
        />

        <audio
          ref={themeRef}
          src="./src/assets/sounds/pirates.mp3"
          preload="auto"
        >
          Your browser has no support
        </audio>
      </div>

      <img
        ref={cloudOneRef}
        src={CloudOne}
        alt="cloud"
        width="200"
        height="200"
        className="absolute left-[15%] top-8 z-30"
      />
      <img
        ref={cloudTwoRef}
        src={CloudTwo}
        alt="cloud"
        width="200"
        height="200"
        className="absolute right-[15%] top-8 z-30"
      />

      <img
        src={Island}
        alt="island"
        width="1200"
        height="1200"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 z-30 h-[150px] sm:h-[225px]"
      />
      <img
        src={Moon}
        alt="sun"
        width="100"
        ref={moonRef}
        className="absolute bottom-[-5%] z-50 left-10"
      />
      <img
        src={Sun}
        alt="sun"
        width="100"
        ref={sunRef}
        className="absolute top-10 z-50 left-10"
      />

      <div className="sea-animation h-[120px] sm:h-[150px]"></div>
      <div
        ref={waveTwoRef}
        className="sea-animation-three h-[120px] sm:h-[170px]"
      ></div>
      <div
        ref={waveThreeRef}
        className="sea-animation-two h-[120px] sm:h-[190px]"
      ></div>

      <main
        className={`min-w-full w-full relative transition-all duration-500 ease-in ${
          scroll > 90 ? 'bg-black' : 'bg-yellow-200'
        } z-10`}
        ref={mainRef}
      ></main>
    </>
  );
}

export default App;
