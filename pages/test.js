import * as React from "react";
import ForceGraph2D from "react-force-graph-2d";
import { forceCollide } from "d3-force-3d";
import { graphData } from "./data";
const IMAGE_SIZE = 24;
const NODE_RELSIZE = IMAGE_SIZE;
const FORCE_LINK_DISTANCE = IMAGE_SIZE * 6;
export const FORCE_MANYBODIES_STRENGTH = -(IMAGE_SIZE * 2);
export const FORCE_COLLIDE_RADIUS = NODE_RELSIZE * 1.5;

export const syncLoadAllImages = (imageQueue, callback) => {
  let numAll = imageQueue.length;
  let numProcessed = 0;
  let allImages = new Map();

  if (numAll === 0) {
    callback(allImages);
    return;
  }

  imageQueue.forEach(e => {
    const image = new Image();
    const id = e.id;

    // Handle the image loading and error with the same callback.
    image.addEventListener("load", () => {
      numProcessed++;
      allImages.set(id, image);
      if (numAll === numProcessed) {
        if (callback) {
          callback(allImages);
          return;
        }
      }
    });
    image.src = e.image;
  });
};

const paintNodes = (imageMap, node, ctx, globalScale) => {
  if ((!node.x && isNaN(node.x)) || (!node.y && isNaN(node.y))) {
    return;
  }
  const image = imageMap.get(node.id);
  if (image) {
    ctx.drawImage(
      image,
      node.x - IMAGE_SIZE / 2,
      node.y - IMAGE_SIZE / 2,
      IMAGE_SIZE,
      IMAGE_SIZE
    );
  }
};

const applyGraphForces = (graphRef, linkDistance) => {
  //$FlowIssue
  graphRef.current
    .d3Force("link")
    .iterations(1)
    .distance(linkDistance);

  //$FlowIssue
  graphRef.current
    .d3Force("charge")
    .strength(FORCE_MANYBODIES_STRENGTH)
    .distanceMin(FORCE_MANYBODIES_STRENGTH)
    .distanceMax(FORCE_MANYBODIES_STRENGTH);
  //$FlowIssue
  graphRef.current.d3Force(
    "collide",
    forceCollide(FORCE_COLLIDE_RADIUS)
      .strength(0.2)
      .iterations(1)
  );
  graphRef.current.d3ReheatSimulation();
};

const ForceGraph = () => {
  //Reference to the graph react instance
  const graphRef = React.useRef(null);
  //Images for all graph nodes
  const [imageMap, setImageMap] = React.useState(null);
  //Link distance
  const [linkDistance, setLinkDistance] = React.useState(FORCE_LINK_DISTANCE);
  //Load images before rendering the canvas

  React.useEffect(() => {
    if (graphRef.current) {
      console.log("Change link distance!");
      applyGraphForces(graphRef, linkDistance);
    }
  }, [linkDistance]);

  if (!imageMap) {
    const images = graphData.nodes.map(e => ({
      id: e.id,
      image: e.icon
    }));
    syncLoadAllImages(images, loadedImages => {
      setImageMap(loadedImages);
      setTimeout(() => {
        applyGraphForces(graphRef, linkDistance);
      });
    });
    return null;
  }

  return (
    <div className="fgFlexContainer">
      <div className="fgHead">
        <h1>Link distance: {linkDistance}</h1>
        <p className="labelish">Link distances:</p>
        <div className="distanceOptions">
          <div id="distance-2-container" className="floatBlock">
            <label for="distance-2-container">
              {" "}
              <input
                type="radio"
                value="48"
                checked={linkDistance === 48}
                onChange={() => setLinkDistance(48)}
              />{" "}
              * 2
            </label>
          </div>
          <div id="distance-6-container" className="floatBlock">
            <label for="distance-6-container">
              {" "}
              <input
                type="radio"
                value="144"
                checked={linkDistance === 144}
                onChange={() => setLinkDistance(144)}
              />{" "}
              * 6
            </label>
          </div>
          <div id="distance-12-container" className="floatBlock">
            <label for="distance-12-container">
              {" "}
              <input
                type="radio"
                value="288"
                checked={linkDistance === 288}
                onChange={() => setLinkDistance(288)}
              />{" "}
              * 12
            </label>
          </div>
        </div>
      </div>
      <div>
        <ForceGraph2D
          ref={graphRef}
          graphData={graphData}
          nodeVal={IMAGE_SIZE}
          linkOpacity={1}
          nodeCanvasObject={(node, ctx, globalScale) =>
            paintNodes(imageMap, node, ctx, globalScale)
          }
        />
      </div>
    </div>
  );
};

export default ForceGraph;
