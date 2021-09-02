/* js connection checking
console.log("js connected"); */
const searchBook = () => {
    const searchingInput = document.getElementById("searchingInput");
    const searched = searchingInput.value;
    searchingInput.value = '';
    const resultFoundArea = document.getElementById("resultFoundArea");
    resultFoundArea.innerHTML = "";
    searchedBook(searched);
}
const searchedBook = searched => {
    fetch(`https://openlibrary.org/search.json?q=${searched}`)
    .then(res => res.json())
    .then(data => extractData(data))
}
const extractData = data => {
    const {numFound} = data;
    const showingData = data.docs.length;
    const div = document.createElement("div");
    const header1 = document.createElement("h1");
    header1.innerText = `Total Results found by name: ${numFound}`;
    div.appendChild(header1);
    const header2 = document.createElement("h1");
    header2.innerText = `Available to show: ${showingData}`;
    div.appendChild(header2);
    const resultFoundArea = document.getElementById("resultFoundArea");
    resultFoundArea.innerHTML = "";
    resultFoundArea.appendChild(div);
    data.docs.forEach(element => {
        individualBookData(element);
    });
}
const individualBookData = element => {
    console.log(element);
    const {title,cover_i} = element;
    //author_name,publish_date,publisher are array type
    const author_name = element.author_name;
    const publish_date = element.publish_date;
    const publisher = element.publisher;
    // console.log(...author_name);
}
