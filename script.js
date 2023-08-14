let entries;
async function readFile() {
    const requestURL =
        "https://raw.githubusercontent.com/notolyte/okinawago_dic/main/okinawa_hondo.json";
    const request = new Request(requestURL);

    const response = await fetch(request);
    entries = await response.json();
}
document.getElementById("searchbutton").addEventListener("click", () => {
    search(document.forms.search.field.value);
});
function search(keyword) {
    const results = document.getElementById("result");
    const history = document.getElementById("history");
    results.innerHTML = "";
    document.querySelectorAll("#history div").forEach(item => {
        item.classList.remove("now");
    });
    entries.words.forEach(word => {
        if (word["entry"]["form"] == keyword) {
            results.appendChild(drawCard(word["entry"]["id"]));
            history.prepend(drawCard(word["entry"]["id"]));
        }
    })
}
function drawCard(id) {
    const newCard = document.createElement("div");
    const word = entries["words"][id - 1];
    newCard.innerHTML
        = "<h3 class='midasi'>" + word["contents"][0]["text"] + "</h3>"
        + "<p class='midasi'>" + word["translations"][0]["title"] + "</p>";
    word["translations"].forEach(definition => {
        const thisDef = definition["forms"][0].replaceAll(",", "，");
        newCard.innerHTML += "<p>" + thisDef + "</p>";
    })
    newCard.classList.add("table");
    newCard.classList.add("now");
    return newCard;
}