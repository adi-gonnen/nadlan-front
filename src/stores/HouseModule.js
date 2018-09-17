import HouseService from '../Services/HouseService.js'

export default {
    state: {
        housesLoading: false,
        houses: null,
        house: null
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
    },
    getters: {
        HousesForGallery(state) {
            console.log('stateHouses', state.houses);
            return state.houses
        },
        HouseForDisplay(state) {
            return state.house
        }
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
    }
}