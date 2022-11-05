import Graph from "react-graph-vis";
import React, { useState, useEffect } from "react";
import processed from "./processed";

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

  console.log(processed);

  const { graph, events, links, mesh, connected } = final ? final : state;
  console.log(links);

  return (
    <div
      className="container"
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "2em 5em 2em 15em",
      }}
    >
      <div className="stats" style={{ display: "flex", gap: "7em" }}>
        <div className="graphcontainer" style={{ width: "40vw" }}>
          <h2>Sensory neurons in the Drosophila genital tract regulate female reproductive behavior</h2>
          <p style={{
            lineHeight: "1.5em",
            fontSize: "1.2em",
          }}>
            Females of many animal species behave very differently before and
            after mating. In <span className="orange">Drosophila melanogaster</span>, changes in female behavior
            upon mating are triggered by the sex peptide (SP), a small peptide
            present in the male's seminal fluid. SP activates a specific
            receptor, the <span className="purple">sex peptide receptor (SPR)</span>, which is broadly expressed
            in the female reproductive tract and nervous system. Here, we
            pinpoint the action of SPR to a small subset of internal sensory
            receptor, the <span className="orange">sex peptide receptor (SPR)</span>, which is broadly expressed
            neurons that innervate the female uterus and oviduct. These neurons
            express both fruitless (fru), a marker for neurons likely to have
            sex-specific functions, and pickpocket (ppk), <span className="orange">a marker for
            proprioceptive neurons</span>. We show that SPR expression in these fru+
            ppk+ neurons is both necessary and sufficient for behavioral changes
            induced by mating. These <span className="blue">neurons project to regions of the central
            nervous system</span> that have been implicated in the control of
            reproductive behaviors in Drosophila and other insects.
          </p>
          <br/>
          <h2>Knowledge Graph</h2>
          {load && final && (
            <div className="graph">
              <Graph
                graph={graph}
                options={options}
                events={events}
                key={Math.random()}
                style={{ height: "30vh" }}
              />
            </div>
          )}
        </div>
        <div className="backlinks" style={{ width: "20vw" }}>
          <h2>Backlinks</h2>
          <div>
            {connected?.slice(1, 10).map((item, index) => {
              return (
                <div key={index}>
                  <p
                    style={{
                      padding: "5px 10px",
                      margin: "5px 3px",
                      backgroundColor: "rgb(60, 60, 60)",
                    }}
                  >
                    {item.label}
                  </p>
                </div>
              );
            })}
          </div>
          <br />
          <h2>Tags</h2>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            {links?.map((item, index) => {
              return (
                <div key={index}>
                  <p
                    style={{
                      padding: "5px 10px",
                      margin: "3px",
                      backgroundColor: "rgb(60, 60, 60)",
                    }}
                  >
                    {item.label}
                  </p>
                </div>
              );
            })}
          </div>
          <br />
          <h2>Mesh Data</h2>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            {mesh?.map((item, index) => {
              return (
                <div key={index}>
                  <p
                    style={{
                      padding: "5px 10px",
                      margin: "3px",
                      backgroundColor: "rgb(60, 60, 60)",
                    }}
                  >
                    {item.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
