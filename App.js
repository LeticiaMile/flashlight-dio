import React, {useState, useEffect, useCallback} from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import imageLightOff from './assets/icons/eco-light-off.png'
import imageLightOn from './assets/icons/eco-light.png'
import Torch from 'react-native-torch';
import RNShake from 'react-native-shake';

const App = () => {
  const [toggle, setToggle] = useState(false);
  const handleToggle = useCallback(() => setToggle(_ => !toggle));

  useEffect(() => {
    Torch.switchState(toggle);
  }, [toggle]);

  useEffect(() => {
    const subscription = RNShake.addListener(() => handleToggle());
    return () => subscription.remove();
  }, [handleToggle]);

  return (
    <View style={toggle ? style.lightContainer : style.darkContainer}>
      <TouchableOpacity onPress={handleToggle}>
        <Image style={toggle ? style.lightingOn : style.lightingOff} 
        source={toggle ? imageLightOn : imageLightOff} 
        />
        <Image
      style={style.dioLogo}
      source={
        toggle
        ? require('./assets/icons/logo-dio.png')
        : require('./assets/icons/logo-dio-white.png')
      }
      />
      </TouchableOpacity>
    </View>
  )
};

export default App;

const style = StyleSheet.create({
  darkContainer: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center'
  },
  lightContainer: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center'
  },
  lightingOn: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 150,
    height: 150
  },
  lightingOff: {
    resizeMode: 'contain',
    alignSelf: 'center',
    tintColor: 'white',
    width: 150,
    height: 150
  },
  dioLogo: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 250,
    height: 250,
  },
});