const auth = () => {
    const localStorage = window.localStorage;
    if (localStorage.getItem('cookie') == false) {
        console.log("false auth")
        return false;
    }
    const data = {
        userID: 4,
        cookie: localStorage.getItem('cookie')
    }
    fetch("http://127.0.0.1:5000/auth", {
        method: 'post',
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(res => {
        if (res.auth === false) {
            localStorage.removeItem('cookie')
        }
        console.log(res)
    })
    .catch(err => console.log(err));
}