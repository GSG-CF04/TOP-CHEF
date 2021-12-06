let catDrinkScroll=document.getElementsByClassName('categories-scroll') //the container for slider
let catDrink=document.getElementsByClassName('categories-drink')//the container for boxes
let catDrinkName=[] //the array to store name categories
let catDrinkLocal=[] // the array to store name,image categories in localStorage
// function to fetch name category and store in catDrinkName array to used this array 
//to fetch from another api to take first image for drink 
const fetchCategories = () => {
fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
.then(res =>res.json())
.then(
    data =>  {
        let categories=data.drinks
        categories.forEach(ele => {
            catDrinkName.push(`${ele.strCategory}`)     
        })
    localStorage.setItem('catDrinkName',JSON.stringify(catDrinkName))
    fetchFirstImageForCategory()
    }   
)
.catch(err => alert(err))
//  to fetch data from api to take first image and then store the name,image categories in localStorage
//  also call addCategories function to display the categories 
const fetchFirstImageForCategory =() => {
  let catDrinkNameLocal=JSON.parse(localStorage.getItem("catDrinkName")) || []
  for( let i=0;i<catDrinkNameLocal.length;i++) {
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${catDrinkNameLocal[i]}`)
      .then(res =>res.json())
      .then(
              dataCat =>{
              let dataDrink=dataCat.drinks
                  for (let x=0;x<1;x++) {
                         addCategories(dataDrink[0].strDrinkThumb,catDrinkNameLocal[i])
                         addToLocalStorage(dataDrink[0].strDrinkThumb,catDrinkNameLocal[i])
                  }
              }
          ) 
      .catch(err => alert(err))               
  }
  }
}

// add  name,image for each category in localStorage
const addToLocalStorage = function (image, nameCat) {
    catDrinkLocal.push({ imageSrc: image, name: nameCat });
    localStorage.setItem("categoriesDrinkLocal", JSON.stringify(catDrinkLocal));
  };
//  when reload the page check if there catDrinkLocal array is empty or not 
//if empety then call the  fetchCategories() function
//if not empty get data from localStorage and send to  addCategories function to display categories
window.onload = () => {
    let getCatLocal =JSON.parse(localStorage.getItem("categoriesDrinkLocal")) || []
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
    catDrinkScroll[0].innerHTML +=` <a class="a-catname" href="../type/typeDrink.html">${name}</a>`
    catDrink[0].innerHTML +=`<a class="drink-cat" href="../type/typeDrink.html">
    <div class="category" style="background-image: url(${imageSource})">
    <div class="overlay">
      <span>${name}</span>
    </div>
  </div>
  </a>`
  // to add click to box categoery and store the name category in localStorage
  let link=document.querySelectorAll('.drink-cat')
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
  localStorage.setItem('catDrink',name)
}