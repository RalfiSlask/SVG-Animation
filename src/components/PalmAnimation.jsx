import { useLottie } from 'lottie-react';
import palm from '../assets/lotties/palm.json';

const PalmAnimation = () => {
  const options = {
    animationData: palm,
    loop: true,
  };

  const { View } = useLottie(options);

  return (
    <div className="absolute top-28 sm:translate-x-0 sm:top-0 left-[42%] -translate-x-1/2 sm:left-0 z-10">
      {' '}
      {View}
    </div>
  );
};

export default PalmAnimation;
