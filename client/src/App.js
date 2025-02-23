import { BrowserRouter, Routes, Route } from "react-router-dom";
import Visits from "./pages/Visits";
import Home from './pages/Home';
import Add from './pages/Add';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/calendar" element={<Add/>}/>
          <Route path="/visits" element={<Visits/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;