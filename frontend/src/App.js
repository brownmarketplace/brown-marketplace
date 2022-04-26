import Home from './pages/Home';
import BoilerplatePage from './pages/BoilerplatePage'
import ProfilePage  from './pages/ProfilePage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BoilerplatePage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<ProfilePage />}>
          <Route path=":username" element={<ProfilePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
