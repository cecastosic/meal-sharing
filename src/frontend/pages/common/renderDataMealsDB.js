const renderMealsData = (data) => {
    
    const mealsSection = document.getElementById("meals");

    for (let i = 0; i < data.length; i++) {
        const divTile = document.createElement("div");
        mealsSection.append(divTile);
        divTile.className = "meal-tile";
        divTile.innerHTML = `
            <img src="/public/images/meal-${data[i].id}.jpg" alt="${data[i].title}" />
        `;
        const divDetails = document.createElement("div");
        divTile.append(divDetails);
        divDetails.innerHTML = `
        <header class="meal-title">${data[i].title}</header>
        <p>${data[i].description}</p>
        <div class="info">
            <div class="price"><span>Price: </span>${data[i].price} DKK</div>
            <div class="guest-number"><span>Maximum number of guests: </span>${data[i].max_guests}</div>
            <div class="when"><span>When: </span>${new Date(data[i].when_date).toLocaleString()}</div>
        </div>
        <a href="/meals/${data[i].id}" class="meal-link"></a>
        `;
    }
}

export { renderMealsData };