import React, { Fragment, useContext, useState } from "react";
import "./Create.css";
import Header from "../Header/Header";
import { FirebaseContext, AuthContext } from "../../store/Context";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Create = () => {
  const Navigate = useNavigate();
  const { firbase } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const date = new Date();
  const handleSubmit = () => {
    if (name.trim() == "") {
      setError("Please Enter valid Name");
      return;
    }
    if (category.trim() == "") {
      setError("Please Enter valid Category");
      return;
    }
    if (price <= 0 || price.length == 0) {
      setError("Please Enter valid Price");
      return;
    }
    if (!image) {
      setError("Please Select a image");
      return;
    }
    setLoading(true)

    const storage = getStorage();
    const storageref = ref(storage, `image/${image.name}`);
    uploadBytes(storageref, image).then(async (snapshot) => {
      console.log("Uploaded a blob or file!");
      console.log("snapshot : ", snapshot.ref);
      const downloadUrl = await getDownloadURL(snapshot.ref);
      const db = getFirestore(firbase);
      const docRef = await addDoc(collection(db, "products"), {
        name,
        category,
        price,
        url: downloadUrl,
        userId: user.uid,
        createdAt: date.toDateString(),
      });
      console.log("docref", docRef.id);
      Navigate("/");
    });
  };
  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <span style={{ color: "red" }}>{error}</span>
          <form>
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={(e) =>
                e.target.value.trim() === ""
                  ? setError("Please Enter name")
                  : setError("")
              }
              id="fname"
              name="Name"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              onBlur={(e) =>
                e.target.value.trim() === ""
                  ? setError("Please Enter Category")
                  : setError("")
              }
              id="fname"
              name="category"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input
              className="input"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              onBlur={(e) =>
                e.target.value <= 0
                  ? setError("Please Enter Valid Price")
                  : setError("")
              }
              id="fname"
              name="Price"
            />
            <br />
          </form>
          <div style={{ marginLeft: "100px" }}>
            {loading ? (
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              ""
            )}
          </div>
          <br />
          <img
            alt="Posts"
            width="200px"
            height="200px"
            src={
              image
                ? URL.createObjectURL(image)
                : "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg"
            }
          ></img>

          <br />
          <input
            className="mt-3"
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
            type="file"
          />
          <br />
          <button onClick={handleSubmit} className="uploadBtn">
            upload and Submit
          </button>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
