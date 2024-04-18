import { useLottie } from 'lottie-react';
import scroll from '../assets/lotties/scroll.json';

const ScrollAnimation = () => {
  const options = {
    animationData: scroll,
    loop: true,
  };

  const { View } = useLottie(options);

  return <div> {View}</div>;
};

export default ScrollAnimation;
