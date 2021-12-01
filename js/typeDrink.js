let head=document.getElementById('name-category')
let cat=localStorage.getItem('catDrink')
head.textContent=cat + ' Category' 

let typeDrink=document.getElementsByClassName('cards-drink')
fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${cat}`)
.then(res =>res.json())
.then(
    data =>  {
        let drinks=data.drinks
        drinks.forEach(drink => {
            typeDrink[0].innerHTML +=`<div class="card">
            <img src="${drink.strDrinkThumb}" alt="food">
            <p>${drink.strDrink}</p>
            <button class="get-recipe" onclick="getRecipeAndIngradiant(${drink.idDrink})">Get Recipe</button>
            </div>
            `   
        })
    }
)
.catch(err => alert(err))