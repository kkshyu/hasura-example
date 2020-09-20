import React from "react";
import { ApiProvider } from "./ApiContext";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <ApiProvider>
      <HomePage></HomePage>
    </ApiProvider>
  );
}

export default App;
