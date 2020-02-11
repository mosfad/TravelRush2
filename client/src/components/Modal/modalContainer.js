import React, { Component } from "react";
import Modal from "../Modal/modal";

//Class button is a nav bar item that opens the log in modal.
class ModalContainer extends React.Component {
  render() {
    return (
      <div>
        <Modal openModal={this.props.openModal} />
      </div>
    );
  }
}
export default ModalContainer;
