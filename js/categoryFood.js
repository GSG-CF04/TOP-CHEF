let catMeal=document.getElementsByClassName('categories-food')
fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
.then(res =>res.json())
.then(
    data =>  {
        let categories=data.categories
        console .log(categories)     
   
 }   
)
.catch(err => alert(err))