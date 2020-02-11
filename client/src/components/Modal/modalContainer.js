import React, { Component } from "react";
import Modal from "../Modal/modal";

//Class button is a nav bar item that opens the log in modal.
class ModalContainer extends React.Component {
  render() {
    return (
      <div>
        <button className="waves effect waves-teal btn-flat">
          <Modal openModal={this.props.openModal} />
        </button>
      </div>
    );
  }
}
export default ModalContainer;
