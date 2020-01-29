const renderSearch = () => {
    const root = document.getElementById("root");
    const section = document.createElement("section");
    root.append(section);
    section.classList= "search-section";

    section.innerHTML = `
        <form>
            <input id="search" name="title" type="text" placeholder="Search for a meal" />
        </form>
    `;
}

export { renderSearch };