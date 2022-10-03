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

// ************  old Code *************

const handleSubmit = async (e) => {
    e.preventDefault()
    let bodyObj = {
        // body: document.getElementById("palette-input").value}
    body:swatchList.join(" ")}

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
        // try arrayName.join(,)
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
// the following line might not be needed
        paletteCard.innerHTML = ``
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
// the function below, createSavedSwatch, will be triggered by clicking "SAVE" to a palette

function createSavedSwatch(){
    document.getElementById("palette-input").innerHTML=""
    console.log (swatchList)

    for (let i =0; i <swatchList.length; i++){
    const newSavedSwatch = document.createElement("div")

    // gives this div a specific class and a "saved"+id
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
    newSavedSwatch.style.fill="test"

    document.getElementById("saved-palette-input").appendChild(newSavedSwatch)
    }
}
// addEventListener()
// letUpdatedSwatchList = swatchList - that div
// document.getElementsByClassName(swatchList[i]).

// ***** end of populate saved palette modal *****


getPalettes(userId);

submitPaletteForm.addEventListener("submit", handleSubmit)
submitPaletteForm.addEventListener("submit", createSavedSwatch)


updatePaletteBtn.addEventListener("click", (e)=>{
    let paletteId = e.target.getAttribute('data-palette-id')
    handlePaletteEdit(paletteId);})