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
        item.classList.remove("tmp_none");
    });
    entries.words.forEach(word => {
        if (word["entry"]["form"] == keyword) {
            const newResult = document.createElement("div");
            newResult.classList.add("table");
            let resultHTML = "";
            const newHistory = document.createElement("div");
            newHistory.classList.add("table");
            let newHistoryHTML = "";
            resultHTML += "<h3>" + keyword + "</h3>";
            newHistoryHTML += "<h3>" + keyword + "</h3>";
            resultHTML += "<h3>語義</h3>"
            word["translations"].forEach(definition => {
                const thisDef = definition["forms"][0].replaceAll(",", "，");
                resultHTML += "<p>" + thisDef + "</p>";
                newHistoryHTML += "<p>" + thisDef + "</p>";
            })
            resultHTML += "<h3>発音</h3><p>" + word["contents"][0]["text"] + "</p>";
            newResult.innerHTML = resultHTML;
            newHistory.innerHTML = newHistoryHTML;
            newHistory.classList.add("tmp_none");
            results.appendChild(newResult);
            history.prepend(newHistory);
        }
    })
}