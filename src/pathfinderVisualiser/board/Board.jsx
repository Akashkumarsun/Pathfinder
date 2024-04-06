import React from "react";
import Node from "./Node/Node.jsx";

function Board(props) {
  return (
    <div className="grid items-center p-4">
      <table className="border-collapse">
        <tbody>
          {props.grid?.map((row, rowIdx) => (
            <tr key={rowIdx}>
              {row.map((column, columnIdx) => (
                <Node
                  key={columnIdx}
                  nodeData={column}
                  onMouseDown={(row, col) => {
                    console.log(row, col);
                    props.handleMouseDown(row, col);
                  }}
                  onMouseEnter={(row, col) => {
                    props.handleMouseEnter(row, col);
                  }}
                  onMouseUp={(row, col) => {
                    props.handleMouseUp(row, col);
                  }}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Board;
