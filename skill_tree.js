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
  ],
  connections: [{ source: 1, target: 2 }],
};

function drawLine(x1, y1, x2, y2) {
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
  svg.appendChild(svgLine);
}

function createEdges() {
  skillTree.connections.forEach((connection) => {
    const sourceNode = skillTree.nodes.find(
      (node) => node.id === connection.source
    );
    const targetNode = skillTree.nodes.find(
      (node) => node.id === connection.target
    );
    drawLine(sourceNode.x, sourceNode.y, targetNode.x, targetNode.y);
  });
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

  const imageUrl = getImageUrl(node.id);
  svgNode.setAttribute("href", imageUrl);

  svg.appendChild(svgNode);
}

// Define the createEdge function
function createEdge(connection) {
  const sourceNode = skillTree.nodes.find(
    (node) => node.id === connection.source
  );
  const targetNode = skillTree.nodes.find(
    (node) => node.id === connection.target
  );
  drawLine(sourceNode.x, sourceNode.y, targetNode.x, targetNode.y);
}

skillTree.connections.forEach(createEdge);
skillTree.nodes.forEach(createSkillNode);
