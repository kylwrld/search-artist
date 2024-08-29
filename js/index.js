const API_KEY = "ae0050c3ef5865c95d6982924c7de685"
const API_URL = "http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist="
const PARAMS = `&api_key=${API_KEY}&format=json&limit=10`

const getTopTracks = async (artist) => {
    const url = API_URL + artist + PARAMS
    const response = await fetch(url)
    const result = await response.json()
    return result
}

document.getElementById("form").addEventListener("submit", async (e) => {
    e.preventDefault()
    const artist = e.target[0].value
    if (artist === '') {
        return document.getElementById("result").innerHTML = ''
    }
    const result = await getTopTracks(artist)
    const tracks = result["toptracks"]["track"]
    const list = document.getElementById("result")
    list.innerHTML = ''
    tracks.forEach(element => {
        let div = document.createElement("div");
        div.classList.add("list-item")
        const inner = `
        <div class="list-center"><p>#${element["@attr"].rank}</p></div>
        <div class="list-center"><p>${element.name}</p></div>
        <div class="list-center"><p>${element.playcount}</p></div>
        <div class="list-center"><p>${element.listeners}</p></div>
        `
        div.innerHTML = inner
        list.appendChild(div)
    });
})
