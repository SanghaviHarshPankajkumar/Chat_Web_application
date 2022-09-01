import "./styles.css";
import React, { Fragment } from "react";
import { Route, Routes } from "react-router";

import Home from "./Component/Home";
import Login from "./Component/Login";
import Navbar from "./Component/Navbar";
import Register from "./Component/Register";
import Profile from "./Component/Profile";
import PrivateRoute from "./Component/PrivateRoute";
import AuthProvider from "./Component/AuthProvider";
import { BrowserRouter } from "react-router-dom";
export default function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Fragment>
            <Navbar />
            <Routes>
              <Route exact path="/" element={<PrivateRoute />}>
                <Route exact path="/" element={<Home />} />
              </Route>
              <Route exact path="/Register" element={<Register />} />
              <Route exact path="/Login" element={<Login />} />
              <Route exact path="/Profile" element={<Profile />} />
            </Routes>
          </Fragment>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}
