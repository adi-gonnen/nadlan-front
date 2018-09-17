import axios from 'axios'

const HOUSE_URL = (process.env.NODE_ENV !== 'development')? '/house': '//localhost:3000/house';

function getHouse() {
    // console.log('service front');    
    return axios.get(HOUSE_URL)
        .then(res => {
            // console.log('house service front:', res.data);
            return res.data
        })
}

function getHouseById(houseId) {
    return axios.get(`${HOUSE_URL}/${houseId}`)
        .then(res => {
            return res.data
        })
        .catch(err => console.log('Problem talking to server', err))
}

export default {
    getHouse,
    getHouseById
}