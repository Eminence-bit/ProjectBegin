function search(event) {
    const searchTerm = document.getElementById('searchBar').value;

    let url = "https://search.imdbot.workers.dev/?q=" + searchTerm;
    

    fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            let {
                description
            } = jsonData;
            console.log(description);
            displayResults(description);
        });
}

let contentContainer = document.getElementById('content');

function createAndAppendSearchResult(result) {

    let resultItemEl = document.createElement("div");
    resultItemEl.classList.add("result-item");

    let imageEl = document.createElement("img");
    imageEl.src = result['#IMG_POSTER'];
    imageEl.classList.add("poster-img");
    resultItemEl.appendChild(imageEl);

    let titleBreakEl = document.createElement("br");
    resultItemEl.appendChild(titleBreakEl);

    let titleEl = document.createElement("a");
    titleEl.href = result['#IMDB_URL'];
    titleEl.target = "_blank";
    titleEl.textContent = result['#TITLE'];
    titleEl.classList.add("result-title");
    resultItemEl.appendChild(titleEl);

    let linkBreakEl = document.createElement("br");
    resultItemEl.appendChild(linkBreakEl);

    let actorEl = document.createElement("p");
    actorEl.classList.add("link-description");
    actorEl.textContent = "ACTORS: "+ result['#ACTORS'];
    resultItemEl.appendChild(actorEl);

    let yearEl = document.createElement("p");
    yearEl.classList.add("link-description");
    yearEl.textContent = "YEAR: "+ result['#YEAR'];
    resultItemEl.appendChild(yearEl);

    contentContainer.appendChild(resultItemEl);
}
function scrollToResults() {
    var resultsSection = document.getElementById('content');

    if (resultsSection) {
        resultsSection.scrollIntoView({ behavior: 'smooth' });
    }
}

function displayResults(searchResults) {
    contentContainer.innerHTML="";
    for (let result of searchResults) {
        createAndAppendSearchResult(result);
    }
    scrollToResults();
}
