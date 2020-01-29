const renderHeroMeals = () => {
    const root = document.getElementById("root");
    const heroSectionMeals = document.createElement("section");
    root.append(heroSectionMeals);

    heroSectionMeals.innerHTML = `
        <h2>Discover home cooking in Copenhagen</h2>
    `;
    heroSectionMeals.classList = "hero-meals";
}

export { renderHeroMeals };