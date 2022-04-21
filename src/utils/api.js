import { config } from './config'

const onResponce = (res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка : ${res.status}`)
}

class Api {
    constructor({ url, token }) {
        this._url = url
        this._token = token
    }

    getPost(itemID) {
        const requestUrl=itemID ?`${this._url}/posts/${itemID}`:`${this._url}/posts`
        return fetch(requestUrl, {
            headers: {
                authorization: `Bearer ${this._token}`,
            },
        }).then(onResponce)
    }

    addLike(itemID) {
        return fetch(`${this._url}/posts/likes/${itemID}`, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${this._token}`,
            },
        }).then(onResponce)
    }

    deleteLike(itemID) {
        return fetch(`${this._url}/posts/likes/${itemID}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${this._token}`,
            },
        }).then(onResponce)
    }

    getInfoUser() {
        return fetch(`${this._url}/users/me`, {
            headers: {
                authorization: `Bearer ${this._token}`,
            },
        }).then(onResponce)
    }

    addPost(posts){
        return fetch(`${this._url}/posts`, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${this._token}`,
                'Content-Type':'application/json'
            },
            body: JSON.stringify(posts)
        }).then(onResponce);
    }

    deletePost(itemID){
        return fetch(`${this._url}/posts/${itemID}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${this._token}`,
                            },
            
        }).then(onResponce);
    }

}

export default new Api(config)
