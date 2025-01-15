import * as React from 'react';
import MainNavigator from './src/navigation/MainNavigator';

import Provider from './provider/Provider';
import Splash from './provider/Splash';

function App() {
  return (
    <Provider>
      <Splash>
        <MainNavigator />
      </Splash>
    </Provider>
  );
}

export default App;
