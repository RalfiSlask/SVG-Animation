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
import Lightbox from './components/Lightbox';
import Skeleton from './assets/images/skeleton.png';
import Ship from './assets/images/ship.png';
/* import Turtle from './assets/images/turtle.jpg'; */

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
  const shipRef = useRef(null);
  const [scroll, setScroll] = useState(0);
  const [chestOpen, setChestOpen] = useState(false);

  const handleClickOnChest = () => {
    setChestOpen(true);
    if (themeRef.current) {
      themeRef.current.play();
    }
  };

  const animateText = () => {
    if (!jackRef.current) {
      console.log('SVG not loaded');
      return;
    }

    const paths = jackRef.current.querySelectorAll('path');
    if (paths.length === 0) {
      console.log('No paths found');
      return;
    }

    gsap.killTweensOf(paths);

    gsap.set(jackRef.current.querySelectorAll('path'), {
      strokeDashoffset: (i, target) => {
        return target.getTotalLength();
      },
      strokeDasharray: (i, target) => {
        return target.getTotalLength();
      },
      stroke: scroll > 90 ? '#FFF' : '#000',
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
  };

  useEffect(() => {
    animateText();

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

  const closeMap = () => {
    setChestOpen(false);
    if (themeRef.current) {
      themeRef.current.pause();
      themeRef.current.currentTime = 0;
    }
  };

  useEffect(() => {
    gsap.to(shipRef.current, {
      x: (scroll / 100) * -window.innerWidth * 0.3,
      y: 30 * Math.sin(0.5 * scroll),
      duration: 0.6,
      ease: 'none',
    });

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
      {chestOpen && <Lightbox closeMap={closeMap} />}
      {scroll > 90 && (
        <div>
          <ShootingStars />
        </div>
      )}
      {chestOpen && (
        <div className="absolute z-[999] w-[60%] h-[60%] max-w-[1200px] top-0 left-1/2 -translate-x-1/2">
          <MapAnimation />
        </div>
      )}
      <div
        ref={birdRef}
        onClick={playLaugh}
        className="w-[200px] h-[200px] absolute z-50 top-[-5%] left-1/2 -translate-x-1/2 sm:translate-x-0 cursor-pointer"
      >
        <audio
          ref={laughRef}
          /*  src="./src/assets/sounds/laugh.mp3" */
          src="/SVG-Animation/laugh.mp3"
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
      <div className="absolute left-1/2 top-[20%] -translate-x-1/2 z-40 flex items-center gap-4">
        <TextAnimation jackRef={jackRef} />
      </div>

      <div className="w-[700px] h-[500px] absolute z-40 bottom-20 sm:bottom-32 left-1/2 -translate-x-1/2 flex items-end">
        <div className="relative w-full h-full">
          <PalmAnimation />
          <img
            onClick={animateText}
            src={JackSparrow}
            alt="jack sparrow"
            height="160"
            width="160"
            className="absolute h-[160px] hover:scale-110 cursor-pointer transition-all duration-300 ease-in-out z-10 sm:z-40 bottom-16 sm:bottom-12 right-1/2 translate-x-1/2  sm:right-[15%] sm:translate-x-0"
          />
        </div>
      </div>
      <img
        ref={shipRef}
        src={Ship}
        alt="pirate ship"
        width="400"
        height="200"
        className="absolute z-30 bottom-8 sm:bottom-16 right-0 sm:right-[5%] 2xl:right-[10%]"
      />
      <div>
        <img
          ref={themeRef}
          onClick={handleClickOnChest}
          src={chestOpen ? OpenChest : ClosedChest}
          alt="chest"
          width="200"
          height="400"
          className="absolute left-1/2 hover:scale-110 transition-all duration-300 ease-in-out -translate-x-1/2 bottom-20 sm:bottom-48 cursor-pointer h-[80px] w-[120px] z-[34] sm:z-50"
        />

        <audio
          ref={themeRef}
          /*   src="./src/assets/sounds/pirates.mp3" */
          src="/SVG-Animation/pirates.mp3"
          preload="auto"
        >
          Your browser has no support
        </audio>
      </div>
      <img
        src={Skeleton}
        alt="sceleton"
        width="100"
        height="100"
        className={`${
          scroll > 90 ? 'translate-0' : 'translate-y-20'
        } transition-all duration-500 ease-in-out absolute z-30 sm:rotate-[-15deg] bottom-32 sm:bottom-48 xl:bottom-32 left-1/2 -translate-x-1/2 sm:left-[50%] md:left-[45%] xl:left-[35%] 2xl:left-[40%]`}
      />
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
        className={`min-w-full w-full relative transition-all duration-300 ease-in ${
          scroll > 90 ? 'bg-black' : 'bg-gradient'
        } z-10`}
        ref={mainRef}
      ></main>
    </>
  );
}

export default App;
