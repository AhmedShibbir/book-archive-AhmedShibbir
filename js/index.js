/* js connection checking
console.log("js connected"); */
const searchBook = () => {
    const searchingInput = document.getElementById("searchingInput");
    const searched = searchingInput.value;
    searchingInput.value = '';
    const resultFoundArea = document.getElementById("resultFoundArea");
    resultFoundArea.innerHTML = "";
    const cardContainer = document.getElementById("resultCards");
    cardContainer.innerHTML= "";
    const loadingButton = document.getElementById("loading");
    loadingButton.classList.remove("d-none")
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
    if(numFound === 0){
        const loadingButton = document.getElementById("loading");
        loadingButton.classList.add("d-none");
        const message = document.createElement("h1");
        message.innerText = "Sorry, did not find any book to show. Try another one! ";
        document.getElementById("resultFoundArea").appendChild(message);
    }
    else{
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
}
const individualBookData = element => {
    // console.log(element);
    //titles are of string type
    //cover_i are of number type
    const {title,cover_i} = element;
    const image = imageFetching(cover_i);
    //author_name,publish_date,publisher are array type
    const author_name = element.author_name;
    const publish_date = element.publish_date;
    const publisher = element.publisher;
    // console.log(`title: ${typeof title},cover_i: ${typeof cover_i},author_name: ${typeof author_name},publish_date: ${typeof publish_date}, publisher: ${typeof publisher}`);
    const cardContainer = document.getElementById("resultCards");
    const card = document.createElement("div");
    card.innerHTML = `
    <div class="card" style="width: 18rem;">
        <img src="${image}" class="card-img-top" alt="book's photo">
        <div class="card-body">
            <h5 class="card-title">${title}</h5>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item text-white bg-black bg-opacity-75">Author: ${author_name}</li>
            <li class="list-group-item text-white bg-success bg-opacity-50">Publishing Date: ${publish_date}</li>
            <li class="list-group-item text-white bg-secondary bg-opacity-75">Publisher: ${publisher}</li>
        </ul>
    </div>
    `;
    cardContainer.appendChild(card);
    const loadingButton = document.getElementById("loading");
    loadingButton.classList.add("d-none");
}
const imageFetching = cover_i => {
    if(cover_i){
        fetch(`https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`)
        .then(res => res.json())
        .then(data => {return data})
    }
    else{
        return "/image_not_found.png";
    }
}
