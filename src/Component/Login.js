import React from "react";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    error: null,
    loading: false
  });
  const history = useNavigate();
  const { email, password, error, loading } = data;
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setData({ ...data, error: null, loading: true });
    if (!email || !password) {
      setData({ ...data, error: "All feild are requird!" });
    }
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log(result.user);
      await updateDoc(doc(db, "users", result.user.uid), {
        isOnline: true
      });
      setData({ email: "", password: "", error: null, loading: false });
      history("/", { replace: true });
    } catch (err) {
      setData({ ...data, error: err.message, loading: false });
    }
  };
  return (
    <section>
      <h3>Login to Your Account</h3>
      <form className="form" onSubmit={handleSubmit}>
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
            {loading ? "Logging..." : "Login"}{" "}
          </button>
        </div>
      </form>
    </section>
  );
};
export default Login;
