// fetch the JSON data from api.json and add to the DOM UNsafely
// THIS IS VULNERABLE TO XSS - for demonstration purposes only!

const response = await fetch("./api.json");
const data = await response.json();
const contentDiv = document.getElementById("content");

// VULNERABLE CODE - directly concatenating untrusted data into innerHTML
contentDiv.innerHTML =
  "<h1>" + data.name + "</h1>" + "<p>" + data.description + "</p>";
if (data.image) {
  contentDiv.innerHTML = "<div>" + data.image + "</div>";
}


