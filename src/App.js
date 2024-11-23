import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import MapRendering from './react-map/MapRendering';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MapRendering />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
