// Get elements
const form = document.getElementById("studentForm");
const table = document.getElementById("studentTable");

const studentIdInput = document.getElementById("studentId");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const courseInput = document.getElementById("course");
const mobileInput = document.getElementById("mobile");
const indexInput = document.getElementById("index");

// Load data
let students = JSON.parse(localStorage.getItem("students")) || [];

// Validation
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidMobile(mobile) {
  return /^\d{10}$/.test(mobile);
}

// Render table
function renderTable() {
  table.innerHTML = "";

  students.forEach((s, i) => {
    table.innerHTML += `
      <tr>
        <td>${s.studentId}</td>
        <td>${s.name}</td>
        <td>${s.email}</td>
        <td>${s.course}</td>
        <td>${s.mobile}</td>
        <td>
          <button class="edit" onclick="editStudent(${i})">Edit</button>
          <button class="delete" onclick="deleteStudent(${i})">Delete</button>
        </td>
      </tr>
    `;
  });

  localStorage.setItem("students", JSON.stringify(students));
}

// Add / Update student
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const student = {
    studentId: studentIdInput.value.trim(),
    name: nameInput.value.trim(),
    email: emailInput.value.trim(),
    course: courseInput.value.trim(),
    mobile: mobileInput.value.trim()
  };

  if (!isValidEmail(student.email)) {
    alert("Invalid email format");
    return;
  }

  if (!isValidMobile(student.mobile)) {
    alert("Mobile number must be 10 digits");
    return;
  }

  if (indexInput.value === "") {
    // ADD
    students.push(student);
  } else {
    // UPDATE
    students[indexInput.value] = student;
    indexInput.value = "";
  }

  form.reset();
  renderTable();
});

// EDIT student (loads data into form)
function editStudent(i) {
  const s = students[i];

  studentIdInput.value = s.studentId;
  nameInput.value = s.name;
  emailInput.value = s.email;
  courseInput.value = s.course;
  mobileInput.value = s.mobile;

  indexInput.value = i; // store index for update
}

// DELETE student
function deleteStudent(i) {
  if (confirm("Delete this student?")) {
    students.splice(i, 1);
    renderTable();
  }
}

// Initial load
renderTable();
