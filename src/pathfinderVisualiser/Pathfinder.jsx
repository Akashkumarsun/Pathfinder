import React, { useState, useEffect } from "react";
import Header from "./header/Header";
import Board from "./board/Board";
import { dijkstra } from "./Algo/dijkstra";
import { AStar } from "./Algo/aStar";
import { bfs } from "./Algo/bfs";
import { dfs } from "./Algo/dfs";
import { useWindowDimensions } from "./components/WindowDimension";

function Pathfinder() {
  const { height, width } = useWindowDimensions();

  const [board, setBoard] = useState({
    grid: [],
    START_NODE_ROW: Math.floor((height - 100) / (25 * 2)),
    FINISH_NODE_ROW: Math.floor((height - 100) / (25 * 2)),
    START_NODE_COL: Math.floor(width / (26 * 4)),
    FINISH_NODE_COL: Math.floor(width / (26 * 4)) * 3,
    mouseIsPressed: false,
    ROW_COUNT: Math.floor((height - 200) / 25),
    COLUMN_COUNT: Math.floor(width / 25),
    MOBILE_ROW_COUNT: 10,
    MOBILE_COLUMN_COUNT: 20,
    isRunning: false,
    isStartNode: false,
    isFinishNode: false,
    isWallNode: false,
    currRow: 0,
    currCol: 0,
    isDesktopView: true,
  });

  useEffect(() => {
    const grid = getInitialGrid();
    setBoard((prev) => {
      prev.grid = grid;
      return {
        ...prev,
      };
    });
  }, []);

  // initial grid
  function getInitialGrid(
    rowCount = board.ROW_COUNT,
    colCount = board.COLUMN_COUNT
  ) {
    const initialGrid = [];
    for (let row = 0; row < rowCount; row++) {
      const currentRow = [];
      for (let col = 0; col < colCount; col++) {
        currentRow.push(createNode(row, col));
      }
      initialGrid.push(currentRow);
    }
    return initialGrid;
  }

  // create node
  function createNode(row, col) {
    return {
      row,
      col,
      isStart: row === board.START_NODE_ROW && col === board.START_NODE_COL,
      isFinish: row === board.FINISH_NODE_ROW && col === board.FINISH_NODE_COL,
      distance: Infinity,
      distanceToFinishNode:
        Math.abs(board.FINISH_NODE_ROW - row) +
        Math.abs(board.FINISH_NODE_COL - col),
      isVisited: false,
      isWall: false,
      previousNode: null,
      isNode: true,
    };
  }

  // checks if grid is clear or not
  function isGridClear() {
    for (const row of board.grid) {
      for (const node of row) {
        const nodeClassName = document.getElementById(
          `node-${node.row}-${node.col}`
        );
        if (
          nodeClassName === "node node-visited" ||
          nodeClassName === "node node-shortest-path"
        ) {
          return false;
        }
      }
    }
    return true;
  }

  function toggleIsRunning() {
    setBoard((prev) => {
      return {
        ...prev,
        isRunning: !prev.isRunning,
      };
    });
  }

  // search path
  function visualise(algo) {
    if (!board.isRunning) {
      clearGrid();
      toggleIsRunning();
      const { grid } = board;
      const startNode = grid[board.START_NODE_ROW][board.START_NODE_COL];
      const finishNode = grid[board.FINISH_NODE_ROW][board.FINISH_NODE_COL];

      let visitedNodeInOrder;
      switch (algo) {
        case "Dijkstra's Algorithm":
          visitedNodeInOrder = dijkstra(grid, startNode, finishNode);
          break;
        case "A* Search":
          visitedNodeInOrder = AStar(grid, startNode, finishNode);
          break;
        case "Breadth-first Search":
          visitedNodeInOrder = bfs(grid, startNode, finishNode);
          break;
        case "Depth-first Search":
          visitedNodeInOrder = dfs(grid, startNode, finishNode);
          break;
      }

      const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
      nodesInShortestPathOrder.push("end");
      animate(visitedNodeInOrder, nodesInShortestPathOrder);
    }
  }

  function animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      if (nodesInShortestPathOrder[i] === "end") {
        setTimeout(() => {
          toggleIsRunning();
        }, i * 50);
      } else {
        setTimeout(() => {
          const node = nodesInShortestPathOrder[i];
          const nodeClassName = document.getElementById(
            `node-${node.row}-${node.col}`
          ).className;
          if (
            nodeClassName !== "node node-start" &&
            nodeClassName !== "node node-finish"
          ) {
            document.getElementById(`node-${node.row}-${node.col}`).className =
              "node node-shortest-path";
          }
        }, i * 40);
      }
    }
  }

  function animate(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        const nodeClassName = document.getElementById(
          `node-${node.row}-${node.col}`
        ).className;
        if (
          nodeClassName !== "node node-start" &&
          nodeClassName !== "node node-finish"
        ) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node node-visited";
        }
      }, 10 * i);
    }
  }

  function getNodesInShortestPathOrder(finishNode) {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
      nodesInShortestPathOrder.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
  }

  //---------------------- mouse events -----------------------------

  function handleMouseDown(row, col) {
    if (!board.isRunning) {
      if (isGridClear()) {
        if (
          document.getElementById(`node-${row}-${col}`).className ===
          "node node-start"
        ) {
          setBoard((prev) => {
            return {
              ...prev,
              mouseIsPressed: true,
              isStartNode: true,
              currRow: row,
              currCol: col,
            };
          });
        } else if (
          document.getElementById(`node-${row}-${col}`).className ===
          "node node-finish"
        ) {
          setBoard((prev) => {
            return {
              ...prev,
              mouseIsPressed: true,
              isFinishNode: true,
              currRow: row,
              currCol: col,
            };
          });
        } else {
          const newGrid = getNewGridWithWallToggled(board.grid, row, col);
          setBoard((prev) => {
            return {
              ...prev,
              grid: newGrid,
              mouseIsPressed: true,
              isWallNode: true,
              currRow: row,
              currCol: col,
            };
          });
        }
      } else {
        clearGrid();
      }
    }
  }

  function handleMouseEnter(row, col) {
    if (!board.isRunning) {
      if (board.mouseIsPressed) {
        const nodeClassName = document.getElementById(
          `node-${row}-${col}`
        ).className;

        if (board.isStartNode) {
          if (nodeClassName !== "node node-wall") {
            const prevStartNode = board.grid[board.currRow][board.currCol];
            prevStartNode.isStart = false;

            document.getElementById(
              `node-${board.currRow}-${board.currCol}`
            ).className = "node";

            const currentStartNode = board.grid[row][col];
            currentStartNode.isStart = true;
            document.getElementById(`node-${row}-${col}`).className =
              "node node-start";

            setBoard((prev) => {
              return {
                ...prev,
                START_NODE_ROW: row,
                START_NODE_COL: col,
                currRow: row,
                currCol: col,
              };
            });
          }
        } else if (board.isFinishNode) {
          if (nodeClassName !== "node node-wall") {
            const prevFinishNode = board.grid[board.currRow][board.currCol];
            prevFinishNode.isStart = false;

            document.getElementById(
              `node-${board.currRow}-${board.currCol}`
            ).className = "node";

            const currentFinishNode = board.grid[row][col];
            currentFinishNode.isFinish = true;
            document.getElementById(`node-${row}-${col}`).className =
              "node node-finish";

            setBoard((prev) => {
              return {
                ...prev,
                FINISH_NODE_ROW: row,
                FINISH_NODE_COL: col,
                currRow: row,
                currCol: col,
              };
            });
          }
        } else if (board.isWallNode) {
          const newGrid = getNewGridWithWallToggled(board.grid, row, col);
          setBoard((prev) => {
            return {
              ...prev,
              grid: newGrid,
            };
          });
        }
      }
    }
  }

  function handleMouseUp(row, col) {
    if (!board.isRunning) {
      setBoard((prev) => {
        return {
          ...prev,
          mouseIsPressed: false,
        };
      });
      if (board.isStartNode) {
        const isStartNode = !board.isStartNode;
        setBoard((prev) => {
          return {
            ...prev,
            isStartNode: isStartNode,
            START_NODE_ROW: row,
            START_NODE_COL: col,
          };
        });
      } else if (board.isFinishNode) {
        const isFinishNode = !board.isFinishNode;
        setBoard((prev) => {
          return {
            ...prev,
            isFinishNode: isFinishNode,
            FINISH_NODE_ROW: row,
            FINISH_NODE_COL: col,
          };
        });
      }
      getInitialGrid();
    }
  }

  function handleMouseLeave() {
    if (board.isStartNode) {
      const isStartNode = !board.isStartNode;
      setBoard((prev) => {
        return {
          ...prev,
          isStartNode: isStartNode,
          mouseIsPressed: false,
        };
      });
    } else if (board.isFinishNode) {
      const isFinishNode = !board.isFinishNode;
      setBoard((prev) => {
        return {
          ...prev,
          isFinishNode: isFinishNode,
          mouseIsPressed: false,
        };
      });
    } else if (board.isWallNode) {
      const isWallNode = !board.isWallNode;
      setBoard((prev) => {
        return {
          ...prev,
          isWallNode: isWallNode,
          mouseIsPressed: false,
        };
      });
      getInitialGrid();
    }
  }

  // ------------------------ create walls ------------------------
  function getNewGridWithWallToggled(grid, row, col) {
    const newGrid = grid.slice();
    const node = newGrid[row][col];

    if (!node.isStart && !node.isFinish && node.isNode) {
      const newNode = {
        ...node,
        isWall: !node.isWall,
      };
      newGrid[row][col] = newNode;
    }
    return newGrid;
  }

  // clear grid

  function clearGrid() {
    if (!board.isRunning) {
      const newGrid = board.grid.slice();
      for (const row of newGrid) {
        for (const node of row) {
          let nodeClassName = document.getElementById(
            `node-${node.row}-${node.col}`
          ).className;
          if (
            nodeClassName !== "node node-start" &&
            nodeClassName !== "node node-finish" &&
            nodeClassName !== "node node-wall"
          ) {
            document.getElementById(`node-${node.row}-${node.col}`).className =
              "node";
            node.isVisited = false;
            node.distance = Infinity;
            node.distanceToFinishNode =
              Math.abs(board.FINISH_NODE_ROW - node.row) +
              Math.abs(board.FINISH_NODE_COL - node.col);
          }

          if (nodeClassName === "node node-finish") {
            node.isVisited = false;
            node.distance = Infinity;
            node.distanceToFinishNode = 0;
          }
          if (nodeClassName === "node node-start") {
            node.isVisited = false;
            node.distance = Infinity;
            node.distanceToFinishNode =
              Math.abs(board.FINISH_NODE_ROW - node.row) +
              Math.abs(board.FINISH_NODE_COL - node.col);
            node.isStart = true;
            node.isWall = false;
            node.previousNode = null;
            node.isNode = true;
          }
        }
      }
    }
  }

  function clearWalls() {
    if (!board.isRunning) {
      const newGrid = board.grid.slice();

      for (const row of newGrid) {
        for (const node of row) {
          let nodeClassName = document.getElementById(
            `node-${node.row}-${node.col}`
          ).className;

          if (nodeClassName === "node node-wall") {
            document.getElementById(`node-${node.row}-${node.col}`).className =
              "node";
            node.isWall = false;
          }
        }
      }
    }
  }

  return (
    <div>
      <Header
        visualise={visualise}
        clearGrid={clearGrid}
        clearWalls={clearWalls}
      />
      <Board
        grid={board.grid}
        handleMouseDown={handleMouseDown}
        handleMouseEnter={handleMouseEnter}
        handleMouseUp={handleMouseUp}
        handleMouseLeave={handleMouseLeave}
      />
    </div>
  );
}

export default Pathfinder;
