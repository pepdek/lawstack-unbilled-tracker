import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Connect from './pages/Connect';
import Subscribe from './pages/Subscribe';
import Confirmed from './pages/Confirmed';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/connect" element={<Connect />} />
        <Route path="/subscribe" element={<Subscribe />} />
        <Route path="/confirmed" element={<Confirmed />} />
      </Routes>
    </BrowserRouter>
  );
}
