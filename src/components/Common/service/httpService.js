import axios from 'axios';

function get(API) {
    return axios.get(API)
        .then(res => {
            return res.data
        })
        .catch(errFunc);
}

function remove(API) {
    return axios.delete(API).then(res => res.data).catch(errFunc);
}

function post(API, obj) {
    return axios.post(API, obj).then(res => res.data).catch(errFunc);
}

function put(API, obj) {
    return axios.put(API, obj).then(res => res.data).catch(errFunc);
}

function errFunc(err) {
    console.log(err)
}

export default {
    get,
    post,
    put,
    remove
}