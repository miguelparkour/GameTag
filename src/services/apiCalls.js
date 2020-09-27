import {API_KEY, USER_AGENT, API_URI} from 'services/settings';

const headers = new Headers({
    token: API_KEY,
    'User-Agent': USER_AGENT,
});

export async function getGame(name) {
    console.log(`Buscando ${name} en la base de datos`);
    const game = {
        title: 'Portal',
        publisher: 'Valve',
        tags: ['action', 'horror'],
        released: 2010,
    };
    return game;
}

export async function getSuggestedTags(tags) {
    const suggestedTags = ['horror', 'action', 'survival', 'fist person', 'strategy', 'multiplayer'];
    return suggestedTags;
}

export async function getGames(tags) {
    console.log(`enviando tags a la api ${tags}`);
    var games = [
        {title: 'Portal', tags: ['action', 'horror']},
        {title: 'Uncharted', tags: ['action', 'singleplayer']},
        {title: 'Minecraft', tags: ['survival', 'horror']},
    ];
    console.log(`recibiendo juegos de la api${games}`);
    return games;
}

/* export async function getGames(keyword) {

    const apiURL = `${API_URI}?search=${keyword}&page_size=10&platforms=1,18,4`
    const response = await fetch(apiURL,{
        method:'GET',
        headers:headers
    })
    const json = await response.json()
    return json
} */

export async function getGameBySlug(slug) {
    console.log(slug);
    const game = getGameFromStorage(slug);
    if (game) {
        return game;
    }
    const apiURL = `${API_URI}/${slug}`;
    const response = await fetch(apiURL, {
        method: 'GET',
        headers: headers,
    });
    const json = await response.json();
    return json;
}

const getGameFromStorage = (slug) => {
    try {
        const games = JSON.parse(localStorage.getItem('games'));
        return games.find((elem) => elem.slug === slug);
    } catch (error) {
        return null;
    }
};
