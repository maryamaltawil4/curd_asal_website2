var courseName = document.getElementById("courseName");
var courseCategory = document.getElementById('courseCategory');
var coursePrice = document.getElementById('coursePrice');
var courseDescription = document.getElementById('courseDescription');
var tableBody = document.getElementById('tableBody');
let deleteBtn = document.getElementById('deleteBtn');
let buttons = document.getElementById('buttons');
let searchBtn =document.getElementById('searchbtn');
let updateB = document.getElementById('updateB');
let sortName = document.getElementById("sortName");
let sortNameDown = document.getElementById("sortNameDown");
let withoutSort = document.getElementById("withoutSort");

updateB.style.display="none" 
let courses =[];
if (localStorage.getItem('courses')){
    courses = JSON.parse(localStorage.getItem('courses'))
}
else {
 courses = []; 
}
display();
var btnAdd= document.getElementById('addBtn');

btnAdd.onclick = function(e) {
    
    e.preventDefault();
    var course = {
        name: courseName.value ,
        category : courseCategory.value ,
        price  : coursePrice.value   ,
        description    : courseDescription.value
    }
    courses.push(course);
    clear();
    display()
localStorage.setItem('courses',JSON.stringify(courses))
}

function display() {
    var data = "";
    
    for (var i = 0 ; i < courses.length ; i++) {
        data += `
     <tr>
        <td>${i + 1}</td>
        <td>${courses[i].name}</td>
        <td> </td>
        <td> </td>
        <td> </td>
        <td>${courses[i].category}</td>
        <td>${courses[i].price}</td>
        <td>${courses[i].description}</td>
        <td><button class="update-button" onclick="updateitem(${i})">Update</button></td>
        <td><button class="delete-button" onclick="deleteitem(${i})">Delete</button></td>
     </tr>`;
    }

    tableBody.innerHTML = data;
}

function clear() {
    courseName.value ="";
    courseCategory.value =""
    coursePrice.value =" "
    courseDescription.value = ""
    
}
// delete button
function deleteitem(i){
    courses.splice(i, 1)
    localStorage.setItem('courses',JSON.stringify(courses))
    display();
}
   
deleteBtn.onclick = function(){
    courses = [];
    localStorage.removeItem('courses')
    display()
}

function updateitem(i){
    const { name, category, price, description } = courses[i]; // object destructure
    courseName.value = name;
    courseCategory.value= category;
    coursePrice.value = price;
    courseDescription.value = description;
    btnAdd.style.display="none";
    updateB.style.display="inline-block" 

    updateB.onclick = function(){
        var course = {
            name: courseName.value ,
            category : courseCategory.value ,
            price  : coursePrice.value   ,
            description    : courseDescription.value
        }
        
        courses[i]=course;
        display();
        clear();
        updateB.style.display="none";
        btnAdd.style.display="inline-block";
    }

}
searchBtn.onkeyup = function(){
let key = searchBtn.value;
let data =""
for (var i = 0 ; i < courses.length ; i++) {
   if (courses[i].name.toLowerCase().includes(key.toLowerCase()))
   {
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
}

sortNameDown.style.display="none";
withoutSort.style.display="none";
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
        withoutSort.style.display="inline-block";

    }

    display();
}
// to display course without sort 
withoutSort.onclick = function(){  
    courses=sortElement ;
     display();
     sortName.style.display="inline-block";
     withoutSort.style.display= "none";
}
