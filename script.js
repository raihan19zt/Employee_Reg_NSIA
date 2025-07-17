const form = document.getElementById("employeeForm");

function getEmployees() {
  return JSON.parse(localStorage.getItem("employees") || "[]");
}

function saveEmployees(employees) {
  localStorage.setItem("employees", JSON.stringify(employees));
}

function displayEmployees(filteredList = null) {
  const employees = filteredList || getEmployees();
  const tbody = document.querySelector("#employeeTable tbody");
  tbody.innerHTML = "";
  employees.forEach((emp, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${emp.firstName}</td>
      <td>${emp.lastName}</td>
      <td>${emp.department}</td>
      <td>${emp.email}</td>
      <td>${emp.phone}</td>
      <td>
        <button class="edit-btn" onclick="editEmployee(${index})">Edit</button>
        <button class="delete-btn" onclick="deleteEmployee(${index})">Delete</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

form.onsubmit = function (e) {
  e.preventDefault();
  const employees = getEmployees();
  const id = document.getElementById("empId").value;

  const newEmp = {
    firstName: form.firstName.value.trim(),
    lastName: form.lastName.value.trim(),
    department: form.department.value.trim(),
    email: form.email.value.trim(),
    phone: form.phone.value.trim(),
  };

  if (id) {
    employees[parseInt(id)] = newEmp;
  } else {
    employees.push(newEmp);
  }

  saveEmployees(employees);
  displayEmployees();
  form.reset();
  document.getElementById("empId").value = "";
};

function editEmployee(index) {
  const emp = getEmployees()[index];
  document.getElementById("empId").value = index;
  form.firstName.value = emp.firstName;
  form.lastName.value = emp.lastName;
  form.department.value = emp.department;
  form.email.value = emp.email;
  form.phone.value = emp.phone;
}

function deleteEmployee(index) {
  if (confirm("Are you sure you want to delete this employee?")) {
    const employees = getEmployees();
    employees.splice(index, 1);
    saveEmployees(employees);
    displayEmployees();
  }
}

document.getElementById("searchInput").addEventListener("input", function () {
  const term = this.value.toLowerCase();
  const employees = getEmployees();
  const filtered = employees.filter(
    (emp) =>
      emp.firstName.toLowerCase().includes(term) ||
      emp.lastName.toLowerCase().includes(term) ||
      emp.email.toLowerCase().includes(term) ||
      emp.phone.includes(term)
  );
  displayEmployees(filtered);
});

function sortEmployees(key) {
  const employees = getEmployees();
  employees.sort((a, b) => a[key].localeCompare(b[key]));
  saveEmployees(employees);
  displayEmployees();
}

function printEmployees() {
  window.print();
}

window.onload = displayEmployees;
