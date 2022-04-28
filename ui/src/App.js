import React, { useEffect, useState } from 'react';
import config from './config';
import { Header, Body } from './components';

const ApiUrl = config[process.env.REACT_APP_NODE_ENV || 'development'].apiUrl;

function App() {
  let [names, setNames] = useState([]);

  useEffect(() => {
    fetch(ApiUrl + '/authors')
      .then((response) => response.json())
      .then((data) => setNames(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <Header />
      <Body />
      App is running - good work:
      {names.map((author) => author.first_name + ' ')}
    </div>
  );
}

export default App;
