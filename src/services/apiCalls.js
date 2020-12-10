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
