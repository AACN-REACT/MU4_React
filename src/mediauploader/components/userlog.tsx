import React from "react";

export function UserLog({ profile, isAuthenticated, logout }) {
  const [buttonDisabled, disableButton] = React.useState(false);

  return (
    <div className="userlog-container">
      <div>
        welcome, <span>{isAuthenticated ? profile.given_name : "guest"}</span>
      </div>
      {isAuthenticated ? (
        <button
          onClick={(e) => {
            alert("logging out");
            logout();
          }}
        >
          Logout
        </button>
      ) : (
        <button
          disabled={buttonDisabled}
          onClick={(e) => {
            disableButton(true);
            window.location.href = window.location.origin;
          }}
        >
          Login
        </button>
      )}
    </div>
  );
}
