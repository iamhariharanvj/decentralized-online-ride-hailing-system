import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import store from './redux/store';
import NotFound from './pages/NotFound';
import Rider from './pages/Rider'
import Driver from './pages/Driver';
function App() {

  //Verify MetaMask Extension Installation
  const [isMetaEnabled, setIsMetaEnabled] = useState(0);
  useEffect(() => {
    if(!window.ethereum){
      alert('Please install metamask to use the application');
      setIsMetaEnabled(isMetaEnabled+1);
    }
  },[isMetaEnabled])

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/driver' element={<Driver />} />
          <Route path = '/rider/' element={<Rider />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;