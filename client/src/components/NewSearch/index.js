import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import history from "../../utils/history";

function SearchLink(props) {
  const handleClick = () => {
    if (props.location.pathname === "/") {
      window.location.reload();
    }
    //console.log(props.location.pathname);
  };

  return (
    <div>
      <button
        className="waves effect waves-teal btn-flat"
        onClick={handleClick}
      >
        New Search
      </button>
    </div>
  );
}

export default withRouter(SearchLink);
