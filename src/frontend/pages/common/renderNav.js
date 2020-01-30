const renderNav = () => {
    const root = document.getElementById("root");
    const nav = document.createElement("nav");
    root.append(nav);

    nav.innerHTML = `
        <a href="/" class="logo">MealSharing <span>by Svetlana</span></a>
        <ul>
            <li><a href="/" />Home</li>
            <li>|</li>
            <li><a href="/meals" />Meals</li>
        </ul>
    `;
    nav.classList = "main-nav";
}

export { renderNav };