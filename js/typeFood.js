let head=document.getElementById('name-category')
let cat=localStorage.getItem('catFood')
head.textContent=cat + ' Category' 

let typeFood=document.getElementsByClassName('cards-food')
fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat}`)
.then(res =>res.json())
.then(
    data =>  {
        let meals=data.meals
        meals.forEach(meal => {
            typeFood[0].innerHTML +=`<div class="card">
            <img src="${meal.strMealThumb}" alt="food">
            <p>${meal.strMeal}</p>
            <button class="get-recipe" onclick="getRecipeAndIngradiant(${meal.idMeal})">Get Recipe</button>
            </div>
            `   
        })
  
    }
)
.catch(err => alert(err))