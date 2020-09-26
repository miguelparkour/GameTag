import {API_KEY, USER_AGENT, API_URI} from 'services/settings'


const headers = new Headers({
    "token": API_KEY,
    'User-Agent':USER_AGENT
})

export async function getGames(keyword) {

    const apiURL = `${API_URI}?search=${keyword}&page_size=10&platforms=1,18,4`
    const response = await fetch(apiURL,{
        method:'GET',
        headers:headers
    })
    console.log(typeof(response));
    const json = await response.json()
    return json
}

export async function getGameBySlug(slug) {

    const game = getGameFromStorage(slug)
    if(game) {
        return game
    }
    const apiURL = `${API_URI}/${slug}`
    const response = await fetch(apiURL, {
        method:'GET',
        headers:headers
    })
    const json = await response.json()
    return json
}

const getGameFromStorage = (slug) =>{
    try {
        const games = JSON.parse(localStorage.getItem('games'))
        return games.find(elem=>elem.slug===slug)
    } catch (error) {
        return null
    }
}