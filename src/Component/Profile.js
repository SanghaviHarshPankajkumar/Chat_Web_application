import React, { useEffect, useState } from "react";
import Img from "./image.png";
import {useNavigate} from "react-router-dom";
import Camera from "./svg/Camera";
import { storage, db, auth } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes,deleteObject } from "firebase/storage";
import Trash from "./svg/Trash";

const Profile = () => {
  const [img, setImg] = useState("");
  const [user, setUser] = useState();
  useEffect(() => {
    getDoc(doc(db, "users", auth.currentUser.uid)).then((docSnap) => {
      if (docSnap.exists) {
        setUser(docSnap.data());
      }
    });
    if (img) {
      const uploadImg = async () => {
        const imgRef = ref(
          storage,
          `profile/${new Date().getTime()}-${img.name}`
        );
        try {
          if(user.profile_path){
            await deleteObject(ref(storage,user.profile_path));
          }
          const snap = await uploadBytes(imgRef, img);
          const url = await getDownloadURL(ref(storage, snap.ref.fullPath));
          await updateDoc(doc(db, "users", auth.currentUser.uid), {
            profile: url,
            profile_path: snap.ref.fullPath
          });
          setImg();
        } catch (error) {
          console.log(error.message);
        }
      };
      uploadImg();
    }
  }, [img]);
  const history = useNavigate();
  const deleteImg= async()=>{
    try {
      const confirm = window.confirm("Delete Profile")
      if(confirm){
        await deleteObject(ref(storage,user.profile_path));
        await updateDoc(doc(db, "users", auth.currentUser.uid), {
          profile: "",
          profile_path: ""
        });
        history("/", { replace: true });
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  return user ?(
    <section>
      <div className="profileContain">
        <div className="imgContain">
          <img src={user.profile || Img} alt="prfile-pic" />
          <div className="overlay">
            <div>
              <label htmlFor="photo">
                <Camera />
              </label>
            {user.profile ?  <Trash deleteImg={deleteImg}/>:null} 
              <input
                id="photo"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={(e) => setImg(e.target.files[0])}
              />
            </div>
          </div>
        </div>
        <div className="textContian">
          <h3> {user.name} </h3>
          <p> {user.email} </p>
          <hr />
          <small> Register on: {user.createdAt.toDate().toDateString()}</small>
        </div>
      </div>
    </section>
  ):null;
};
export default Profile;
