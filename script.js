let entries, entries2, vowelEscape = 0;
async function readFile() {
    const requestURL =
        "https://raw.githubusercontent.com/notolyte/okinawago_dic/main/okinawa_hondo.json";
    const request = new Request(requestURL);

    const response = await fetch(request);
    entries = await response.json();
    const requestURL2 = "https://raw.githubusercontent.com/notolyte/okinawago_dic/main/hondo_okinawa.json";
    const request2 = new Request(requestURL2);
    const response2 = await fetch(request2);
    entries2 = await response2.json();
}
document.getElementById("searchbutton").addEventListener("click", () => {
    let keyword = document.forms.search.field.value;
    const correpondences = [["?", "ʔ"], ["Q", "ꞯ"], ["q", "ꞯ"], ["N", "ɴ"], ["S", "ş"], ["Z", "z̧"], ["C", "ç"]];
    correpondences.forEach(cor => {
        keyword = keyword.replaceAll(cor[0], cor[1]);
    })
    keyword = keyword.replace(/n([^aeiouj])/g, "ɴ$1");
    keyword = keyword.replace(/n$/g, "ɴ");
    search(keyword);
});
function search(keyword) {
    let count = 0;
    const results = document.getElementById("result");
    const history = document.getElementById("history");
    if (!vowelEscape) { results.innerHTML = ""; }
    document.querySelectorAll("#history div").forEach(item => {
        item.classList.remove("now");
    });

    entries.words.forEach(word => {
        let record = word["entry"]["form"];
        if (document.forms.search.sczFazzy.checked) {
            const correpondences = [["ş", "s"], ["z̧", "z"], ["c", "ç"]];
            correpondences.forEach(cor => {
                record = record.replaceAll(cor[0], cor[1]);
                keyword = keyword.replaceAll(cor[0], cor[1]);
            })
        }
        if (document.forms.search.glottalFazzy.checked) {
            const correpondences = [["'", ""], ["ʔ", ""]];
            correpondences.forEach(cor => {
                record = record.replaceAll(cor[0], cor[1]);
                keyword = keyword.replaceAll(cor[0], cor[1]);
            })
        }
        if (record == keyword) {
            results.appendChild(drawCard(word["entry"]["id"]));
            history.prepend(drawCard(word["entry"]["id"]));
            count++;
        }
    });
    entries2.words.forEach(word => {
        if (word["entry"]["form"] == keyword) {
            results.appendChild(drawCard2(word["entry"]["id"]));
            history.prepend(drawCard2(word["entry"]["id"]));
            count++;
        }
    });
    if (!count && !vowelEscape) { results.innerText = "見つかりませんでした"; }
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