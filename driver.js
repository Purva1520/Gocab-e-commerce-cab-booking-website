// driver.js

const driver = JSON.parse(localStorage.getItem("driverData"));

if (!driver) {
  alert("Session expired! Please login again.");
  window.location.href = "driver-login.html";
}

// Populate Dashboard
document.getElementById("driverInfo").textContent = `Welcome, ${driver.name} (ID: ${driver.id})`;
document.getElementById("rideCount").textContent = driver.rides.length;
document.getElementById("earnings").textContent = `₹${driver.earnings}`;
document.getElementById("rating").textContent = `${driver.rating} ★`;
document.getElementById("pending").textContent = `₹${driver.pending}`;

// Add Rides
const table = document.getElementById("ridesTable");
driver.rides.forEach(r => {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${r.rideId}</td>
    <td>${r.customer}</td>
    <td>${r.pickup}</td>
    <td>${r.drop}</td>
    <td>${r.status}</td>
  `;
  table.appendChild(row);
});

// JSON + Fetch Example
fetch("drivers.json")
  .then(res => res.json())
  .then(data => console.log("JSON Loaded:", data))
  .catch(err => console.error("Error:", err));

// Function Example
function updateEarnings(amount) {
  if (typeof amount !== "number" || amount <= 0) {
    console.error("Invalid amount");
    return;
  }
  driver.earnings += amount;
  document.getElementById("earnings").textContent = `₹${driver.earnings}`;
}
