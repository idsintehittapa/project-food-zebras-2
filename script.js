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
    console.log(json);
    // console.log(json.restaurants[0].restaurant.name)

    const restaurantInformation = (information) => {
      const restName = information.restaurant.name
      console.log(restName);
      const restAddress = information.restaurant.location.address
      const averageCost = information.restaurant.average_cost_for_two + " " + information.restaurant.currency
      const averageRating = information.restaurant.user_rating.aggregate_rating
      const image = information.restaurant.featured_image
      const estabType = information.restaurant.establishment[0]
      return {restName, restAddress, averageRating, averageCost, image, estabType}
    }

    const newArray = json.restaurants.map(restaurantInformation);

    console.log(newArray);
    
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
    
    


    // console.log(newArray)
    // .forEach((item, index) => {
    //   restaurants[index].querySelector('.rest-name').innerText = item.restName
    //   restaurants[index].querySelector('.rest-address').innerText = item.restAddress
    //   restaurants[index].querySelector('.rest-average-cost').innerText = item.averageCost
    //   restaurants[index].querySelector('.rest-rating').innerText = item.averageRating
      // restaurants[index].querySelector('.rest-picture').src = item.image
    // })
  // })

  

  
  
  