// const restaurants = document.getElementsByClassName('restaurants-container');
const apiData = `https://developers.zomato.com/api/v2.1/search?entity_id=109&entity_type=city&cuisines=143`
const apiKey = `cbcee325a3269e2c9a64a70beb91d113`
//Header
const request = new Request(apiData, {
  headers: new Headers({
    Accept: 'application/json',
    'user-key': apiKey
  })
})

fetch(request)
  .then((response) => {
    return response.json()
  })
  .then((json) => {

    const restaurantInformation = (information) => {
      const restName = information.restaurant.name
      const restAddress = information.restaurant.location.address
      const averageCost = information.restaurant.average_cost_for_two + " " + information.restaurant.currency
      const cost = information.restaurant.average_cost_for_two
      const averageRating = information.restaurant.user_rating.aggregate_rating
      const image = information.restaurant.featured_image
      const estabType = information.restaurant.establishment[0]
      return {restName, restAddress, averageRating, averageCost, image, estabType, cost}
    }
    const newArray = json.restaurants.map(restaurantInformation);
    document.getElementById('priceSorting').addEventListener('change', (event) => {
      let sortOrder = document.getElementById('priceSorting').value 
      sortByPrice(newArray, sortOrder);
      let restaurantHTML = "";
      newArray.forEach((item) => {
        restaurantHTML += `<div>`;
        restaurantHTML += `<img class="restroImage" src="${item.image}">`;
        restaurantHTML += `<h3>${item.restName}</h3>`;
        restaurantHTML += `<p>${item.restAddress}</h3>`;
        restaurantHTML += `<p>Average cost pp ${item.averageCost}</p>`;
        restaurantHTML += `<p>${item.estabType}</p>`;
        restaurantHTML += `<p>${item.averageRating} &#9733;</p>`;
        restaurantHTML += `</div>`;
      })
      document.getElementById('restaurantsContainer').innerHTML = restaurantHTML;
    })
    

    // price sorting function
    const sortByPrice = (newArray, sortOrder) => {
      console.log(sortOrder)
      if (sortOrder === "low to high") {
       (newArray.sort(function (a, b) {
          return a.cost - b.cost;
        })
       )
      } else if (sortOrder === "high to low") {
        newArray.sort(function (a, b) {
          return b.cost - a.cost;
        })
      }
    }
    
  let restaurantHTML = "";
      newArray.forEach((item) => {
        restaurantHTML += `<div>`;
        restaurantHTML += `<img class="restroImage" src="${item.image}">`;
        restaurantHTML += `<h3>${item.restName}</h3>`;
        restaurantHTML += `<p>${item.restAddress}</h3>`;
        restaurantHTML += `<p>Average cost pp ${item.averageCost}</p>`;
        restaurantHTML += `<p>${item.estabType}</p>`;
        restaurantHTML += `<p>${item.averageRating} &#9733;</p>`;
        restaurantHTML += `</div>`;
      })
      document.getElementById('restaurantsContainer').innerHTML = restaurantHTML;
    
  })