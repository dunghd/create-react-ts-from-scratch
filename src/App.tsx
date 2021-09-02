import React from 'react';
import { useDarkMode } from './useDarkMode';

const App = () => {
  const [mode, setMode] = useDarkMode();

  return (
    <>
      <button onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}>
        {mode}
      </button>
      <h3>Hello from ReactJS</h3>
    </>
  )
}

export default App;