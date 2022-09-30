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

    console.log(event.target.innerHTML)
    const hexcode = "#"+event.target.innerHTML
    swatchList.push(hexcode)
    const newSwatch = document.createElement("div")

    // gives this div a specific class
    newSwatch.setAttribute("class", event.target.innerHTML)
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

// ************  old Code *************

const handleSubmit = async (e) => {
    e.preventDefault()
    let bodyObj = {
        // body: document.getElementById("palette-input").value}
    body:swatchList}

    console.log(bodyObj)
    // body: document.getElementById("palette-input").value}

    await addPalette(bodyObj);
    document.getElementById("palette-input").value = ''

    swatchList = []
}
    console.log (swatchList)


async function addPalette(obj) {
    const response = await fetch(`${baseUrl2}user/${userId}`, {
        method: "POST",
        body: JSON.stringify(obj),
        headers: headers})
        .catch(err => console.error(err.message))
    if (response.status == 200) {
        return getPalettes(userId);}}

async function getPalettes(userId) {
    await fetch(`${baseUrl2}user/${userId}`, {
        method: "GET",
        headers: headers})
        .then(response => response.json())
        .then(data => createPaletteCards(data))
        .catch(err => console.error(err))}

async function handleDelete(paletteId){
    await fetch(baseUrl2 + paletteId, {
        method: "DELETE",
        headers: headers})
        .catch(err => console.error(err))
    return getPalettes(userId);}

async function getPaletteById(paletteId){
    await fetch(baseUrl2 + paletteId, {
        method: "GET",
        headers: headers})

        .then(res => res.json())
        .then(data => populateModal(data))
        .catch(err => console.error(err.message))
    console.log("first 55")}


async function handlePaletteEdit(paletteId){
    let bodyObj = {
        id: paletteId,
        body: paletteBody.value}

    await fetch(baseUrl2, {
        method: "PUT",
        body: JSON.stringify(bodyObj),
        headers: headers})
        .catch(err => console.error(err))
    return getPalettes(userId);}

const createPaletteCards = (array) => {
    paletteContainer.innerHTML = ''
    array.forEach(obj => {
        let paletteCard = document.createElement("div")
        paletteCard.classList.add("m-2")
        paletteCard.innerHTML = `
            <div class="card d-flex" style="width: 18rem; height: 18rem;">
                <div class="card-body d-flex flex-column  justify-content-between" style="height: available">
                    <p class="card-text">${obj.body}</p>
                    <div class="d-flex justify-content-between">
                        <button class="btn btn-danger" onclick="handleDelete(${obj.id})">Delete</button>
                        <button onclick="getPaletteById(${obj.id})" type="button" class="btn btn-primary" 
                        data-bs-toggle="modal" data-bs-target="#palette-edit-modal">
                        Edit
                        </button>
                    </div>
                </div>
            </div>
            `
        paletteContainer.append(paletteCard); })}
function handleLogout(){
    let c = document.cookie.split(";");
    for(let i in c){
        document.cookie = /^[^=]+/.exec(c[i])[0]+"=;expires=Thu, 01 Jan 1970 00:00:00 GMT"}}

const populateModal = (obj) =>{
    paletteBody.innerText = ''
    paletteBody.innerText = obj.body
    updatePaletteBtn.setAttribute('data-palette-id', obj.id)}



// ***** copied for populate saved palette modal *****
// const swatch = document.querySelectorAll(".btn-swatch")
// let swatchList =[]
//
// function createSwatch(event){
//
//     console.log(event.target.innerHTML)
//     const hexcode = "#"+event.target.innerHTML
//     swatchList.push(hexcode)
//     const newSwatch = document.createElement("div")
//
//     // gives this div a specific class
//     newSwatch.setAttribute("class", event.target.innerHTML)
//     newSwatch.style.height = "50px"
//     newSwatch.style.width = "50px"
//     newSwatch.style.backgroundColor = hexcode
//     newSwatch.style.display = "inline-block"
//     newSwatch.style.marginRight = "5px"
//     newSwatch.style.borderRadius = "10px"
//     newSwatch.style.border = "3px solid black"
//     newSwatch.style.font = "16px black"
//     newSwatch.style.fill="test"
//
//     document.getElementById("palette-input").appendChild(newSwatch)
// }
//
// for (let i=0; i<swatch.length; i++){
//     swatch[i].addEventListener('click',createSwatch)
// }

// ***** copied for populate saved palette modal *****


getPalettes(userId);
submitPaletteForm.addEventListener("submit", handleSubmit)

updatePaletteBtn.addEventListener("click", (e)=>{
    let paletteId = e.target.getAttribute('data-palette-id')
    handlePaletteEdit(paletteId);})