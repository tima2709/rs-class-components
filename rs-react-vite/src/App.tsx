import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import ReactHook from './pages/react-hook';
import UncontrolledForm from './pages/uncontrolledForm';

function App() {
  return (
    <div>
      <Routes>
        <Route path={'/'} element={<Home />} />
        <Route path={'/controlled'} element={<ReactHook />} />
        <Route path={'/uncontrolled'} element={<UncontrolledForm />} />
      </Routes>
    </div>
  );
}

export default App;
