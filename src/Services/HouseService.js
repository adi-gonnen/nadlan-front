import axios from 'axios'

const HOUSE_URL = (process.env.NODE_ENV !== 'development')? '/house': '//localhost:3000/house';

function query(criteria = {city: '', category: []}) {
    console.log('criteria in query', criteria);
    var categoryStr = '';
    if (criteria.category) categoryStr = criteria.category.join(',');
    console.log('categoryStr', categoryStr);
    var queryParams = `?city=${criteria.city}&category=${categoryStr}`;
    return axios.get(HOUSE_URL + queryParams)
        .then(res => {
            return res.data})
}

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

function getHouseByCity(city) {
    return axios.get(`${HOUSE_URL}/gallery/${city}`)
        .then(res => {
            return res.data
        })
        .catch(err => console.log('Problem talking to server', err))
}

export default {
    query,
    getHouse,
    getHouseById,
    getHouseByCity
}