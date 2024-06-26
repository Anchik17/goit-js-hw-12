import axios from "axios";

const mainUrl = 'https://pixabay.com/api/';

export async function searchImg(query, page) {
    const response = await axios(mainUrl, {
        params: {
            key: '44080035-ad15b59279a4b32b32cca2a53',
            q: query,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: 'true',
            page: page,
            per_page: 15,
        }
    })
    return response.data;
}