import React, { useState, useContext } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import Logo from "../../olx-logo.png";
import { FirebaseContext } from "../../store/Context";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc, getFirestore } from "firebase/firestore";
import { auth } from "../../firebase/config";

import "./Signup.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Signup() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const { firebase } = useContext(FirebaseContext);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSumbit = async (e) => {
    e.preventDefault();

    if (userName.trim() == "") {
      setError("Plese Type valid Name");
      return;
    }
    if (phone.length !== 10) {
      setError("Please enter valid number");
      return;
    }
    if (password.trim() == "") {
      setError("Please enter valid Password");
      return;
    }
    setLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(auth.currentUser, {
        displayName: userName,
      });
      const db = getFirestore(firebase);
      await setDoc(doc(db, "users", result.user.uid), {
        id: result.user.uid,
        username: userName,
        phone: phone,
      });
      navigate("/login");
    } catch (error) {
      setLoading(false);
      setError("invalid Email or Password");
    }
  };

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <h5 style={{ color: "red" }}>{error}</h5>
        <form onSubmit={handleSumbit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            onBlur={(e) =>
              e.target.value.trim() == ""
                ? setError("Plese Enter valid Name")
                : setError("")
            }
            name="name"
            defaultValue="John"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={(e) =>
              e.target.value.trim() == ""
                ? setError("Plese Enter valid  email")
                : setError("")
            }
            id="fname"
            name="email"
            defaultValue="John"
          />
          <br />
          <div style={{ marginLeft: "100px" }}>
            {loading ? (
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              ""
            )}
          </div>
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            onBlur={(e) =>
              e.target.value.length !== 10
                ? setError("Plese Enter valid  Number")
                : setError("")
            }
            id="lname"
            name="phone"
            defaultValue="Doe"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={(e) =>
              e.target.value.trim() == ""
                ? setError("Plese Enter valid Password")
                : setError("")
            }
            id="lname"
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <NavLink to="/login">Login</NavLink>
      </div>
    </div>
  );
}
