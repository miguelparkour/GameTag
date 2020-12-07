import {API_KEY, USER_AGENT, API_URI} from 'services/settings';

const headers = new Headers({
    token: API_KEY,
    'User-Agent': USER_AGENT,
});

export async function getGame(slug) {
    console.log('call getgame');
    const apiUri = `http://localhost:8080/Backend/api/games/getGame?slug=${slug}`;
    const response = await fetch(apiUri, {
        method: 'GET',
    });
    const data = await response.json();
    return data;
}
export async function firstCall() {
    console.log('call firstCall');
    const apiUri = `http://localhost:8080/Backend/api/games/firstCall`;
    const response = await fetch(apiUri, {
        method: 'GET',
    });
    const data = await response.json();
    return data;
}
export async function getSuggestedTags(keywords) {
    console.log('call suggestedTags');
    const apiUri = `http://localhost:8080/Backend/api/games/getTags?keywords=${keywords}`;
    const response = await fetch(apiUri, {
        method: 'GET',
    });
    const data = await response.json();
    return data;
}

export async function getGames(tags) {
    console.log(`call getgames`);
    const json = {
        tags: tags,
    };
    const apiUri = `http://localhost:8080/Backend/api/games/getGames`;
    const response = await fetch(apiUri, {
        method: 'POST',
        body: JSON.stringify(json),
    });
    const data = await response.json();
    return data;
}

export async function getGameBySlug(slug) {
    ''(slug);
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
