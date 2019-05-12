export default function auth() {
    const localStorage = window.localStorage;
    if (localStorage.getItem('cookie') === null) {
        return false;
    }
    const data = {
        userID: this.props.authReducer.id,
        cookie: localStorage.getItem('cookie')
    }
    fetch("http://127.0.0.1:5000/auth", {
        method: 'post',
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(res => {
        if (res.auth === false) {
            localStorage.removeItem('cookie');
            const obj = {
                id: null,
                cookie: null
            }
            this.setAuthAction(obj);
        } else {
            const obj = {
                id: res.id,
                cookie: localStorage.getItem('cookie')
            }
            this.setAuthAction(obj);
        }
        console.log(res)
    })
    .catch(err => console.log(err));
}