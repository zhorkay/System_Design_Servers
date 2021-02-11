import {baseUrl} from "./baseUrl";

export const fetchSuggestions = (value) => {

    return fetch(baseUrl + `/terms?term=${value}` ,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    }).then(response => {
        if (response.ok) {
            return response;
        } else {
            let error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        throw new Error(error.message);
    }).then(response => response.json())
};

