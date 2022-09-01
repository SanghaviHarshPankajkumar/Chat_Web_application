import React,{useState, useEffect} from "react";
import Img from "./image.png";
import {doc, onSnapshot} from "firebase/firestore";
import {db} from "../firebase"
const User = ({ user, selectUser, user1 ,chat }) => {
const user2 =user.uid;
const [data,setData] = useState("");

useEffect(()=>{
  const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
  let unsub = onSnapshot(doc(db,'lastMsg',id),doc=>{
    setData(doc.data());
  });
  return ()=> unsub();
});

  return (
    <>
    <div
      className={`userWrapper ${chat.name===user.name && "selected_user"}`}
      onClick={() => {
        selectUser(user);
      }}
    >
      <div className="userInfo">
        <div className="userDetail">
          <img src={user.profile || Img} alt="profile" className="profile" />
          <h4> {user.name}</h4>
          {data?.from !==user1 && data?.unread && <small className="unread"> New </small>}
        </div>
        <div className={user.isOnline ? "online" : "ofline"}></div>
      </div>
      {data && (
        <p className="truncate"> 
        <strong> {data.from===user1 ?"Me": null}</strong>
        {data.text}</p>
      )}
    </div>
    <div 
    className={`sm_container ${chat.name===user.name && "selected_user"}`}
    onClick={() => {
        selectUser(user);
      }}>
 <img src={user.profile || Img} alt="profile" className="profile sm_screen"  />
    </div>
    </>
  );
};

export default User;
