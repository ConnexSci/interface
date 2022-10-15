import Graph from "react-graph-vis";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

export default function App() {
  const [load, setLoad] = useState(false);
  const [hierarchical, setHierarchical] = useState(false); 

  const options = {
    layout: {
      hierarchical: hierarchical,
    },
    edges: {
      color: "#ffffff",
    },
  };

  function randomColor() {
    const red = Math.floor(Math.random() * 256)
      .toString(16)
      .padStart(2, "0");
    const green = Math.floor(Math.random() * 256)
      .toString(16)
      .padStart(2, "0");
    const blue = Math.floor(Math.random() * 256)
      .toString(16)
      .padStart(2, "0");
    return `#${red}${green}${blue}`;
  }

  useEffect(() => {
    setLoad(false);
    fetch("/api/edges")
      .then((res) => res.json())
      .then((data) => {
        console.log(data.edges);
        console.log(data.nodes);
      });

    setLoad(true);
  }, []);
  const [state, setState] = useState({
    counter: 5,
    graph: {
      nodes: [
        { id: 1, label: "Node 1", color: randomColor() },
        { id: 2, label: "Node 2", color: randomColor() },
        { id: 3, label: "Node 3", color: randomColor() },
        { id: 4, label: "Node 4", color: randomColor() },
        { id: 5, label: "Node 5", color: randomColor() },
      ],
      edges: [
        { from: 1, to: 2 },
        { from: 1, to: 3 },
        { from: 2, to: 4 },
        { from: 2, to: 5 },
      ],
    },
    events: {
      select: ({ nodes, edges }) => {
        console.log("Selected nodes:");
        console.log(nodes);
        console.log("Selected edges:");
        console.log(edges);
      },
    },
  });
  const { graph, events } = state;
  return (
    <div>
      <button onClick={() => (setHierarchical(!hierarchical))}>setHierarchal</button>
      {load && (
        <Graph
          graph={graph}
          options={options}
          events={events}
          style={{ height: "80vh" }}
        />
      )}
    </div>
  );
}

/*
const createNode = (x, y) => {
    const color = randomColor();
    setState(({ graph: { nodes, edges }, counter, ...rest }) => {
      const id = counter + 1;
      const from = Math.floor(Math.random() * (counter - 1)) + 1;
      return {
        graph: {
          nodes: [
            ...nodes,
            { id, label: `Node ${id}`, color, x, y }
          ],
          edges: [
            ...edges,
            { from, to: id }
          ]
        },
        counter: id,
        ...rest
      }
    });
  }
  

*/
