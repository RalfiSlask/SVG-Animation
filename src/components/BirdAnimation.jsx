import { useLottie } from 'lottie-react';
import bird from '../assets/lotties/bird.json';

const BirdAnimation = () => {
  const options = {
    animationData: bird,
    loop: true,
  };

  const { View } = useLottie(options);

  return (
    <div className="cursor-pointer hover:scale-125 transition-all duration-300 ease-in-out">
      {View}
    </div>
  );
};

export default BirdAnimation;
