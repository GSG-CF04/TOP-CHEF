let catMeal=document.getElementsByClassName('categories-food')
fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
.then(res =>res.json())
.then(
    data =>  {
        let categories=data.categories
        categories.forEach(ele => {
            catMeal[0].innerHTML +=`<a class="a-cat" href="../type/typeFood.html">
            <div class="category" style="background-image: url(${ele.strCategoryThumb})">
              <div class="overlay">
                <span>${ele.strCategory}</span>
              </div>
            </div>
            </a>`     
    })
    let link=document.querySelectorAll('.a-cat')
    for (let i=0 ;i<link.length;i++){
        link[i].addEventListener('click',(e)=>{
            const nameCategory=link[i].childNodes[1].childNodes[1].childNodes[1].textContent
            localStorage.setItem('catFood',nameCategory)
        })
    }
 }   
)
.catch(err => alert(err))