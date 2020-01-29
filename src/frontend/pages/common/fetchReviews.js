const fetchReviews = (id) => {
      // render reviews
    fetch("api/reviews?mealsId=" + id)
        .then(response => response.json())
        .then(data => renderReview(data));

    const renderReview = (data) => {
        const root = document.getElementById("root");
        const reviewsSection = document.createElement("section");
        root.append(reviewsSection);
        reviewsSection.className = "reviews";
        const h3 = document.createElement("h3");
        reviewsSection.append(h3);
        h3.innerHTML = " &#8212; Reviews &#8212; "
        
        for (let i = 0; i < data.length; i++) {
            const reviewTile = document.createElement("div");
            reviewsSection.append(reviewTile);
            reviewTile.className = "review-tile";
            reviewTile.innerHTML = `
            <header class="review-title">${data[i].title}</header>
            <div class="stars"><img src="/public/images/stars-${data[i].stars}.png" alt="${data[i].stars} stars" /></div>
            <p>${data[i].description}</p>
            <div class="author">by ${data[i].created_by}</div>
            <div class="when">${new Date(data[i].created_date).toLocaleString()}</div>
            </div>
        `;
        }
    }
}

export { fetchReviews };