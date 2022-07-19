
import React from 'react';
import Heading from './components/Heading';
import InputReset from './components/InputReset';
import TextScreen from './components/TextScreen';
import Timer from './components/Timer';
import GameLayout from './Layouts/GameLayout';


const App = () => {
  return (
    <GameLayout>

      <Heading></Heading>
      <TextScreen></TextScreen>
      <Timer></Timer>
      <InputReset></InputReset>

    </GameLayout>
  );
}

export default App;
