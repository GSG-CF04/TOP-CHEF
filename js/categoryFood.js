let catMeal=document.getElementsByClassName('categories-food')
let catFoodLocal=[]
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
const addToLocalStorage = function (image, nameCat) {
  catFoodLocal.push({ imageSrc: image, name: nameCat });
  localStorage.setItem("categoriesFoodLocal", JSON.stringify(catFoodLocal));
};

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
const addCategories = (imageSource, name) => {
  catMeal[0].innerHTML +=`<a class="a-cat" href="../type/typeFood.html">
      <div class="category" style="background-image: url(${imageSource})">
        <div class="overlay">
          <span>${name}</span>
        </div>
      </div>
      </a>`;
      let link=document.querySelectorAll('.a-cat')
      for (let i=0 ;i<link.length;i++){
          link[i].addEventListener('click',(e)=>{
              const nameCategory=link[i].childNodes[1].childNodes[1].childNodes[1].textContent
              localStorage.setItem('catFood',nameCategory)
          })
      }
};
