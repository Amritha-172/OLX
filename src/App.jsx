import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useContext } from "react";
import { AuthContext, FirebaseContext } from "./store/Context";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Home from "./Pages/Home";
import Signup from "./Pages/Signup";
import LoginPage from "./Pages/Login";
import Create from "./Pages/Create";
import View from "./Pages/ViewPost";
import Post from './store/PostContext'
import './App.css'

function App() {
  const { setUser } = useContext(AuthContext);
  const { firebase } = useContext(FirebaseContext);
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);
  return (
    <div className="App">
      <Post>
      <Router>
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/signup" Component={Signup} />
          <Route path="/login" Component={LoginPage} />
          <Route path="/create" Component={Create} />
          <Route path="/view" Component={View} />
        </Routes>
      </Router>
    </Post>
    </div>
  );
}

export default App;
