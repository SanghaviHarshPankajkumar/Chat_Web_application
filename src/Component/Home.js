import React, { useEffect, useState } from "react";
import { db, auth, storage } from "../firebase";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import {
  query,
  where,
  collection,
  onSnapshot,
  addDoc,
  doc,
  setDoc,
  Timestamp,
  orderBy,
  getDoc,
  updateDoc
} from "firebase/firestore";
import Chat from "./Chat";
import User from "./User";
import Message from "./Message";
const Home = () => {
  const [users, setUsers] = useState([]);
  const [chat, setChat] = useState("");
  const [text, setText] = useState("");
  const [img, setImg] = useState("");
  const [mes, setMes] = useState([]);
  const user1 = auth.currentUser.uid;
  const i = [];
  const j = [];
  useEffect(() => {
    const q = query(collection(db, "users"), where("uid", "not-in", [user1]));
    const unSub = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        i.push(doc.data());
      });
      setUsers(i);
    });
    return () => {
      unSub();
    };
  });

  const selectUser = async (user) => {
    setChat(user);
    const user2 = user.uid;
    console.log(user2);
    const id1 = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
    console.log(id1);

    const q = query(
      collection(db, "messages", id1, "chat"),
      orderBy("createdAt", "asc")
    );

    onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        j.push(doc.data());
      });
      setMes(j);
      console.log(j);
    });
    const docSnap = await getDoc(doc(db, "lastMsg", id1));
    if (docSnap.data() && docSnap.data().from !== user1) {
      await updateDoc(doc(db, "lastMsg", id1), {
        unread: false
      });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user2 = chat.uid;
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
    let url;
    if (img) {
      const imgRef = ref(
        storage,
        `documents/${new Date().getTime()}-${img.name}`
      );
      const snap = await uploadBytes(imgRef, img);
      const dlurl = await getDownloadURL(ref(storage, snap.ref.fullPath));
      url = dlurl;
    }

    await addDoc(collection(db, "messages", id, "chat"), {
      text,
      from: user1,
      to: user2,
      media: url || "",
      createdAt: Timestamp.fromDate(new Date())
    });

    await setDoc(doc(db, "lastMsg", id), {
      text,
      from: user1,
      to: user2,
      media: url || "",
      createdAt: Timestamp.fromDate(new Date()),
      unread: true
    });
    setText("");
  };

  return (
    <div className="homeContain">
      <div className="usersContain">
        {users.map((user) => (
          <User
            key={user.uid}
            user={user}
            chat={chat}
            user1={user1}
            selectUser={selectUser}
          />
        ))}
      </div>
      <div className="messages">
        {chat ? (
          <>
            <div className="messagesUser">{chat.name}</div>
            <div className="message">
              {mes.length
                ? mes.map((me, i) => <Message key={i} me={me} user1={user1} />)
                : null}
            </div>
            <Chat
              handleSubmit={handleSubmit}
              text={text}
              setText={setText}
              setImg={setImg}
            />
          </>
        ) : (
          <h3 className="noSelection">Select a User</h3>
        )}
      </div>
    </div>
  );
};
export default Home;
