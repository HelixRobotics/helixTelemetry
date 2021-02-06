import './App.css';

import React from 'react';
import { Button, Input } from 'semantic-ui-react';

import { handler } from './commsCore.js';
window.handler = handler;

function App() {
  const clickHandler = () => {
    console.log("clack");
    handler.connect("localhost");
    debugger;
  };

  return (
    <div>
      hello mf
      <div>
        <Input ></Input>
        <Button primary onClick={clickHandler} > Connect </Button>
        <Button secondary>Secondary</Button>
      </div>
    </div>
    
  );
}

export default App;
