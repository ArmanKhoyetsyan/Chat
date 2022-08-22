const API_KEY = process.env.REACT_APP_API_KEY;

async function loginBtClick(email, password) {
    const data = JSON.stringify({
        'email': email,
        'password': password
    });
    const myHeaders = new Headers({
        'Content-Type': 'application/json',
        'api_key': API_KEY
    });
    const response = await fetch('/login', {
        body: data,
        method: 'POST',
        headers: myHeaders,
    });
    return response;
}

export { loginBtClick }
