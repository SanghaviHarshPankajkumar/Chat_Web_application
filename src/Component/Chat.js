import React from "react";
import Upload from "./svg/Upload";

const Chat = ({handleSubmit,text,setText,setImg}) => {
  return (
    <form className="message_form" onSubmit={handleSubmit}>
      <label htmlFor="img">
        <Upload/>
      </label>
      <input
        type="file"
        onChange={(e)=>{setImg(e.target.files[0])}}
        id="img"
        accept="documents/*"
        style={{ display: "none" }}
      />
      <div>
        <input type="text" placeholder="Type Message..." value={text} onChange={e=>{
          setText(e.target.value)}} />
      </div>
      <div>
        <button className="btn"> Send</button>
      </div>
    </form>
  );
};
export default Chat;
