import React from "react";
import "./Node.css";

function Node(props) {
  const extraClassName = props.nodeData.isFinish
    ? "node-finish"
    : props.nodeData.isStart
    ? "node-start"
    : props.nodeData.isWall
    ? "node-wall"
    : "";

  return (
    <td
      id={`node-${props.nodeData.row}-${props.nodeData.col}`}
      className={`node ${extraClassName}`}
      onMouseDown={() => {
        props.onMouseDown(props.nodeData.row, props.nodeData.col);
      }}
      onMouseUp={() => {
        props.onMouseUp(props.nodeData.row, props.nodeData.col);
      }}
      onMouseEnter={() => {
        props.onMouseEnter(props.nodeData.row, props.nodeData.col);
      }}
    ></td>
  );
}

export default Node;
