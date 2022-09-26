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
    //http://localhost:3030
    const response = await fetch('https://armankhoyetsyantest.herokuapp.com/login', {
        body: data,
        method: 'POST',
        headers: myHeaders,
    });
    return response;
}

export { loginBtClick }
