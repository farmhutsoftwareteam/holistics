const fs = require("fs");
const { createCanvas } = require("canvas");
const { parse } = require("svg-parser");
const svgpath = require("svgpath");
const path = require("path");

// Ensure directories exist
const targetDir = path.join(__dirname, "../assets/images");
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Read the SVG from logo.svg
const svgContent = fs.readFileSync(
  path.join(__dirname, "../assets/logo.svg"),
  "utf8"
);
const svgData = parse(svgContent);

// Find path element in parsed SVG
const findPath = (node) => {
  if (node.tagName === "path") return node;
  if (!node.children) return null;
  for (const child of node.children) {
    const path = findPath(child);
    if (path) return path;
  }
  return null;
};

// Get the path element
const svgRoot = svgData.children[0];
const pathElement = findPath(svgRoot);

// Canvas dimensions - adjust as needed
const width = 1024;
const height = 1024;
const padding = 120; // Padding around the logo

// Create canvas
const canvas = createCanvas(width, height);
const ctx = canvas.getContext("2d");

// Set background color to #ECF0EB
ctx.fillStyle = "#ECF0EB";
ctx.fillRect(0, 0, width, height);

// Prepare to draw logo
ctx.fillStyle = "#0B3B3C"; // Logo color

// Calculate scale to fit canvas with padding
const viewBox = svgRoot.properties.viewBox?.split(" ").map(Number) || [
  0, 0, 172, 172,
];
const scale = Math.min(
  (width - padding * 2) / viewBox[2],
  (height - padding * 2) / viewBox[3]
);

// Center the path on the canvas
ctx.translate(
  width / 2 - (viewBox[2] * scale) / 2,
  height / 2 - (viewBox[3] * scale) / 2
);
ctx.scale(scale, scale);

// Draw the path
const pathData = pathElement.properties.d;
const path = new Path2D(pathData);
ctx.fill(path);

// Save as PNG
const buffer = canvas.toBuffer("image/png");
fs.writeFileSync(path.join(targetDir, "custom-splash-logo.png"), buffer);

console.log(
  "Generated custom splash logo at assets/images/custom-splash-logo.png"
);
