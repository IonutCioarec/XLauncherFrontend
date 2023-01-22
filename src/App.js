import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons';
import React from "react";
import Layout from 'layout/layout';

library.add(fab, faCheckSquare, faCoffee)

function App() {
  return (
    <div className="App">
        <Layout/>
    </div>
  );
}

export default App;
