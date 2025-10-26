<<<<<<< HEAD
const customersApi = 'http://localhost:3000/customers';
const table = document.getElementById('customersTable');
const nameInput = document.getElementById('customerName');
const emailInput = document.getElementById('customerEmail');
const addBtn = document.getElementById('addCustomerBtn');
let editId = null;

// Load customers
function loadCustomers() {
    fetch(customersApi)
        .then(res => res.json())
        .then(data => {
            table.innerHTML = `
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Actions</th>
                </tr>
            `;
            data.forEach(c => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${c.id}</td>
                    <td>${c.name}</td>
                    <td>${c.email}</td>
                    <td>
                        <button onclick="editCustomer(${c.id})">Edit</button>
                        <button onclick="deleteCustomer(${c.id})">Delete</button>
                    </td>
                `;
                table.appendChild(row);
            });
        });
}

loadCustomers();

// Add / Update
addBtn.addEventListener('click', () => {
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    if (!name) { alert('Enter name'); return; }

    const method = editId ? 'PUT' : 'POST';
    const url = editId ? `${customersApi}/${editId}` : customersApi;

    fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email })
    }).then(() => { resetForm(); loadCustomers(); });
});

// Edit
function editCustomer(id) {
    fetch(`${customersApi}/${id}`)
        .then(res => res.json())
        .then(c => {
            nameInput.value = c.name;
            emailInput.value = c.email;
            addBtn.textContent = 'Update Customer';
            editId = id;
        });
}

// Delete
function deleteCustomer(id) {
    if (confirm('Delete this customer?')) {
        fetch(`${customersApi}/${id}`, { method: 'DELETE' })
            .then(() => loadCustomers());
    }
}

// Reset form
function resetForm() {
    nameInput.value = '';
    emailInput.value = '';
    addBtn.textContent = 'Add Customer';
    editId = null;
}
=======
const customersApi = 'http://localhost:3000/customers';
const table = document.getElementById('customersTable');
const nameInput = document.getElementById('customerName');
const emailInput = document.getElementById('customerEmail');
const addBtn = document.getElementById('addCustomerBtn');
let editId = null;

// Load customers
function loadCustomers() {
    fetch(customersApi)
        .then(res => res.json())
        .then(data => {
            table.innerHTML = `
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Actions</th>
                </tr>
            `;
            data.forEach(c => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${c.id}</td>
                    <td>${c.name}</td>
                    <td>${c.email}</td>
                    <td>
                        <button onclick="editCustomer(${c.id})">Edit</button>
                        <button onclick="deleteCustomer(${c.id})">Delete</button>
                    </td>
                `;
                table.appendChild(row);
            });
        });
}

loadCustomers();

// Add / Update
addBtn.addEventListener('click', () => {
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    if (!name) { alert('Enter name'); return; }

    const method = editId ? 'PUT' : 'POST';
    const url = editId ? `${customersApi}/${editId}` : customersApi;

    fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email })
    }).then(() => { resetForm(); loadCustomers(); });
});

// Edit
function editCustomer(id) {
    fetch(`${customersApi}/${id}`)
        .then(res => res.json())
        .then(c => {
            nameInput.value = c.name;
            emailInput.value = c.email;
            addBtn.textContent = 'Update Customer';
            editId = id;
        });
}

// Delete
function deleteCustomer(id) {
    if (confirm('Delete this customer?')) {
        fetch(`${customersApi}/${id}`, { method: 'DELETE' })
            .then(() => loadCustomers());
    }
}

// Reset form
function resetForm() {
    nameInput.value = '';
    emailInput.value = '';
    addBtn.textContent = 'Add Customer';
    editId = null;
}
>>>>>>> cece5bd55ac6c738b6fd3ca7caee95b80cb0baf9
