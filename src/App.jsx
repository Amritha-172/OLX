import Home from "./Pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Signup from "./Pages/Signup";
import LoginPage from "./Pages/Login";
import { useEffect, useContext } from "react";
import { AuthContext, FirebaseContext } from "./store/Context";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function App() {
  const { setUser } = useContext(AuthContext);
  const { firebase } = useContext(FirebaseContext);
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      setUser(user)
    });
  }, []);
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/signup" Component={Signup} />
          <Route path="/login" Component={LoginPage} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
