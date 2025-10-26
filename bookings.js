<<<<<<< HEAD
const bookingsApi = 'http://localhost:3000/bookings';
const customersApi = 'http://localhost:3000/customers';
const driversApi = 'http://localhost:3000/drivers';

const table = document.getElementById('bookingsTable');
const customerInput = document.getElementById('customer');
const driverInput = document.getElementById('driver');
const statusInput = document.getElementById('status');
const addBtn = document.getElementById('addBtn');
let editId = null;

// Load bookings
function loadBookings() {
    fetch(bookingsApi)
        .then(res => res.json())
        .then(data => {
            table.innerHTML = `
                <tr>
                    <th>Booking ID</th>
                    <th>Customer</th>
                    <th>Driver</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            `;
            data.forEach(booking => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${booking.id}</td>
                    <td>${booking.customer}</td>
                    <td>${booking.driver}</td>
                    <td>${booking.status}</td>
                    <td>
                        <button onclick="editBooking(${booking.id})">Edit</button>
                        <button onclick="deleteBooking(${booking.id})">Delete</button>
                    </td>
                `;
                table.appendChild(row);
            });
        });
}

// Add or update booking
addBtn.addEventListener('click', async () => {
    const customer = customerInput.value.trim();
    const driver = driverInput.value.trim();
    const status = statusInput.value;

    if (!customer || !driver) {
        alert('Please enter both customer and driver names.');
        return;
    }

    try {
        // 1️⃣ Ensure customer exists
        let customerData = await fetch(`${customersApi}?name=${encodeURIComponent(customer)}`)
            .then(res => res.json());
        if (customerData.length === 0) {
            await fetch(customersApi, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: customer, email: '' })
            });
        }

        // 2️⃣ Ensure driver exists
        let driverData = await fetch(`${driversApi}?name=${encodeURIComponent(driver)}`)
            .then(res => res.json());
        if (driverData.length === 0) {
            await fetch(driversApi, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: driver, car: '', rating: 0 })
            });
        }

        // 3️⃣ Add or update booking
        if (editId) {
            await fetch(`${bookingsApi}/${editId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ customer, driver, status })
            });
        } else {
            await fetch(bookingsApi, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ customer, driver, status })
            });
        }

        resetForm();
        loadBookings();
    } catch (err) {
        console.error(err);
        alert('Error adding booking.');
    }
});

// Edit booking
function editBooking(id) {
    fetch(`${bookingsApi}/${id}`)
        .then(res => res.json())
        .then(data => {
            customerInput.value = data.customer;
            driverInput.value = data.driver;
            statusInput.value = data.status;
            addBtn.textContent = "Update Booking";
            editId = id;
        });
}

// Delete booking
function deleteBooking(id) {
    if (confirm("Are you sure you want to delete this booking?")) {
        fetch(`${bookingsApi}/${id}`, { method: 'DELETE' })
            .then(() => loadBookings());
    }
}

// Reset form
function resetForm() {
    customerInput.value = '';
    driverInput.value = '';
    statusInput.value = 'Pending';
    addBtn.textContent = 'Add Booking';
    editId = null;
}

// Initial load
loadBookings();
=======
const bookingsApi = 'http://localhost:3000/bookings';
const customersApi = 'http://localhost:3000/customers';
const driversApi = 'http://localhost:3000/drivers';

const table = document.getElementById('bookingsTable');
const customerInput = document.getElementById('customer');
const driverInput = document.getElementById('driver');
const statusInput = document.getElementById('status');
const addBtn = document.getElementById('addBtn');
let editId = null;

// Load bookings
function loadBookings() {
    fetch(bookingsApi)
        .then(res => res.json())
        .then(data => {
            table.innerHTML = `
                <tr>
                    <th>Booking ID</th>
                    <th>Customer</th>
                    <th>Driver</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            `;
            data.forEach(booking => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${booking.id}</td>
                    <td>${booking.customer}</td>
                    <td>${booking.driver}</td>
                    <td>${booking.status}</td>
                    <td>
                        <button onclick="editBooking(${booking.id})">Edit</button>
                        <button onclick="deleteBooking(${booking.id})">Delete</button>
                    </td>
                `;
                table.appendChild(row);
            });
        });
}

// Add or update booking
addBtn.addEventListener('click', async () => {
    const customer = customerInput.value.trim();
    const driver = driverInput.value.trim();
    const status = statusInput.value;

    if (!customer || !driver) {
        alert('Please enter both customer and driver names.');
        return;
    }

    try {
        // 1️⃣ Ensure customer exists
        let customerData = await fetch(`${customersApi}?name=${encodeURIComponent(customer)}`)
            .then(res => res.json());
        if (customerData.length === 0) {
            await fetch(customersApi, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: customer, email: '' })
            });
        }

        // 2️⃣ Ensure driver exists
        let driverData = await fetch(`${driversApi}?name=${encodeURIComponent(driver)}`)
            .then(res => res.json());
        if (driverData.length === 0) {
            await fetch(driversApi, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: driver, car: '', rating: 0 })
            });
        }

        // 3️⃣ Add or update booking
        if (editId) {
            await fetch(`${bookingsApi}/${editId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ customer, driver, status })
            });
        } else {
            await fetch(bookingsApi, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ customer, driver, status })
            });
        }

        resetForm();
        loadBookings();
    } catch (err) {
        console.error(err);
        alert('Error adding booking.');
    }
});

// Edit booking
function editBooking(id) {
    fetch(`${bookingsApi}/${id}`)
        .then(res => res.json())
        .then(data => {
            customerInput.value = data.customer;
            driverInput.value = data.driver;
            statusInput.value = data.status;
            addBtn.textContent = "Update Booking";
            editId = id;
        });
}

// Delete booking
function deleteBooking(id) {
    if (confirm("Are you sure you want to delete this booking?")) {
        fetch(`${bookingsApi}/${id}`, { method: 'DELETE' })
            .then(() => loadBookings());
    }
}

// Reset form
function resetForm() {
    customerInput.value = '';
    driverInput.value = '';
    statusInput.value = 'Pending';
    addBtn.textContent = 'Add Booking';
    editId = null;
}

// Initial load
loadBookings();
>>>>>>> cece5bd55ac6c738b6fd3ca7caee95b80cb0baf9
