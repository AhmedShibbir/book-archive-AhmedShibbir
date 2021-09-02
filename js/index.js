/* js connection checking
console.log("js connected"); */
const searchBook = () => {
    const searchingInput = document.getElementById("searchingInput");
    const searched = searchingInput.value;
    searchingInput.value = '';
    // searchedBook(searched);
}
const searchedBook = () => {
    fetch("https://openlibrary.org/search.json?q=javascript")
    .then(res => res.json())
    .then(data => console.log(data))
    
    // console.log(searched);
}
searchedBook();