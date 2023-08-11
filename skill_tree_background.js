const viewport = document.querySelector("#viewport");
const largeImage = document.querySelector("#background");

let isDragging = false;
let startX, startY, startScrollX, startScrollY;

viewport.addEventListener("mousedown", (e) => {
  e.preventDefault(); // Prevent the default drag behavior
  isDragging = true;
  startX = e.clientX;
  startY = e.clientY;
  startScrollX = viewport.scrollLeft;
  startScrollY = viewport.scrollTop;
});

document.addEventListener("mousemove", (e) => {
  if (!isDragging) return;

  const deltaX = e.clientX - startX;
  const deltaY = e.clientY - startY;

  viewport.scrollLeft = startScrollX - deltaX;
  viewport.scrollTop = startScrollY - deltaY;
});

document.addEventListener("mouseup", () => {
  isDragging = false;
});

// Update nodes positions on scroll
// document.addEventListener("mousemove", (e) => {
//   if (!isDragging) return;

//   const deltaX = e.clientX - startX;
//   const deltaY = e.clientY - startY;

//   viewport.scrollLeft = startScrollX - deltaX;
//   viewport.scrollTop = startScrollY - deltaY;

//   // Update SVG node positions
//   skillNodes.forEach((node) => {
//     const svgNode = document.querySelector(`circle[data-id="${node.id}"]`);
//     svgNode.setAttribute("cx", node.x - deltaX);
//     svgNode.setAttribute("cy", node.y - deltaY);
//   });
// });
