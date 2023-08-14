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
    results.innerHTML = "";
    entries.words.forEach(word => {
        if (word["entry"]["form"] == keyword) {
            const newResult = document.createElement("p");
            let resultText = "";
            word["translations"].forEach(definition => {
                resultText += definition["forms"][0];
                resultText += "\n";
            })
            newResult.innerText = resultText;
            results.appendChild(newResult);
        }
    })
}