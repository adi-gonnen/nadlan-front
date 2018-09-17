<template>
    <section> 
        <div class="house-details flex column">
            <h1>{{currHouse.txt.en.title}}</h1>
            <p>{{currHouse.txt.en.desc}}</p>
            <img :src="currHouse.src[0]"/>
            <div class="symbols flex">
                <div class="symbol flex">
                    <p>חניה</p>
                    <p>☑</p>
                </div>
                <div class="symbol flex">
                    <p>מעלית</p>
                    <p class="box">□</p>
                </div>
                <div class="symbol flex">
                    <p>ממ"ד</p>
                    <p>☑</p>
                </div>
                <div class="symbol flex">
                    <p>מרפסת שמש</p>
                    <p>☑</p>
                </div>
                <div class="symbol flex">
                    <p>מחסן</p>
                    <p class="box">□</p>
                </div>
            </div>
            <h1>{{currHouse.price}} NIS</h1>
        </div>
    </section>
</template>

<script>
export default {
    name: "houseDetails",
    props: ["house"],
    data() {
        return {
            currHouse: null,
        }
    },
    created() {
        // this.loadHouse();
        this.currHouse = this.loadHouse()
    },
    computed: {
        // loadHouse() {
        //     return this.$store.getters.HouseForDisplay;
        // }
    },
    methods: {
        // loadHouse() {
        //     this.$store
        //         .dispatch({ type: "loadHouse", houseId: this.$route.params.houseId })
        //         .then(house => {
        //             console.log('house:', house);
        //             this.currHouse = house;
        //             });
        // },
        loadHouse() {
            return this.$store.getters.HouseForDisplay;
        }
        
    },
}
</script>

<style>
.house-details {
    border: 1px solid;
    align-items: center;
    padding: 30px;
    width: 70%;
    margin: auto;
}
.house-details>img {
    width: 350px;
    height: 260px;
}
.symbol {
    margin: 15px;
}
.box {
    font-size: 1.2em;
}

</style>
