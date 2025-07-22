document.getElementById('add-student-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const form = e.target;
  const student = {
  name: form.name.value,
  age: form.age.value,
  class: form.class.value
};


  try {
    const res = await fetch('/api/students', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(student)
    });

    if (!res.ok) throw new Error('Failed to add student');
    
    showToast('Student added successfully!', 'success');
    form.reset();
  } catch (err) {
    showToast(err.message, 'error');
  }
});

function showToast(message, type) {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}
