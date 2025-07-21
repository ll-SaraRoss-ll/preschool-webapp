const API_URL = '/api/students/';
const tableBody = document.querySelector('#studentTable tbody');
const statusMessage = document.getElementById('statusMessage');
const searchInput = document.getElementById('searchInput');
const sortSelect = document.getElementById('sortSelect');

let students = [];  // full list

// 1. Fetch students and handle loading/errors
async function loadStudents() {
  statusMessage.classList.remove('d-none');
  statusMessage.textContent = 'Loading students…';

  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error(`Server error: ${res.status}`);
    const result = await res.json();
    students = Array.isArray(result.data) ? result.data : [];
    renderTable(students);
  } catch (err) {
    statusMessage.textContent = `Error loading data: ${err.message}`;
  }
}

// 2. Render rows (with filter/sort applied)
function renderTable(list) {
  statusMessage.classList.add('d-none');
  tableBody.innerHTML = '';

  if (list.length === 0) {
    statusMessage.classList.remove('d-none');
    statusMessage.textContent = 'No students found.';
    return;
  }

  list.forEach(s => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${s._id}</td>
      <td>${s.name}</td>
      <td>${s.age}</td>
      <td>${s.class}</td>
      <td>${new Date(s.enrolledAt).toLocaleDateString(undefined, {
        year: 'numeric', month: 'long', day: 'numeric'
      })}</td>
      <td>
        <button class="btn btn-sm btn-primary me-1" data-id="${s._id}" onclick="handleEdit(this)">Edit</button>
        <button class="btn btn-sm btn-danger" data-id="${s._id}" onclick="handleDelete(this)">Delete</button>
      </td>
    `;
    tableBody.append(row);
  });
}

// 3. Search & Sort
function applyFilters() {
  const q = searchInput.value.toLowerCase();
  let filtered = students.filter(s =>
    s.name.toLowerCase().includes(q) || s._id.includes(q)
  );

  const [field, dir] = sortSelect.value.split('-');
  filtered.sort((a, b) => {
    let av = field === 'date' ? new Date(a.enrolledAt) : a[field];
    let bv = field === 'date' ? new Date(b.enrolledAt) : b[field];
    return dir === 'asc' ? av > bv ? 1 : -1 : av < bv ? 1 : -1;
  });

  renderTable(filtered);
}

// 4. Edit/Delete handlers (stubs)
function handleEdit(btn) {
  const id = btn.getAttribute('data-id');
  // TODO: load student data into a form for editing
  alert(`Edit student with ID: ${id}`);
}

function handleDelete(btn) {
  const id = btn.getAttribute('data-id');
  // TODO: call DELETE /api/students/:id then reload list
  if (confirm('Delete this student?')) {
    fetch(`${API_URL}${id}`, { method: 'DELETE' })
      .then(_ => loadStudents())
      .catch(err => alert('Delete failed: ' + err.message));
  }
}

// Event listeners
searchInput.addEventListener('input', applyFilters);
sortSelect.addEventListener('change', applyFilters);

// Initialize
loadStudents();
