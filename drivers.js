const driversApi = 'http://localhost:3000/drivers';
const bookingsApi = 'http://localhost:3000/bookings';
const table = document.getElementById('driversTable');
const driverNameInput = document.getElementById('driverName');
const addBtn = document.getElementById('addDriverBtn');
let editId = null;

// Load drivers along with their booking counts
async function loadDrivers() {
    try {
        const [driversRes, bookingsRes] = await Promise.all([
            fetch(driversApi),
            fetch(bookingsApi)
        ]);
        const drivers = await driversRes.json();
        const bookings = await bookingsRes.json();

        table.innerHTML = `
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Bookings</th>
                <th>Actions</th>
            </tr>
        `;

        drivers.forEach(d => {
            const bookingCount = bookings.filter(b => b.driverId === d.id).length;
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${d.id}</td>
                <td>${d.name}</td>
                <td>${bookingCount}</td>
                <td>
                    <button onclick="editDriver(${d.id})">Edit</button>
                    <button onclick="deleteDriver(${d.id})">Delete</button>
                </td>
            `;
            table.appendChild(row);
        });
    } catch (err) {
        console.error('Error loading drivers:', err);
    }
}

loadDrivers();

// Add / Update
addBtn.addEventListener('click', async () => {
    const name = driverNameInput.value.trim();
    if (!name) { alert('Enter name'); return; }

    const method = editId ? 'PUT' : 'POST';
    const url = editId ? `${driversApi}/${editId}` : driversApi;

    await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
    });
    resetForm();
    loadDrivers();
});

// Edit
async function editDriver(id) {
    const res = await fetch(`${driversApi}/${id}`);
    const d = await res.json();
    driverNameInput.value = d.name;
    addBtn.textContent = 'Update Driver';
    editId = id;
}

// Delete
async function deleteDriver(id) {
    if (confirm('Delete this driver?')) {
        await fetch(`${driversApi}/${id}`, { method: 'DELETE' });
        loadDrivers();
    }
}

// Reset form
function resetForm() {
    driverNameInput.value = '';
    addBtn.textContent = 'Add Driver';
    editId = null;
}
