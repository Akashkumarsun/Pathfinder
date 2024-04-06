import React, { useState } from "react";
import Dropdown from "../components/Dropdown";

function Header(props) {
  const [selectedAlgorithm, setAlgorithm] = useState("A* Search");
  const [headingText, setHeadingText] = useState(
    "A* Search is weighted and guarantees the shortest path!"
  );

  // items
  const algorithms = [
    "Dijkstra's Algorithm",
    "A* Search",
    // "Greedy Best-first Search",
    // "Swarm Algorithm",
    // "Convergent Swarm Algorithm",
    // "Bidirectional Swarm Algorithm",
    "Breadth-first Search",
    "Depth-first Search",
  ];

  // on algo select
  function onAlgoSelect(algo) {
    switch (algo) {
      case "Dijkstra's Algorithm":
        setHeadingText(
          "Dijkstra's Algorithm is weighted and guarantees the shortest path!"
        );
        break;
      case "A* Search":
        setHeadingText(
          "A* Search is weighted and guarantees the shortest path!"
        );
        break;
      case "Breadth-first Search":
        setHeadingText(
          "Breath-first Search is unweighted and guarantees the shortest path!"
        );
        break;
      case "Depth-first Search":
        setHeadingText(
          "Depth-first Search is unweighted and does not guarantee the shortest path!"
        );
        break;
      default:
        break;
    }
    setAlgorithm(algo);
  }

  return (
    <>
      <div className="p-4 bg-slate-600 flex items-center w-full flex-wrap">
        <p className="text-2xl text-white font-semibold mr-10">
          Pathfinder Visualizer
        </p>
        <Dropdown items={algorithms} onAlgoSelect={onAlgoSelect} />
        <button
          onClick={() => {
            props.visualise(selectedAlgorithm);
          }}
          className="rounded bg-teal-400 py-2 px-3 text-sm font-semibold text-white mx-4"
        >
          Visualise {selectedAlgorithm}
        </button>

        <button
          onClick={() => {
            props.clearGrid();
          }}
          className="rounded bg-red-400 py-2 px-3 text-sm font-semibold text-white mx-2"
        >
          Clear Board
        </button>
        <button
          onClick={() => {
            props.clearWalls();
          }}
          className="rounded bg-red-400 py-2 px-3 text-sm font-semibold text-white mx-2"
        >
          Clear Walls
        </button>
      </div>
      <div className="pt-8 pb-4 px-4 flex items-center">
        <div className="size-[25px] bg-green-600 border border-sky-400"></div>
        <span className="mx-4  text-lg">Start</span>
        <div className="size-[25px] bg-red-500 border border-sky-400 ml-4"></div>
        <span className="mx-4  text-lg">Finish</span>
        <div className="size-[25px] border border-sky-400  ml-4"></div>
        <span className="mx-4  text-lg">Unvisited</span>
        <div className="size-[25px] bg-blue-950  ml-4"></div>
        <span className="mx-4  text-lg">Wall</span>
        <div className="size-[25px] bg-sky-400 border border-sky-400  ml-4"></div>
        <span className="mx-4  text-lg">Visited</span>
        <div className="size-[25px] bg-yellow-300  ml-4"></div>
        <span className="mx-4  text-lg">Shortest Path</span>
      </div>
      <div className="text-xl text-center">{headingText}</div>
    </>
  );
}

export default Header;
