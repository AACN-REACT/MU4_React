import React from "react";
import logo from "../../images/1x/logo.png";
import { ProgressPlugin } from "webpack";
export function Title({ name, profilePic }) {
  return (
    <div className="centered-container">
      <img src={logo} />
      <div className="profile-container">
        <div className="profile-name">Welcome, {name}</div>
        {profilePic ? <img className="profile-pic" src={profilePic} /> : null}
      </div>
    </div>
  );
}
