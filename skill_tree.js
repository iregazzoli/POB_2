const svg = document.getElementById("skill-tree");
const NODESIZE = 50;

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
      radius: NODESIZE,
      name: "Skill A",
      details: "Details about Skill A",
    },
    {
      id: 2,
      x: 400,
      y: 400,
      radius: NODESIZE,
      name: "Skill B",
      details: "Details about Skill B",
    },
    {
      id: 3,
      x: 900,
      y: 400,
      radius: NODESIZE,
      name: "Skill C",
      details: "Details about Skill C",
    },
    {
      id: 4,
      x: 400,
      y: 800,
      radius: NODESIZE,
      name: "Skill D",
      details: "Details about Skill D",
    },
    {
      id: 5,
      x: 700,
      y: 900,
      radius: NODESIZE,
      name: "Skill E",
      details: "Details about Skill E",
    },
    {
      id: 6,
      x: 1200,
      y: 400,
      radius: NODESIZE,
      name: "Skill F",
      details: "Details about Skill F",
    },
    {
      id: 7,
      x: 1050,
      y: 700,
      radius: NODESIZE,
      name: "Skill G",
      details: "Details about Skill G",
    },
    {
      id: 8,
      x: 100,
      y: 900,
      radius: NODESIZE,
      name: "Skill H",
      details: "Details about Skill H",
    },
    {
      id: 9,
      x: 1150,
      y: 1180,
      radius: NODESIZE,
      name: "Skill I",
      details: "Details about Skill I",
    },
  ],
  connections: [
    { node1Id: 1, node2Id: 2 },
    { node1Id: 2, node2Id: 3 },
    { node1Id: 2, node2Id: 4 },

    { node1Id: 4, node2Id: 5 },
    { node1Id: 4, node2Id: 8 },
    { node1Id: 5, node2Id: 9 },

    { node1Id: 3, node2Id: 6 },
    { node1Id: 3, node2Id: 7 },
    { node1Id: 6, node2Id: 7 },

    { node1Id: 7, node2Id: 9 },
  ],
};

// | Edges |

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
  svgLine.setAttribute("stroke-width", 7);
  svgLine.setAttribute("stroke-linecap", "round");
  svgLine.setAttribute("data-node1", node1Id);
  svgLine.setAttribute("data-node2", node2Id);
  svg.appendChild(svgLine);
  return svgLine;
}

//TODO: think a better name bc this returns an edge only if both skills are learned
//TODO: refactor this later
function updateEdgeEffect(node1Id, node2Id) {
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
      updateEdgeEffect(connection.node1Id, connection.node2Id);
    }
  });
}

// Define the createEdge function
function createEdge(connection) {
  const node1 = skillTree.nodes.find((node) => node.id === connection.node1Id);
  const node2 = skillTree.nodes.find((node) => node.id === connection.node2Id);
  drawLine(node1.x, node1.y, node2.x, node2.y, node1.id, node2.id);
}

// | Nodes |

const learnedNodes = new Set();

function learnNode(nodeId) {
  const svgNode = document.getElementById(nodeId);
  if (svgNode) {
    svgNode.classList.remove("unlearned-skill");
    learnedNodes.add(nodeId);
  }
}

function unlearnNode(nodeId) {
  const svgNode = document.getElementById(nodeId);
  if (svgNode) {
    svgNode.classList.add("unlearned-skill");
    learnedNodes.delete(nodeId);
  }
}

function learnNode(nodeId) {
  const svgNode = document.getElementById(nodeId);
  if (svgNode) {
    svgNode.classList.remove("unlearned-skill");
    learnedNodes.add(nodeId);
  }
}

function unlearnNode(nodeId) {
  const svgNode = document.getElementById(nodeId);
  if (svgNode) {
    svgNode.classList.add("unlearned-skill");
    learnedNodes.delete(nodeId);
  }
}

function isLearned(nodeId) {
  return learnedNodes.has(nodeId);
}

function findShortestPath(startNodeId, targetNodeId, visited) {
  if (startNodeId === targetNodeId) {
    return [startNodeId];
  }

  visited.add(startNodeId);

  for (const connection of skillTree.connections) {
    if (
      connection.node1Id === startNodeId &&
      !visited.has(connection.node2Id)
    ) {
      const path = findShortestPath(connection.node2Id, targetNodeId, visited);
      if (path.length) {
        path.unshift(startNodeId);
        return path;
      }
    }
    if (
      connection.node2Id === startNodeId &&
      !visited.has(connection.node1Id)
    ) {
      const path = findShortestPath(connection.node1Id, targetNodeId, visited);
      if (path.length) {
        path.unshift(startNodeId);
        return path;
      }
    }
  }

  return [];
}

function learnPath(path) {
  for (let i = 0; i < path.length - 1; i++) {
    learnNode(path[i]);
    updateEdgeEffects(path[i]);
  }
  learnNode(path[path.length - 1]);
  updateEdgeEffects(path[path.length - 1]);
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
  svgNode.setAttribute("data-details", node.details);

  const imageUrl = getImageUrl(node.id);
  svgNode.setAttribute("href", imageUrl);

  svgNode.addEventListener("click", () => {
    svgNode.classList.toggle("unlearned-skill");
    if (svgNode.classList.contains("unlearned-skill")) {
      unlearnNode(node.id);
    } else {
      learnNode(node.id);
      const shortestPath = findShortestPath(
        node.id,
        Array.from(learnedNodes)[0],
        new Set()
      );
      learnPath(shortestPath);
    }
    updateEdgeEffects(node.id);
  });

  svg.appendChild(svgNode);

  // Handle hover effect
  svgNode.addEventListener("mouseover", (event) => {
    svgNode.setAttribute("width", node.radius * 2.2);
    svgNode.setAttribute("height", node.radius * 2.2);

    // Show and update the tooltip
    const tooltip = document.getElementById("tooltip");
    tooltip.querySelector(".tooltip-name").textContent = node.name;
    tooltip.querySelector(".tooltip-details").textContent = node.details;
    tooltip.style.left = `${event.clientX}px`;
    tooltip.style.top = `${event.clientY}px`;
    tooltip.style.display = "block";
  });

  svgNode.addEventListener("mouseout", () => {
    svgNode.setAttribute("width", node.radius * 2);
    svgNode.setAttribute("height", node.radius * 2);

    // Hide the tooltip
    const tooltip = document.getElementById("tooltip");
    tooltip.style.display = "none";
  });
}

skillTree.connections.forEach(createEdge);
skillTree.nodes.forEach(createSkillNode);
