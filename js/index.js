/* js connection checking
console.log("js connected"); */
const searchBook = () => {
    const searchingInput = document.getElementById("searchingInput");
    const searchedBook = searchingInput.value;
    searchingInput.value = '';
    console.log(searchedBook);
}