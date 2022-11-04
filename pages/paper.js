import Graph from "react-graph-vis";
import React, { useState, useEffect } from "react";
import processed from './processed'


export default function App() {
  const [load, setLoad] = useState(false);
  const [hierarchical, setHierarchical] = useState(false);
  const [selected, setSelected] = useState(null);
  const [final, setFinal] = useState(null);
  let [graphKey, setGraphKey] = useState(Math.random() * 1000000000000000);

  let state = {
    graph: {
      nodes: [
        { id: 11, label: "Node 1", color: randomColor() },
        { id: 2, label: "Node 2", color: randomColor() },
        { id: 3, label: "Node 3", color: randomColor() },
        { id: 4, label: "Node 4", color: randomColor() },
      ],
      edges: [
        { from: 11, to: 2 },
        { from: 11, to: 3 },
        { from: 11, to: 7 },
        { from: 2, to: 4 },
      ],
    },
  };

  const options = {
    autoResize: true,
    clickToUse: false,
    layout: {
      hierarchical: hierarchical,
    },
    nodes: {
      shape: "dot",
      size: 50,
      font: {
        color: "rgba(240, 240, 240, 0.7)",
      },
    },
    physics: {
      maxVelocity: 146,
    },
    edges: {
      color: "#ffffff",
    },
    manipulation: {
      enabled: true,
    },
    interaction: {
      zoomView: false,
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

  const setNode = (x, y) => {
    const color = randomColor();
    state = ({ graph: { nodes, edges }, counter, ...rest }) => {
      const id = counter++;
      const from = Math.floor(Math.random() * (counter - 1)) + 1;
      return {
        graph: {
          nodes: [...nodes, { id, label: `Node $(id}`, color, x, y }],
          edges: [...edges, { from, to: id }],
        },
        counter: id,
        ...rest,
      };
    };
  };

  useEffect(() => {
    setLoad(false);
    fetch("/api/edges")
      .then((res) => res.json())
      .then((data) => {
        console.log("data");
        console.log(data.data);
        console.log("static");
        console.log(state);
        setFinal(data.data);
      });

    setLoad(true);
  }, []);

  console.log(processed)

  const { graph, events } = final ? final : state;

  return (
    <div
      className="container"
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "2em 5em 2em 15em",
      }}
    >
      <div className="paper">
        <h1>Paper name</h1>
        <p>Paper descrption</p>
      </div>

      <div className="stats" style={{ display: 'flex', flexDirection: 'column', gap: '3em'}}>
        <div className="graphcontainer" style={{ width: "30vw" }}>
          <h2>Knowledge Graph</h2>
          {load && final && (
            <div className="graph">
            <Graph
              graph={graph}
              options={options}
              events={events}
              key={Math.random()}
              style={{ height: "45vh" }}
            />
            </div>
          )}
        </div>
        <div className="backlinks" style={{ width: "20vw" }}>
          <h2>Backlinks</h2>
          <p>analysis goes here</p>
        </div>
      </div>
    </div>
  );
}
