var courseName = document.getElementById("courseName");
var courseCategory = document.getElementById("courseCategory");
var coursePrice = document.getElementById("coursePrice");
var courseDescription = document.getElementById("courseDescription");
var tableBody = document.getElementById("tableBody");
let buttons = document.getElementById("buttons");
let searchBtn = document.getElementById("searchbtn");
let UncompletedBtn_click = document.getElementById("UncompletedBtn");
let completedBtn_click = document.getElementById("completedBtn");
let withoutSortBtn = document.getElementById("withoutSort");
let updateB = document.getElementById("updateBtn");
let btnAdd = document.getElementById("addBtn");
let values = [];

UncompletedBtn_click.style.display = "none";
updateB.style.display = "none";

let courses = [];

if (localStorage.getItem("courses")) {
  courses = JSON.parse(localStorage.getItem("courses"));
} else {
  courses = [];
}
display(courses);

function addClick(e) {
  e.preventDefault();
  var course = {
    name: courseName.value,
    category: courseCategory.value,
    price: coursePrice.value,
    description: courseDescription.value,
    isCompleted: false,
  };

  courses.push(course);
  clear();
  display(courses);
  localStorage.setItem("courses", JSON.stringify(courses));
}

function clear() {
  courseName.value = "";
  courseCategory.value = "";
  coursePrice.value = " ";
  courseDescription.value = "";
}

// delete button
function deleteitem(i) {
  courses.splice(i, 1);
  localStorage.setItem("courses", JSON.stringify(courses));
  display(courses);
}

function deleteBtn() {
  courses = [];
  localStorage.removeItem("courses");
  display(courses);
}

function updateitem(i) {
  const { name, category, price, description } = courses[i]; // object destructure
  courseName.value = name;
  courseCategory.value = category;
  coursePrice.value = price;
  courseDescription.value = description;

  btnAdd.style.display = "none";
  updateB.style.display = "inline-block";

  updateB.onclick = function () {
    var course = {
      name: courseName.value,
      category: courseCategory.value,
      price: coursePrice.value,
      description: courseDescription.value,
      isCompleted: courses[i].isCompleted,
    };

    courses[i] = course;
    display(courses);
    clear();
    updateB.style.display = "none";
    btnAdd.style.display = "inline-block";
  };
}
//add button completed with checkbox that will show completed
//uncompleted courses based on its status

function AllcoursesBtn() {
  display(courses);
}

function completed(i) {
  let checkBox = document.getElementById(`${i}`);

  courses[i].isCompleted = checkBox.checked;
  localStorage.setItem("courses", JSON.stringify(courses));
}

sortNameDown.style.display = "none";
withoutSortBtn.style.display = "none";
sortName.style.display = "inline-block";

function toggleSortOrder() {
  if (sortName.style.display == "inline-block") {
    sortElement = courses.slice();
    courses.sort(function (a, b) {
      return a.name.localeCompare(b.name);
    });
    sortName.style.display = "none";
    sortNameDown.style.display = "inline-block";
  } else {
    courses.sort(function (a, b) {
      return b.name.localeCompare(a.name);
    });
    sortNameDown.style.display = "none";
    withoutSortBtn.style.display = "inline-block";
  }

  display(courses);
}
// to display course without sort
function withoutSort() {
  courses = sortElement;
  display(courses);
  sortName.style.display = "inline-block";
  withoutSortBtn.style.display = "none";
}
function completedBtn() {
  let coursesCompleted = courses.filter((course) => course.isCompleted);
  display(coursesCompleted);
  completedBtn_click.style.display = "none";
  UncompletedBtn_click.style.display = "inline-block";
}

function UncompletedBtn() {
  let uncoursesCompleted = [];
  for (let i = 0; i < courses.length; i++) {
    if (courses[i].isCompleted == false) {
      uncoursesCompleted.push(courses[i]);
    }
  }
  display(uncoursesCompleted);
  UncompletedBtn_click.style.display = "none";
  completedBtn_click.style.display = "inline-block";
}

// Function to generate HTML for a table row
function generateTableRow(index, course, isChecked) {
  return `
    <tr>
       <td>${index + 1}</td>
       <td id="test${index}">
       <input type="checkbox" id="${index}" ${isChecked} name="${index}" class="checkbox" onclick="completed(${index})"> </td>
       <td>${course.name}</td>
       <td> </td>
       <td> </td>
       <td> </td>
       <td>${course.category}</td>
       <td>${course.price}</td>
       <td>${course.description}</td>
       <td><button class="update-button" onclick="updateitem(${index})">Update</button></td>
       <td><button class="delete-button" onclick="deleteitem(${index})">Delete</button></td>
    </tr>`;
}

// Function to display course data
function display(courseList) {
  let data = "";

  for (let i = 0; i < courseList.length; i++) {
    const course = courseList[i];
    const index = courses.indexOf(course);
    const isChecked = course.isCompleted ? "checked" : "";

    data += generateTableRow(index, course, isChecked);
  }

  tableBody.innerHTML = data;
}

searchBtn.onkeyup = function () {
  const key = searchBtn.value;
  let data = "";

  for (let i = 0; i < courses.length; i++) {
    const course = courses[i];

    if (course.name.toLowerCase().includes(key.toLowerCase())) {
      const isChecked = course.isCompleted ? "checked" : "";
      data += generateTableRow(i, course, isChecked);
    }
  }

  tableBody.innerHTML = data;
};
