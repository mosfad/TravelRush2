import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import history from "../../utils/history";

function Logout(props) {
  const handleClick = () => {
    //setTimeout(window.location.reload(), 1000);
    localStorage.removeItem("tokenKey");
    if (props.location.pathname === "/") {
      window.location.reload();
    }
  };

  return (
    <div>
      <button
        className="waves effect waves-teal btn-flat"
        onClick={handleClick}
      >
        LOGOUT
      </button>
    </div>
  );
}

export default withRouter(Logout);
