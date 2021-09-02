/* js connection checking
console.log("js connected"); */
const searchBook = () => {
    const searchingInput = document.getElementById("searchingInput");
    const searched = searchingInput.value;
    searchingInput.value = '';
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
    data.docs.forEach(element => {
        individualBookData(element);
    });
}
const individualBookData = element => {
    // console.log(element);
    const {title} = element;
    const author_name = element.author_name;
    const publish_date = element.publish_date;
    const publisher=element.publisher;
    console.log(title,author_name,publish_date,publisher);
    
}