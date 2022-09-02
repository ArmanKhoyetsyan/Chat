const API_KEY = process.env.REACT_APP_API_KEY || '555jjjj555';

async function loginBtClick({ userName, password }) {
    const data = JSON.stringify({
        'userName': userName,
        'password': password
    });
    const myHeaders = new Headers({
        'Content-Type': 'application/json',
        'api_key': API_KEY
    });
    const response = await fetch('https://armankhoyetsyantest.herokuapp.com/login', {
        body: data,
        method: 'POST',
        headers: myHeaders,
    });
    return response;
}

// async function getMessages({ firstUserName, secondUserName }) {
//     const data = JSON.stringify({
//         'firstUserName': firstUserName,
//         'secondUserName': secondUserName
//     });
//     const myHeaders = new Headers({
//         'Content-Type': 'application/json',
//         'api_key': API_KEY
//     });
//     const response = await fetch('http://192.168.31.183:3030/getMessages', {
//         body: data,
//         method: 'GET',
//         headers: myHeaders,
//     });
//     return response;
// }

// async function getGroups() {
//     const myHeaders = new Headers({
//         'Content-Type': 'application/json',
//         'api_key': API_KEY
//     });
//     const response = await fetch('http://localhost:3030/groups', {
//         method: 'GET',
//         headers: myHeaders,
//     });
//     return response;
// }

export { loginBtClick }