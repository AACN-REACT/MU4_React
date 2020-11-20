import React from "react";
import { SetToolTip } from "./globalstateContext";
import { UserLog } from "./userlog";
import { toolTipSetter } from "../utils/helperfunctions";

export function Title({ profile, isAuthenticated, logout }) {
  const setToolTip = React.useContext(SetToolTip);

  return (
    <div className="title-container">
      <div
        onMouseEnter={(e) => {
          toolTipSetter(e, setToolTip, "A tool for uploading media", true);
        }}
        onMouseLeave={(e) => {
          toolTipSetter(e, setToolTip, "A tool for uploading media", false);
        }}
        className="logo-container"
      >
        AACN media uploader
      </div>
      <UserLog
        profile={profile}
        isAuthenticated={isAuthenticated}
        logout={logout}
      />
    </div>
  );
}
