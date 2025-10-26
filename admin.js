// admin-dashboard.js
const apiBase = 'http://localhost:3000';

Promise.all([
    fetch(`${apiBase}/bookings`).then(res => res.json()),
    fetch(`${apiBase}/customers`).then(res => res.json()),
    fetch(`${apiBase}/drivers`).then(res => res.json())
])
.then(([bookings, customers, drivers]) => {
    document.getElementById('totalBookings').textContent = bookings.length;
    document.getElementById('totalCustomers').textContent = customers.length;
    document.getElementById('totalDrivers').textContent = drivers.length;
})
.catch(err => console.error("Error loading dashboard data:", err));
