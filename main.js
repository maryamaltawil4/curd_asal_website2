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
let completedBtn =document.getElementById("completedBtn");
let UncompletedBtn =document.getElementById("UncompletedBtn");
let AllcoursesBtn =document.getElementById("AllcoursesBtn");
let values = [];
UncompletedBtn.style.display="none";
updateB.style.display="none" 
let coursesCompleted = [];
let coursesUnCompleted = [];
let courses =[];

if (localStorage.getItem('courses')){
    courses = JSON.parse(localStorage.getItem('courses'))
}
else {
 courses = []; 
}
display(courses);
var btnAdd= document.getElementById('addBtn');

btnAdd.onclick = function(e) {
    
    e.preventDefault();
    var course = {
        name: courseName.value ,
        category : courseCategory.value ,
        price  : coursePrice.value   ,
        description    : courseDescription.value ,
        IsCompleted : false 
    }
    console.log(courses)
    courses.push(course);
    clear();
    display(courses)
localStorage.setItem('courses',JSON.stringify(courses))
}

// function display( ) {
//     var data = "";
    
//     for (var i = 0 ; i < courses.length ; i++) {
//         console.log(i);
//         data += `
//      <tr>
//         <td>${i + 1}</td>
//         <td id="test${i}"> <input type="checkbox"  id="course${i}" name="course${i}" value="course${i}" class="checkbox"> </td>
//         <td>${courses[i].name}</td>
//         <td> </td>
//         <td> </td>
//         <td> </td>
//         <td>${courses[i].category}</td>
//         <td>${courses[i].price}</td>
//         <td>${courses[i].description}</td>
//         <td><button class="update-button" onclick="updateitem(${i})">Update</button></td>
//         <td><button class="delete-button" onclick="deleteitem(${i})">Delete</button></td>
//      </tr>`;
//     }

//     tableBody.innerHTML = data;
// }

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
    display(courses);
}
   
deleteBtn.onclick = function(){
    courses = [];
    localStorage.removeItem('courses')
    display(courses)
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
        display(courses);
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
//order items alphabetically by name 
sortNameDown.style.display="none";
withoutSort.style.display="none";

sortName.onclick = function(){
   sortElement = courses.slice();
   courses.sort(function (a, b) {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
      
      
      display(courses);
      sortName.style.display="none";
      sortNameDown.style.display="inline-block";

}

sortNameDown.onclick = function(){

    courses.sort(function (a, b) {
        if (a.name > b.name) {
          return -1;
        }
        if (a.name < b.name) {
          return 1;
        }
        return 0;
      });
      
      console.log(courses); 
      display(courses);

      sortNameDown.style.display= "none";

      withoutSort.style.display="inline-block";

}

withoutSort.onclick = function(){  
     courses=sortElement ;
      display(courses);
      sortName.style.display="inline-block";
      withoutSort.style.display= "none";
}




//add button completed with checkbox that will show completed
//uncompleted courses based on its status


AllcoursesBtn.onclick =function (){
   display (courses); 
}

function completed(i){

    let checkBox = document.getElementById(`course${i}`)
    if (checkBox && checkBox.checked ){

         courses[i].IsCompleted=true;
         localStorage.setItem('courses',JSON.stringify(courses))

    }
    else{
        courses[i].IsCompleted=false;
        localStorage.setItem('courses',JSON.stringify(courses))

    }
}

function completed(i, prefix) {
    let checkBox = document.getElementById(`${prefix}${i}`);
    
    if (checkBox && checkBox.checked) {
        courses[i].IsCompleted = true;
        localStorage.setItem('courses', JSON.stringify(courses));
    } else {
        courses[i].IsCompleted = false;
        localStorage.setItem('courses', JSON.stringify(courses));
    }
}




completedBtn.onclick = function() {
    let coursesCompleted = courses.filter(course => course.IsCompleted);
    display(coursesCompleted, 'completedCourse');
    completedBtn.style.display = "none";
    UncompletedBtn.style.display = "inline-block";
};


UncompletedBtn.onclick = function(){
    let uncoursesCompleted = [];
    for (let i = 0; i < courses.length; i++) {
        if (courses[i].IsCompleted==false) {
            uncoursesCompleted.push(courses[i]);
        }
        
    }
 display(uncoursesCompleted, 'uncourse');    // display(arrayDiff(courses, coursesCompleted));
         UncompletedBtn.style.display="none";
         completedBtn.style.display ="inline-block";
}


function display(courseList, prefix) {
    var data = "";

    for (var i = 0; i < courseList.length; i++) {
        data += `
     <tr>
        <td>${i + 1}</td>
        <td id="test${i}"><input type="checkbox" id="${prefix}${i}" name="${prefix}${i}" class="checkbox" onclick="completed(${i}, '${prefix}')"> </td>
        <td>${courseList[i].name}</td>
        <td> </td>
        <td> </td>
        <td> </td>
        <td>${courseList[i].category}</td>
        <td>${courseList[i].price}</td>
        <td>${courseList[i].description}</td>
        <td><button class="update-button" onclick="updateitem(${i})">Update</button></td>
        <td><button class="delete-button" onclick="deleteitem(${i})">Delete</button></td>
     </tr>`;
    }

    tableBody.innerHTML = data;

    for (var i = 0; i < courseList.length; i++) {
        let test = document.getElementById(`${prefix}${i}`);
        if (courseList[i].IsCompleted) {
            test.checked = true;
        } else {
            test.checked = false;
        }
    }


        for (var i = 0; i < courseList.length; i++) {
            if (prefix != undefined ){
            let testNone = document.getElementById(`test${i}`);
            testNone.style.display="none";
            let d_none = document.getElementById("d_none");
            d_none.style.display="none";
            }
            else{
                d_none.style.display="inline-block";

            }
        }
        

    }




