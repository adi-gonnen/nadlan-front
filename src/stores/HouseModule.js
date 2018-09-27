import HouseService from '../services/HouseService.js'

export default {
    state: {
        housesLoading: false,
        houses: null,
        house: null,
        filterBy: {
            city: '',
            allCategories: true,
            category: [],
        },
        allCities: ['Herzelia', 'Ra\'anana', 'Kfar-Saba'],
        houseForCity: null,
        allFilterCategories: ['3', '4', '5', 'private', 'two floors'],
    },
    mutations: {
        setHousesLoading(state, { isLoading }) {
            state.housesLoading = isLoading;
        },
        setHouses(state, { houses }) {
            state.houses = houses;
        },
        setHouse(state, { house }) {
            state.house = house;
        },
        housesByFilterServer(state, { houses }) {
            console.log('mutation housesByFilterServer', houses);
            state.houses = houses;
        },
        setFilter(state, { filterBy }) {
            console.log('mutation setFilter', filterBy);
            state.filterBy = filterBy;
            console.log('mutation setFilter state.filterBy', state.filterBy);
        },
        getHouseByCity(state, { house }) {
            console.log('mutation getHouseByCity', house);
            state.houseForCity = house;
        },
    },
    getters: {
        HousesForGallery(state) {
            console.log('stateHouses', state.houses);
            return state.houses
        },
        HouseForDisplay(state) {
            return state.house
        },
        allCities(state) {
            return state.allCities
        },
        allCategories(state) {
            // console.log('categories', state.allFilterCategories);
            return state.allFilterCategories
        },
    },
    actions: {
        loadHouses(context) {
            console.log('actions');            
            context.commit({ type: 'setHousesLoading', isLoading: true })
            return HouseService.getHouse()
                .then(houses => {
                    console.log('houses:', houses);
                    context.commit({ type: 'setHouses', houses })
                    return houses;
                })
                .finally(() => {
                    context.commit({ type: 'setHousesLoading', isLoading: false })
                })
        },
        loadHouse(context, { houseId }) {
            context.commit({ type: 'setHousesLoading', isLoading: true })
            return HouseService.getHouseById(houseId)
                .then((house) => {
                    context.commit({ type: 'setHouse', house })
                    return house;
                })
                .finally(() => {
                    context.commit({ type: 'setHousesLoading', isLoading: false });
                })
        },
        setFilter(context, { filterBy }) {
            // context.commit({ type: 'setHousesLoading', isLoading: true })
            context.commit({ type: 'setFilter', filterBy })
            console.log('setFilter in store: filterBy', filterBy)
            return HouseService.query(filterBy)
                .then((houses) => {
                    console.log('users from server after sentFilter in store', houses);
                    context.commit({ type: 'housesByFilterServer', houses })
                })
                .finally(() => {
                    context.commit({ type: 'setHousesLoading', isLoading: false });
                })
        },
        getHouseByCity(context, { city }) {
            console.log('city from action', city);
            return HouseService.getHouseByCity(city)
                .then(house => {
                    console.log('house from backend in front', house);
                    context.commit({type: 'getHouseByCity', house})
                    return house;
                }).catch( err => {
                    console.log('error in front service', err)
                    throw err;
                })
        },
    }
}