const response = await fetch("./api.json");
const data = await response.json();
const contentDiv = document.getElementById("content");

// Build the complete HTML first, then assign once
let html = `
  <h1>${data.name}</h1>
  <p>${data.description}</p>
`;
if (data.image) {
  html += `<div>${data.image}</div>`;
}
contentDiv.innerHTML = html;
