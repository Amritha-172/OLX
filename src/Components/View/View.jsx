import React, { useEffect, useState, useContext } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";

import "./View.css";
import { PostContext } from "../../store/PostContext";
import { FirebaseContext } from "../../store/Context";
function View() {
  const [userDetails, setUserDetails] = useState();
  const { postDetails } = useContext(PostContext);
  const { firebase } = useContext(FirebaseContext);
  useEffect(() => {
    async function fetchUserDetails() {
      if (postDetails && postDetails.userId) {
        const { userId } = postDetails;
        const db = getFirestore(firebase);
        const userDocRef = doc(db, "users", userId);

        try {
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists) {
            setUserDetails(userDocSnap.data());
          }
        } catch (error) {
          console.log(error.message);
        }
      }
    }
    fetchUserDetails();
  }, [postDetails]);
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <div className="image">
          {console.log(postDetails)}
          <img src={postDetails.url} alt="" />
        </div>
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price} </p>
          <span>{postDetails.name}</span>
          <p>{postDetails.category}</p>
          <span>{postDetails.createdAt}</span>
        </div>
        {userDetails && (
          <div className="contactDetails">
            <p>Seller details</p>
            <p>{userDetails.username}</p>
            <p>{userDetails.phone}</p>
          </div>
        )}
      </div>
    </div>
  );
}
export default View;
