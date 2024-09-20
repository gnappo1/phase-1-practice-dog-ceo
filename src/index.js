console.log(document.querySelector("body > h1"))
const imgUrl = "https://dog.ceo/api/breeds/image/random/4";

const appendImgToDiv = imageUrl => {
    //! 1. create an img node and store inside a variable
    const img = document.createElement("img")
    //! 2. set the src of the img pointing to imageUrl
    img.src = imageUrl
    //! 3. set the alt for the image
    img.alt = "A random dog"
    //! 4. target the final destination div using its id: dog-image-container
    const dogImageContainer = document.getElementById("dog-image-container")
    //! 5. divContainer.append(img)
    dogImageContainer.appendChild(img)
}

const fetchImages = () => {
    fetch(imgUrl) //! fires a GET HTTP async request to the server and returns a promise object
    .then(response => response.json())
    .then(dataObj => {
        dataObj["message"].forEach(url => appendImgToDiv(url))
    })
    .catch(error => alert(error))
}

fetchImages()

const fetchBreeds = () => {

    fetch("https://dog.ceo/api/breeds/list/all")
    .then(response => response.json())
    .then(dataObj => {
        //! the data is inside the message key, access it with dot notation
        //! the breeds are in an object, go over the keys with a for...in loop
        for (const breed in dataObj.message) {
            //! create the li
            const li = document.createElement("li")
            li.addEventListener("click", () => li.classList.toggle("blue"))
            // li.addEventListener("click", () => li.style.color = "#" + Math.floor(Math.random() * 16777215).toString(16))
            //! set the text inside the li to match the current breed we're looping through
            li.textContent = breed

            //! we need to append the li inside the ul with id dog-breeds
            const breedsUl = document.getElementById("dog-breeds")
            
            breedsUl.appendChild(li)
        }
    })
}
fetchBreeds()

const attachChangeToSelect = () => {
    //! target the select tag by id
    const select = document.getElementById("breed-dropdown")
    //! add the event listener onto the targeted node
    select.addEventListener("change", e => {
        //! figure out the letter selected
        const letter = e.target.value
        
        //! filter out all of the breeds that do not start with the letter selected
        for (const li of document.querySelectorAll("li")) {
            if (!li.innerText.startsWith(letter)) {
                li.classList.add("hide")
            } else {
                li.classList.remove("hide")
            }
        }
    })
}

attachChangeToSelect()