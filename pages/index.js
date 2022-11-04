import Graph from "react-graph-vis";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

export default function App() {
  const [load, setLoad] = useState(false);
  const [hierarchical, setHierarchical] = useState(false); 
  const [selected, setSelected] = useState(null);
  const [final, setFinal] = useState(null);
  let [graphKey, setGraphKey] = useState(Math.random() * 1000000000000000)

  let state = {
    graph: {
      nodes: [
      ],
      edges: [
      ],
    },
  }

  const options = {
    autoResize: true,
    clickToUse: false,
    layout: {
      hierarchical: hierarchical,
    },
    nodes: {
      shape: "dot",
      size: 17,
      font: {
        color: 'rgba(240, 240, 240, 0.7)',
      }
    },
    physics: {
      maxVelocity: 146,
    },
    edges: {
      color: "#ffffff",
      length: 175,
    },
    manipulation: {
      enabled: true,
    },
    interaction: {
      zoomView: false
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
    state = ({ graph: { nodes, edges }, counter, ...rest}) => {
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
    }
  };

  useEffect(() => {
    setLoad(false);
    fetch("/api/edges")
      .then((res) => res.json())
      .then((data) => {
        console.log('data')
        console.log(data.data)
        console.log('static')
        console.log(state)
        setFinal(data.data)
      });

    setLoad(true);
  }, []);

  const { graph, events } = final ? final : state;

  return (
    <div className="graph">
      {selected}
      {load && final && (
        <Graph
          graph={graph}
          options={options}
          events={events}
          key={Math.random()}
          style={{ height: "98vh"}}
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
