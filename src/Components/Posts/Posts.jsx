import React, { useEffect, useContext, useState } from "react";

import Heart from "../../assets/Heart";
import "./Post.css";
import { FirebaseContext } from "../../store/Context";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { useNavigate, NavLink } from "react-router-dom";
import { PostContext } from "../../store/PostContext";
import "bootstrap/dist/css/bootstrap.min.css";

function Posts() {
  const Naviagate = useNavigate();
  const { firebase } = useContext(FirebaseContext);
  const [products, setProducts] = useState([]);
  const { setPostDetails } = useContext(PostContext);
  useEffect(() => {
    async function callme() {
      const db = getFirestore(firebase);
      const querySnapShot = await getDocs(collection(db, "products"));
      const allPost = querySnapShot.docs.map((product) => {
        return { ...product.data(), id: product.id };
      });
      console.log(allPost);
      setProducts(allPost);
    }
    callme();
  }, []);

  return (
    <div className="postParentDiv container-fluid">
      <div className="moreView">
        <div className="row">
          <div className="col-12">
            <div className="heading">
              <span>Quick Menu</span>
              <span>View more</span>
            </div>
          </div>
        </div>

        <div className="row  row-cols-lg-6 ">
          {products.map((product) => (
            <div className="col mb-5 " key={product.id}>
              <NavLink to="/view" className="text-decoration-none">
                <div
                  className="card d-flex flex-column h-100"
                  onClick={() => {
                    setPostDetails(product);
                    Naviagate("/view");
                  }}
                >
                  <div className="favorite">
                    <Heart />
                  </div>
                  <div className="image">
                    <img src={product.url} alt="" className="img-fluid" />
                  </div>
                  <div className="content flex-grow-1">
                    <p className="rate">&#x20B9;{product.price}</p>
                    <span className="kilometer">{product.category}</span>
                    <p className="name">{product.name}</p>
                  </div>
                  <div className="date">
                    <span>{product.createdAt}</span>
                  </div>
                </div>
              </NavLink>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Posts;
