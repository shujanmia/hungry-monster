


document.getElementById('search-btn').addEventListener('click', searchClick =>{

    let searchValue = document.getElementById('search-meal-input');
    //console.log(searchValue.value);
    let meals = document.getElementById("meals");
    meals.innerHTML = ""
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue.value}`)
    .then(res => res.json())
    .then(data => {
        //console.log(data);

        if(data.meals == null){
            alert("NO Meal Found");
        }
        else
        data.meals.forEach(meal => {
            let mealShow =`
            <div class="card" style="width:100%; background-color: #F8F7F5">
                <img class="card-img-top" src="${meal.strMealThumb}" alt="${meal.strMeal}" style="width:100%">
                <div class="card-body">
                <h4 class="card-title text-center" style="font-weight: 700">${meal.strMeal}</h4>
                </div>
            </div>
            `;
            // console.log(meals);
            //console.log(mealInfo)
            let food = document.createElement("div")
            food.setAttribute("class", "col-md-3 mb-5 m-auto")
            food.innerHTML = mealShow;

            meals.appendChild(food);
            food.addEventListener("click",()=>{
                let mealInfo = `
                <div class="row bg-light border border-secondary rounded" style="--bs-gutter-x: 0;">
                    <div class="col-md-4 " style="">
                        <img class="img-top" src="${meal.strMealThumb}" alt="${meal.strMeal}" style="width:100%">
                        </div>
                        <div class="col-md-8" style="padding-left: 15px; padding-top: 10px">
                        <h3 class="card-title" style="font-weight: 700">${meal.strMeal}</h3>
                        <b>Ingredients:</b>
                        <ul>`;
                    for(let i = 1; i <= 20; i++){
                        let str = "strIngredient"+i;
                        if( meal[str] == "" ) break;
                        mealInfo += `<li>`;
                        mealInfo += meal[str]
                        mealInfo +=` </li>`
                    }
                        
                mealInfo += `  
                        </ul>
                        
                    </div>
                    </div>
                `;
                const singleMeal = document.getElementById("single_meal");
                singleMeal.innerHTML = mealInfo;

            })
            
        });

    });
})
