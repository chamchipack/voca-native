import * as React from 'react';
import MainNavigator from './src/navigation/MainNavigator';

import SplashScreen from 'react-native-splash-screen';
import {useEffect} from 'react';

function App() {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1500); //스플래시 활성화 시간
  }, []);

  return <MainNavigator />;
}

export default App;
