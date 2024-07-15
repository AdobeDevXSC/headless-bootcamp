import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './screens/home/home';

const App = () => {
  const context = {
    endpoint: '/graphql/execute.json',
    url: 'https://author-p46835-e1104134.adobeaemcloud.com/',
    project: 'pure-headless',
  };

  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route exact={true} path={'/'} element={<Home context={context} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
