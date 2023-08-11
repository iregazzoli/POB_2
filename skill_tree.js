const svg = document.getElementById("skill-tree");

const skillNodes = [
  { id: 1, x: 300, y: 200, radius: 30 },
  { id: 2, x: 160, y: 150, radius: 30 },
];

skillNodes.forEach((node) => {
  const svgNode = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle"
  );
  svgNode.setAttribute("cx", node.x);
  svgNode.setAttribute("cy", node.y);
  svgNode.setAttribute("r", node.radius);
  svgNode.setAttribute("fill", "blue");

  svg.appendChild(svgNode);
});
