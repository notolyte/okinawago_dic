let entries, entries2;
async function readFile() {
    const requestURL =
        "https://raw.githubusercontent.com/notolyte/okinawago_dic/beta/okinawa_hondo.json";
    const request = new Request(requestURL);

    const response = await fetch(request);
    entries = await response.json();
    const requestURL2 = "https://raw.githubusercontent.com/notolyte/okinawago_dic/beta/hondo_okinawa.json";
    const request2 = new Request(requestURL2);
    const response2 = await fetch(request2);
    entries2 = await response2.json();
}
document.getElementById("searchbutton").addEventListener("click", () => {
    let keyword = document.forms.search.field.value;
    const correpondences = [["?", "ʔ"], ["Q", "ꞯ"], ["N", "ɴ"], ["S", "ş"], ["Z", "z̧"], ["C", "ç"]];
    correpondences.forEach(cor => {
        keyword = keyword.replaceAll(cor[0], cor[1]);
    })
    search(keyword);
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
    });
    entries2.words.forEach(word => {
        if (word["entry"]["form"] == keyword) {
            results.appendChild(drawCard2(word["entry"]["id"]));
            history.prepend(drawCard2(word["entry"]["id"]));
        }
    });
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
function drawCard2(id) {
    const newCard = document.createElement("div");
    const word = entries2["words"][id - 1];
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