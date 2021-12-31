import React from "react";
import { CounterProvider } from "./context/counter";
import Counter from "./screens/counter";

function App() {
  return (
    <CounterProvider>
      <Counter />
    </CounterProvider>
  );
}

export default App;
