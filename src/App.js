import PropertiesPage from "pages/PropertiesPage/PropertiesPage";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import "./App.css";
import heartFill from './assets/heart-fill.svg';
import heartStroke from './assets/heart-stroke.svg';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<PropertiesPage/>} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
