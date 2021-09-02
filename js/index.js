//onclick function
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
//dynamic url for api
const searchedBook = searched => {
    const url = `https://openlibrary.org/search.json?q=${searched}`;
    fetch(url)
    .then(res => res.json())
    .then(data => extractData(data))
}
//data extraction from api
const extractData = data => {
    const {numFound} = data;
    const showingData = data.docs.length;
    //when no results found and giving notification
    if(numFound === 0){
        const loadingButton = document.getElementById("loading");
        loadingButton.classList.add("d-none");
        const message = document.createElement("h1");
        message.innerText = "Sorry, did not find any book to show. Try another one! ";
        document.getElementById("resultFoundArea").appendChild(message);
    }
    //when searched data is available
    else{
        const div = document.createElement("div");
        const header1 = document.createElement("h1");
        header1.innerText = `Total Results found in number: ${numFound}`;
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
//book's information setting on the card
const individualBookData = element => {
    const {title} = element;
    const cover_i = element?.cover_i;
    const image = imageFetching(cover_i);
    const author_name = element.author_name;
    const publish_date = element.publish_date;
    const publisher = element.publisher;
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
//image's dynamic url setting part
const imageFetching = cover_i => {
    if((typeof cover_i) !== "undefined"){
        const url = `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`;
        return url;
    }
    else{
        return "/image_not_found.png";
    }
}
