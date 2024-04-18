import { useLottie } from 'lottie-react';
import map from '../assets/lotties/map.json';

const MapAnimation = () => {
  const options = {
    animationData: map,
    loop: true,
  };

  const { View } = useLottie(options);

  return <div> {View}</div>;
};

export default MapAnimation;
