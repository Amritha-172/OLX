import React, { useContext } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import "./Header.css";
import OlxLogo from "../../assets/OlxLogo";
import Search from "../../assets/Search";
import Arrow from "../../assets/Arrow";
import SellButton from "../../assets/SellButton";
import SellButtonPlus from "../../assets/SellButtonPlus";
import { AuthContext } from "../../store/Context";
import { getAuth, signOut } from "firebase/auth";

function Header() {
  const { user } = useContext(AuthContext);
  const Navigate = useNavigate();

  const handleSignout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        Navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <NavLink to='/'>
          <div className="brandName">
            <OlxLogo></OlxLogo>
          </div>
        </NavLink >
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage ">
          <span className="text-black ">
            {user ? (
              user.displayName
            ) : (
              <NavLink className="text-black" to="/login">
                Login
              </NavLink>
            )}
          </span>
          <hr />
        </div>
        {user && (
          <span onClick={handleSignout} className="logoutPage">
            Logout
          </span>
        )}
        {user ? (
          <div className="sellMenu">
            <NavLink to="/create">
              <SellButton></SellButton>
              <div className="sellMenuContent">
                <SellButtonPlus></SellButtonPlus>
                <span>SELL</span>
              </div>
            </NavLink>
          </div>
        ) : (
          <div className="sellMenu">
            <NavLink to="/login">
              <SellButton></SellButton>
              <div className="sellMenuContent">
                <SellButtonPlus></SellButtonPlus>
                <span>SELL</span>
              </div>
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
