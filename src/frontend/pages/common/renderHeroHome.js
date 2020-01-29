const renderHero = () => {
    const root = document.getElementById("root");
    const heroSection = document.createElement("section");
    root.append(heroSection);

    heroSection.innerHTML = `
        <h1>Are you hungry?</h1>
        <h2>Choose a meal you want to join</h2>
    `;
    heroSection.classList = "hero";
}

export { renderHero };