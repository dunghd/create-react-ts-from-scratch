import React from 'react';
import { useUndo } from './useUndo';

const App: React.FC = () => {
  const counter = 1;

  const [state, { set, undo, canUndo, redo, canRedo, reset }] = useUndo(counter)

  // React.useEffect(() => {
  //   set('second')
  // }, [])

  // React.useEffect(() => {
  //   set('third')
  // }, [])

  return (
    <>
      <button onClick={() => set(state.present + 1)}>Add</button>
      <button disabled={!canUndo} onClick={undo}>Undo</button>
      <button disabled={!canRedo} onClick={redo}>Redo</button>
      <button onClick={reset}>Reset</button>
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </>
  )
}

export default App;