import React from "react";
import "../Card.css";

// props location found at businesses.location.display_address[1]
class Favorites extends React.Component {
  state = {};

  handleOnClick = () => {
    this.props.onClickDelete(
      this.props.category,
      this.props.name,
      this.props.location
    );
  };

  render() {
    return (
      <a
        className="collection-item"
        href={this.props.urlplaceholder}
        target="_blank"
      >
        {this.props.name} | Location: {this.props.location}{" "}
        <i
          className="favdelete-icon material-icons"
          onClick={this.handleOnClick}
        >
          delete_forever
        </i>
      </a>
    );
  }
}

export default Favorites;
