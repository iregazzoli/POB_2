const svg = document.getElementById("skill-tree");

// Define the getImageUrl function
function getImageUrl(nodeId) {
  return `assets/skill_icon_${nodeId}.png`;
}

const skillTree = {
  nodes: [
    {
      id: 1,
      x: 100,
      y: 100,
      radius: 30,
      label: "Skill A",
      details: "Details about Skill A",
    },
    {
      id: 2,
      x: 300,
      y: 300,
      radius: 30,
      label: "Skill B",
      details: "Details about Skill B",
    },
    {
      id: 3,
      x: 500,
      y: 300,
      radius: 30,
      label: "Skill C",
      details: "Details about Skill C",
    },
  ],
  connections: [
    { node1Id: 1, node2Id: 2 },
    { node1Id: 2, node2Id: 3 },
  ],
};

function drawLine(x1, y1, x2, y2, node1Id, node2Id) {
  const svgLine = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "line"
  );
  svgLine.setAttribute("x1", x1);
  svgLine.setAttribute("y1", y1);
  svgLine.setAttribute("x2", x2);
  svgLine.setAttribute("y2", y2);
  svgLine.setAttribute("stroke", "black");
  svgLine.setAttribute("stroke-width", 3);
  svgLine.setAttribute("stroke-linecap", "round");
  svgLine.setAttribute("data-node1", node1Id);
  svgLine.setAttribute("data-node2", node2Id);
  svg.appendChild(svgLine);
  return svgLine;
}

//TODO: think a better name bc this returns an edge only if both skills are learned
//TODO: refactor this later
function getEdgeSvgElement(node1Id, node2Id) {
  const edges = svg.querySelectorAll("line");
  for (const edge of edges) {
    const edgeNode1Id = parseInt(edge.getAttribute("data-node1"));
    const edgeNode2Id = parseInt(edge.getAttribute("data-node2"));

    if (
      (edgeNode1Id === node1Id || edgeNode1Id === node2Id) &&
      (edgeNode2Id === node1Id || edgeNode2Id === node2Id)
    ) {
      const node1 = svg.querySelector(`[id="${edgeNode1Id}"]`);
      const node2 = svg.querySelector(`[id="${edgeNode2Id}"]`);

      if (
        node1 &&
        node2 &&
        !node1.classList.contains("unlearned-skill") &&
        !node2.classList.contains("unlearned-skill")
      ) {
        edge.classList.add("illuminated");
      } else {
        edge.classList.remove("illuminated");
      }
    }
  }
}

function updateEdgeEffects(clickedNodeId) {
  skillTree.connections.forEach((connection) => {
    if (
      connection.node1Id == clickedNodeId ||
      connection.node2Id == clickedNodeId
    ) {
      getEdgeSvgElement(connection.node1Id, connection.node2Id);
    }
  });
}

// Define the createEdge function
function createEdge(connection) {
  const node1 = skillTree.nodes.find((node) => node.id === connection.node1Id);
  const node2 = skillTree.nodes.find((node) => node.id === connection.node2Id);
  drawLine(node1.x, node1.y, node2.x, node2.y, node1.id, node2.id);
}

function createSkillNode(node) {
  const svgNode = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "image"
  );

  svgNode.setAttribute("x", node.x - node.radius);
  svgNode.setAttribute("y", node.y - node.radius);
  svgNode.setAttribute("width", node.radius * 2);
  svgNode.setAttribute("height", node.radius * 2);
  svgNode.classList.add("unlearned-skill");
  svgNode.setAttribute("id", node.id);

  const imageUrl = getImageUrl(node.id);
  svgNode.setAttribute("href", imageUrl);

  svgNode.addEventListener("click", () => {
    svgNode.classList.toggle("unlearned-skill");
    updateEdgeEffects(node.id);
  });

  svg.appendChild(svgNode);
}

skillTree.connections.forEach(createEdge);
skillTree.nodes.forEach(createSkillNode);
