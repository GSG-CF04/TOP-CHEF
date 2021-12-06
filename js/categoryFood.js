let catMealScroll=document.getElementsByClassName('categories-scroll') //the container for slider
let catMeal=document.getElementsByClassName('categories-food') //the container for boxes
let catFoodLocal=[] // the array to store name,image categories in localStorage
//  to fetch data from api to take name,image for each category and then store in localStorage
//  also call addCategories function to display the categories 
const fetchCategories = () => {
  fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
  .then(res =>res.json())
  .then(
      data =>  {
          let categories=data.categories
          categories.forEach(ele => {
            addCategories(ele.strCategoryThumb,ele.strCategory)
            addToLocalStorage(ele.strCategoryThumb,ele.strCategory)
      })
   }   
  )
  .catch(err => alert(err))
}
// add  name,image for each category in local storage
const addToLocalStorage = function (image, nameCat) {
  catFoodLocal.push({ imageSrc: image, name: nameCat });
  localStorage.setItem("categoriesFoodLocal", JSON.stringify(catFoodLocal));
};
//  when reload the page check if there catMealLocal array is empty or not 
//if empety then call the  fetchCategories() function
//if not empty get data from localStorage and send to  addCategories function to display categories
window.onload = () => {
  let getCatLocal =JSON.parse(localStorage.getItem("categoriesFoodLocal")) || []
  if (getCatLocal.length === 0) {
    fetchCategories()
  }else {
    getCatLocal.forEach(ele => {
      addCategories(ele.imageSrc,ele.name) 
  })
}
}
// to create tag and add data in them
const addCategories = (imageSource, name) => {
  catMealScroll[0].innerHTML +=` <a class="a-catname" href="../type/typeFood.html">${name}</a>`
  catMeal[0].innerHTML +=`<a class="a-cat" href="../type/typeFood.html">
      <div class="category" style="background-image: url(${imageSource})">
        <div class="overlay">
          <span>${name}</span>
        </div>
      </div>
      </a>`;
        // to add click to box categoery and store the name category in localStorage
      let link=document.querySelectorAll('.a-cat')
      for (let i=0 ;i<link.length;i++){
          link[i].addEventListener('click',(e)=>{
              const nameCategory=link[i].childNodes[1].childNodes[1].childNodes[1].textContent
              addNameToLocal(nameCategory)
          })
      }
       // to add click  to name category and  store the name category in localStorage
      let linkName=document.querySelectorAll('.a-catname')
      for (let i=0 ;i<linkName.length;i++){
        linkName[i].addEventListener('click',(e)=>{
            const nameCategory=linkName[i].textContent
            addNameToLocal(nameCategory)
        })
    }
};
//to add name category when click in name category or box category to localStoracge
const addNameToLocal = (name) => {
  localStorage.setItem('catFood',name)
}

