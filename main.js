var courseName = document.getElementById("courseName");
var courseCategory = document.getElementById("courseCategory");
var coursePrice = document.getElementById("coursePrice");
var courseDescription = document.getElementById("courseDescription");
var tableBody = document.getElementById("tableBody");
let buttons = document.getElementById("buttons");
let searchBtn = document.getElementById("searchbtn");
let UncompletedBtn_click = document.getElementById("UncompletedBtn");
let completedBtn_click = document.getElementById("completedBtn");
let withoutSortBtn= document.getElementById("withoutSort");
let updateB = document.getElementById("updateBtn");
let btnAdd = document.getElementById("addBtn");
let values = [];

UncompletedBtn_click.style.display = "none";
updateB.style.display = "none";
let coursesCompleted = [];
let coursesUnCompleted = [];
let courses = [];

if (localStorage.getItem("courses")) {
  courses = JSON.parse(localStorage.getItem("courses"));
} else {
  courses = [];
}
display(courses);


 function AddClick (e) {
  e.preventDefault();
  var course = {
    name: courseName.value,
    category: courseCategory.value,
    price: coursePrice.value,
    description: courseDescription.value,
    IsCompleted: false,
  };
 
  courses.push(course);
  clear();
  display(courses);
  localStorage.setItem("courses", JSON.stringify(courses));
};

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

function deleteBtn () {
  courses = [];
  localStorage.removeItem("courses");
  display(courses);
};

function updateitem(i) {
  const { name, category, price, description } = courses[i]; // object destructure
  courseName.value = name;
  courseCategory.value = category;
  coursePrice.value = price;
  courseDescription.value = description;
  

  btnAdd.style.display = "none";
  updateB.style.display = "inline-block";

  updateB.onclick = function(){
    var course = {
        name: courseName.value ,
        category : courseCategory.value ,
        price  : coursePrice.value   ,
        description    : courseDescription.value,
        IsCompleted: courses[i].IsCompleted
    
    }

    courses[i] = course;
    display(courses);
    clear();
    updateB.style.display = "none";
    btnAdd.style.display = "inline-block";
  };
}
searchBtn.onkeyup = function () {
  let key = searchBtn.value;
  let data = "";
  for (var i = 0; i < courses.length; i++) {
    if (courses[i].name.toLowerCase().includes(key.toLowerCase())) {
      data += `
    <tr>
       <td>${i + 1}</td>
       <td>${courses[i].name}</td>
       <td>${courses[i].category}</td>
       <td>${courses[i].price}</td>
       <td>${courses[i].description}</td>
       <td><button class="update-button" onclick="updateitem(${i})">Update</button></td>
       <td><button class="delete-button" onclick="deleteitem(${i})">Delete</button></td>
    </tr>`;
    }

    tableBody.innerHTML = data;
  }
};

//add button completed with checkbox that will show completed
//uncompleted courses based on its status

function AllcoursesBtn () {
  display(courses);
};

function completed(i) {
  let checkBox = document.getElementById(`${i}`); 

  courses[i].IsCompleted = checkBox.checked;
  localStorage.setItem("courses", JSON.stringify(courses)); 
}

sortNameDown.style.display="none";
withoutSortBtn.style.display="none";
sortName.style.display= "inline-block" ;

function toggleSortOrder() {
 

    if (sortName.style.display == "inline-block") {
        sortElement = courses.slice();
        courses.sort(function(a, b) {
            return a.name.localeCompare(b.name);
        });
        sortName.style.display = "none";
        sortNameDown.style.display = "inline-block";
    } else {
        courses.sort(function(a, b) {
            return b.name.localeCompare(a.name);
        });
        sortNameDown.style.display = "none";
        withoutSortBtn.style.display="inline-block";

    }

    display(courses);
}
// to display course without sort 
 function withoutSort (){  
    courses=sortElement ;
     display();
     sortName.style.display="inline-block";
     withoutSortBtn.style.display= "none";
 }
 function completedBtn () {
  let coursesCompleted = courses.filter((course) => course.IsCompleted);
  display(coursesCompleted);
  completedBtn_click.style.display = "none";
  UncompletedBtn_click.style.display = "inline-block";
};

function UncompletedBtn() {
  let uncoursesCompleted = [];
  for (let i = 0; i < courses.length; i++) {
    if (courses[i].IsCompleted == false) {
      uncoursesCompleted.push(courses[i]);
    }
  }
  display(uncoursesCompleted);
  UncompletedBtn_click.style.display = "none";
  completedBtn_click.style.display = "inline-block";
};

function display(courseList) {
  var data = "";

  for (var i = 0; i < courseList.length; i++) {
        //this line for completed /uncompleted course to have a same id for courses 
    let index = courses.indexOf(courseList[i]);
    data += `
     <tr>
        <td>${i + 1}</td>
        <td id="test${i}"><input type="checkbox" id="${index}" name="${index}" class="checkbox" onclick="completed(${index})"> </td>
        <td>${courseList[i].name}</td>
        <td> </td>
        <td> </td>
        <td> </td>
        <td>${courseList[i].category}</td>
        <td>${courseList[i].price}</td>
        <td>${courseList[i].description}</td>
        <td><button class="update-button" onclick="updateitem(${index})">Update</button></td>
        <td><button class="delete-button" onclick="deleteitem(${index})">Delete</button></td>
     </tr>`;
  }

  tableBody.innerHTML = data;

  for (var i = 0; i < courseList.length; i++) {
    let index = courses.indexOf(courseList[i]); 
    let test = document.getElementById(`${index}`); 
    if (courseList[i].IsCompleted) {
      test.checked = true;
    } else {
      test.checked = false;
    }
  }
}
