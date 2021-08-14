import React from "react";
import "./Square.css";

class Square extends React.Component {
  render() {
    return (
      <button className="square" onClick={() => this.props.onClick()}>
        <b>{this.props.value}</b>
      </button>
    );
  }
}
export default Square;
