import logo from './logo.svg';
import './App.css';


import {
  BrowserRouter as BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Feed from "./Pages/Feed";



function App() {
  return (


    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Feed" element={<Feed />} />

          <Route
            path="/"
            element={
              <div>
                Hello, welcome{" "}
                <div>
                <Navigate to='/login' />
                </div>
              </div>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>

  );
}

export default App;
