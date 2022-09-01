import React, { useRef, useEffect } from "react";
import Moment from "react-moment";
import "../styles.css";

const Message = ({ me, user1 }) => {
  const scrollRef = useRef();
  useEffect(() => {
    scrollRef.current.scrollIntoView();
  }, [me]);
  return (
    <div
      className={`messageW ${me.from === user1 ? "own" : "other"}`}
      ref={scrollRef}
    >
      <p className={me.from === user1 ? "me" : "friend"}>
        {me.media ? <img src={me.media} alt={me.text} /> : null}
        {me.text}
        <br />
        <small>
          <Moment toNow={me.createdAt.toDate()}></Moment>
        </small>
      </p>
    </div>
  );
};
export default Message;
