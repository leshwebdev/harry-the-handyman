import httpService from './httpService.js';

export default {
    authenticate,
    query,
    getById,
    save,
    remove
}
// WIP:

// let BASE_URL = null; 

// if (process.env.NODE_ENV === 'development') {
//     BASE_URL = 'https://harry-the-handyman-backend.herokuapp.com';
// } else {
//     console.log(process.env.NODE_ENV);
//     console.log(process.env.REACT_APP_BASE_URL); //am getting UNDEFINED
//     BASE_URL = process.env.REACT_APP_BASE_URL;
//   }

const BASE_URL = 'https://harry-the-handyman-backend.herokuapp.com'; // dangerous...
// const BASE_URL = 'https://my-json-server.typicode.com/leshwebdev/handyman-backend'; // this one is read only !
// const BASE_URL = '//localhost:3000'; // this one is for local developing.

function authenticate(username, password) {
    return httpService.get(`${BASE_URL}/users?username=${username.toLowerCase()}`)
    .then((result) => {
        if (result.length === 0) {
            return "no such user";
        } else if (result[0].password !== password) {
            return "wrong password";
        }   else if (result[0].password === password) {
            const {password, ...cleanUser} = result[0] 
            return cleanUser;
        } 
    });
}

function query(what) {
    return httpService.get(`${BASE_URL}/${what}`)
}

function getById(what, id) {
    return httpService.get(`${BASE_URL}/${what}/${id}`)
}

function remove(param, id) {
    return httpService.remove(`${BASE_URL}/${param}/${id}`)
}

function save(what, details) { // should be able to optimize this...
    // if (details.id) ----> should lead to updating the updatedOn timestamp and httpService.put (`${BASE_URL}/${what}/${details.id}`, details)
    if (what === "users") {
        if (details.id) {
            if (!details.password){
                //get the password from the DB and use it !
                return httpService.get(`${BASE_URL}/${what}/${details.id}`)
                .then((result) => {
                    details.password = result.password;
                    details.updatedOn = Date.now();
                    return httpService.put(`${BASE_URL}/${what}/${details.id}`, details)
                        .then(() => details);
                });
            } else {
                return httpService.put(`${BASE_URL}/${what}/${details.id}`, details)
                .then(() => details);
            }
        } else {
        details.id = _makeId();
        details.isAdmin = false;
        details.cart = [];
        details.favProjects = [];
        details.updatedOn = Date.now();
        return httpService.post(`${BASE_URL}/${what}`, details);
        }
    } else if (what === "items") { // this is just going to be used for updating the item Qty...
        details.updatedOn = Date.now();
            return httpService.put(`${BASE_URL}/${what}/${details.id}`, details)
                .then(() => details);
    } else if (what === "projects"){
        if (details.id) {
            details.updatedOn = Date.now();
            return httpService.put(`${BASE_URL}/${what}/${details.id}`, details)
                .then(() => details);
        } else {
            details.id = _makeId();
            if (details.imgUrl == '') details.imgUrl = "./img/projects/coming-soon.png"; 
            details.updatedOn = Date.now();
            details.cost = null;
            return httpService.post(`${BASE_URL}/${what}`, details);
        }
    }
}

function _makeId(length = 3) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}