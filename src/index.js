console.log('%c HI', 'color: firebrick')
const imageContainer = document.querySelector('#dog-image-container')
const breedsUl = document.getElementById('dog-breeds')

const renderImage = (imageUrl) => {
    //! Step 1: create an element for the image url -> img
    const image = document.createElement('img')
    //! Step 2: set the src property of the image pointing to the imageUrl
    image.setAttribute('src', imageUrl)
    // image.src = imageUrl
    //! Step 3: set the alt property saying 'dog image'
    image.setAttribute('alt', 'dog image')
    image.setAttribute('class', 'dog-image')
    //! Step 4: Append the newly created img to the DOM (where???)
    imageContainer.appendChild(image)
}

const fetchImages = () => {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4";

    fetch(imgUrl)
    .then(resp => resp.json())
    .then(imgData => imgData.message.forEach(url => renderImage(url)))
    .catch(err => console.error(err))
}

const oneBreed = (breedName) => {
    console.log(breedName)
    //! create a new li
    const createLi = document.createElement('li')
    //! give the li some text corresponding to the breedName
    createLi.innerText = breedName
    //! add the li inside the ul
    breedsUl.appendChild(createLi)
}

const allBreeds = () => {
    const breedUrl = "https://dog.ceo/api/breeds/list/all";
    fetch(breedUrl)
    .then(resp => resp.json())
    .then(breedObj => {
        //! Extract the breeds from the keys of the obj
        const allBreedsArray = Object.keys(breedObj.message)
        //! for each breed invoke the oneBreed function that decided what to do with it
        allBreedsArray.forEach(breed => oneBreed(breed))
    })
    .catch(err => console.error(err))
}

fetchImages()
allBreeds()
