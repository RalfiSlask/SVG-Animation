import { useLottie } from 'lottie-react';
import bird from '../assets/lotties/bird.json';

const BirdAnimation = () => {
  const options = {
    animationData: bird,
    loop: true,
  };

  const { View } = useLottie(options);

  return <div className="cursor-pointer">{View}</div>;
};

export default BirdAnimation;
