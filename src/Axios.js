import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://kasukabegroup-1573f.firebaseio.com/'
});

export default instance;