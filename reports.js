// reports.js
const apiUrl = 'http://localhost:3000/bookings';

fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
        const total = data.length;
        const completed = data.filter(b => b.status === "Completed").length;
        const pending = data.filter(b => b.status === "Pending").length;
        const ongoing = data.filter(b => b.status === "Ongoing").length;
        const cancelled = data.filter(b => b.status === "Cancelled").length;

        document.getElementById('totalBookings').textContent = total;
        document.getElementById('completedBookings').textContent = completed;
        document.getElementById('pendingBookings').textContent = pending;
        document.getElementById('ongoingBookings').textContent = ongoing;
        document.getElementById('cancelledBookings').textContent = cancelled;
    })
    .catch(err => console.error("Error loading reports:", err));
