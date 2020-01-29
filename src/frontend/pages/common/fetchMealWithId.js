const fetchMealWithId = (id) => {
    
    fetch("/api/meals/" + id)
        .then(response => response.json())
        .then(data => renderData(data));

  // render specific meal from db
  const renderData = (data) => {
    const root = document.getElementById("root");
    const mealsSection = document.createElement("section");
    root.append(mealsSection);
    mealsSection.className = "meals";
    mealsSection.classList.add("meal-id");    
    const divTile = document.createElement("div");
    mealsSection.append(divTile);
    divTile.className = "meal-tile";
    divTile.innerHTML = `
        <img src="/public/images/meal-${id}.jpg" alt="${data[0].title}" />
    `;
    const divDetails = document.createElement("div");
    divTile.append(divDetails);

    divDetails.innerHTML = `
        <header class="meal-title">${data[0].title}</header>
        <p>${data[0].description}</p>
        <div class="info">
        <div class="price"><span>Price: </span>${data[0].price} DKK</div>
        <div class="guest-number"><span>Maximum number of guests: </span><span id="max-guests-number">${data[0].max_guests}</span></div>
        <div class="when"><span>When: </span>${new Date(data[0].when_date).toLocaleString()}</div>
        </div>
    `;
  } 
}

export { fetchMealWithId };