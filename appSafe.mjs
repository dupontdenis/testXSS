import {escapeHTML} from "./Utils/escapeHTML.mjs";

const response = await fetch("./api.json");
const data = await response.json();
const contentDiv = document.getElementById("content");

// VULNERABLE CODE - directly concatenating untrusted data into innerHTML
contentDiv.innerHTML =
  "<h1>" +
  escapeHTML(data.name) +
  "</h1>" +
  "<p>" +
  escapeHTML(data.description) +
  "</p>";
if (data.image) {
  contentDiv.innerHTML += "<div>" + escapeHTML(data.image) + "</div>";
}
