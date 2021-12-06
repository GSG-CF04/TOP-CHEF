let catDrinkScroll=document.getElementsByClassName('categories-scroll')
let catDrink=document.getElementsByClassName('categories-drink')
let catDrinkName=[]
let catDrinkLocal=[]
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


const addToLocalStorage = function (image, nameCat) {
    catDrinkLocal.push({ imageSrc: image, name: nameCat });
    localStorage.setItem("categoriesDrinkLocal", JSON.stringify(catDrinkLocal));
  };
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
  const addCategories = (imageSource, name) => {
    catDrinkScroll[0].innerHTML +=` <a class="a-catname" href="../type/typeDrink.html">${name}</a>`
    catDrink[0].innerHTML +=`<a class="drink-cat" href="../type/typeDrink.html">
    <div class="category" style="background-image: url(${imageSource})">
    <div class="overlay">
      <span>${name}</span>
    </div>
  </div>
  </a>`
  let link=document.querySelectorAll('.drink-cat')
  for (let i=0 ;i<link.length;i++){
      link[i].addEventListener('click',(e)=>{
          const nameCategory=link[i].childNodes[1].childNodes[1].childNodes[1].textContent
          addNameToLocal(nameCategory)
      })
  }
  let linkName=document.querySelectorAll('.a-catname')
  for (let i=0 ;i<linkName.length;i++){
    linkName[i].addEventListener('click',(e)=>{
        const nameCategory=linkName[i].textContent
        addNameToLocal(nameCategory)
    })
  }
};
const addNameToLocal = (name) => {
  localStorage.setItem('catDrink',name)
}