//Cookie
const cookieArr = document.cookie.split("=")
const userId = cookieArr[1];

//DOM Elements
const submitPaletteForm = document.getElementById("palette-form")
const paletteContainer = document.getElementById("palette-container")

//"update" Modal Elements
let paletteBody = document.getElementById(`palette-body`)
let updatePaletteBtn = document.getElementById('update-palette-button')

// const headers = {'Content-Type': 'application/json'}
const baseUrl2 = "http://localhost:8080/api/v1/palettes/"

// ********** new code *************
const swatch = document.querySelectorAll(".btn-swatch")
let swatchList =[]

function createSwatch(event){
    const hexcode = "#"+event.target.innerHTML
    swatchList.push(hexcode)
    const newSwatch = document.createElement("div")

    newSwatch.setAttribute("class", event.target.innerHTML)
    newSwatch.setAttribute("id", ("active" + event.target.innerHTML))
    newSwatch.style.height = "50px"
    newSwatch.style.width = "50px"
    newSwatch.style.backgroundColor = hexcode
    newSwatch.style.display = "inline-block"
    newSwatch.style.marginRight = "5px"
    newSwatch.style.borderRadius = "10px"
    newSwatch.style.border = "3px solid black"
    newSwatch.style.font = "16px black"
    newSwatch.style.fill="test"
    document.getElementById("palette-input").appendChild(newSwatch)
}
for (let i=0; i<swatch.length; i++){
    swatch[i].addEventListener('click',createSwatch)
}

// the function createSavedSwatch, populates modal and runs on clicking "SAVE"
const newSwatchList =[]
function createSavedSwatch() {
    document.getElementById("palette-input").innerHTML = ""

    for (let i = 0; i < swatchList.length; i++) {
        const newSavedSwatch = document.createElement("div")
        newSavedSwatch.setAttribute("class", swatchList[i])
        newSavedSwatch.setAttribute("id", "saved" + swatchList[i])
        newSavedSwatch.style.height = "50px"
        newSavedSwatch.style.width = "50px"
        newSavedSwatch.style.backgroundColor = swatchList[i]
        newSavedSwatch.style.display = "inline-block"
        newSavedSwatch.style.marginRight = "5px"
        newSavedSwatch.style.borderRadius = "10px"
        newSavedSwatch.style.border = "3px solid black"
        newSavedSwatch.style.font = "16px black"
        newSavedSwatch.style.fill = "test"
        newSwatchList.push(swatchList[i])
        console.log (newSwatchList)
        newSavedSwatch.addEventListener("click", removeSwatch)

        document.getElementById("saved-palette-input").appendChild(newSavedSwatch)}
}
// ***** end of populate saved palette modal *****
// this allows user to remove a swatch from a saved palette
function removeSwatch(event){
    document.getElementById(event.target.id).remove()
}

// ************  old Code *************
const handleSubmit = async (e) => {
    e.preventDefault()
    let bodyObj = {
    body:swatchList.join(" ")}

    await addPalette(bodyObj);
    document.getElementById("palette-input").value = ''
    swatchList = []
}

async function addPalette(obj) {
    const response = await fetch(`${baseUrl2}user/${userId}`, {
        method: "POST",
        body: JSON.stringify(obj),
        headers: headers})
        .catch(err => console.error(err.message))
    if (response.status == 200) {
        console.log ("added palette")}
}
        // return getPalettes(userId);}}


        async function handleDelete(paletteId) {
            await fetch(baseUrl + paletteId, {
                method: "DELETE",
                headers: headers
            })
                .catch(err => console.error(err))
            // console.log("line 99" + paletteId)
            return getPalettes(userId);}



        document.addEventListener("click", handleDelete)


        async function handlePaletteEdit(paletteId) {
            let bodyObj = {
                id: paletteId,
                body: paletteBody.value
            }

            await fetch(baseUrl2, {
                method: "PUT",
                body: JSON.stringify(bodyObj),
                headers: headers
            })
                .catch(err => console.error(err))
            return getPalettes(userId);
        }

        submitPaletteForm.addEventListener("submit", handleSubmit)
        submitPaletteForm.addEventListener("submit", createSavedSwatch)

        updatePaletteBtn.addEventListener("click", (e) => {
            let paletteId = e.target.getAttribute('data-palette-id')
            handlePaletteEdit(paletteId);
        })


        function handleLogout() {
            let c = document.cookie.split(";");
            for (let i in c) {
                document.cookie = /^[^=]+/.exec(c[i])[0] + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT"
            }
        }

async function getPalettes(userId) {
    await fetch(`${baseUrl2}user/${userId}`, {
        method: "GET",
        headers: headers})
        .then(response => response.json())
        .then(data => createPaletteCards(data))
        .catch(err => console.error(err))}


// async function getPaletteById(paletteId){
//     await fetch(baseUrl2 + paletteId, {
//         method: "GET",
//         headers: headers})
//
//         .then(res => res.json())
//         .then(data => populateModal(data))
//         .catch(err => console.error(err.message))}

// const createPaletteCards = (array) => {
//     paletteContainer.innerHTML = ''
//     array.forEach(obj => {
//         let paletteCard = document.createElement("div")
//         paletteCard.classList.add("m-2")
//
//         paletteContainer.append(paletteCard); })}


// getPalettes(userId);

