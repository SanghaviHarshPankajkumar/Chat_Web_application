import React from "react";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { setDoc, doc, Timestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    error: null,
    loading: false
  });
  const history = useNavigate();
  const { name, email, password, error, loading } = data;
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setData({ ...data, error: null, loading: true });
    if (!name || !email || !password) {
      setData({ ...data, error: "All feild are requird!" });
    }
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(result.user);
      await setDoc(doc(db, "users", result.user.uid), {
        uid: result.user.uid,
        name,
        email,
        createdAt: Timestamp.fromDate(new Date()),
        isOnline: true
      });
      setData({
        name: "",
        email: "",
        password: "",
        error: null,
        loading: false
      });
      history("/", { replace: true });
    } catch (err) {
      setData({ ...data, error: err.message, loading: false });
    }
  };
  return (
    <section>
      <h3>Create Your Account</h3>
      <form className="form" onSubmit={handleSubmit}>
        <div className="inputcontainer">
          <lable htmlFor="name"> Name </lable>
          <input type="text" name="name" value={name} onChange={handleChange} />
        </div>
        <div className="inputcontainer">
          <lable htmlFor="email"> EmailID </lable>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
          />
        </div>
        <div className="inputcontainer">
          <lable htmlFor="password"> Password </lable>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </div>
        {error ? <p className="error">{error}</p> : null}
        <div className="btnContain">
          <button className="btn" disabled={loading}>
            {" "}
            {loading ? "Register" : "Loading"}{" "}
          </button>
        </div>
      </form>
    </section>
  );
};
export default Register;
