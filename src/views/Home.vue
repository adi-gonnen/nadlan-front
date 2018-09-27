<template>
  <div class="home">
    <p class="home-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    <div class="cities flex">
      <ul class="all-cities-container flex column" v-if="allCities">
        <li class="clean-list" v-for="city in allCities" :key="city._id">
          <router-link to="/gallery" @click.native="setFilter(city)" class="city-home-page flex column">
          <!-- <router-link to="/gallery" @click.native="setFilter(city)" class="city-home-page flex column"> -->
            <h1>{{city}}</h1>
            <!-- <image-render :src="setCityImg(city)"></image-render> -->
            <!-- <img :src="setCityImg(city)" v-if="src"/> -->
            <img :src="setCityImg(city)"/>
            <!-- <img :src="src"/> -->
            <!-- <img src="img/houses/house1.jpg"/> -->
          </router-link>
        </li>
      </ul>

      <!-- <router-link to="/gallery" @click.native="setFilter('Herzelia')" class="city-home-page flex column">
        <h1>Herzelia</h1>
        <img src="img/houses/house1.jpg"/>
      </router-link>
      <router-link to="/gallery" @click.native="setFilter('Ra\'anana')" class="city-home-page flex column">
        <h1>Ra'anana</h1>
        <img src="img/houses/house2.jpg"/>
      </router-link>
      <router-link to="/gallery" class="city-home-page flex column">
        <h1>Kfar-Saba</h1>
        <img src="img/houses/house3.jpg"/>
      </router-link>
      <router-link to="/gallery" class="city-home-page flex column">
        <h1>Out of Israel</h1>
        <img src="img/houses/house4.jpg"/>
      </router-link> -->
    </div>
  </div>
</template>

<script>
// import ImageRender from "@/components/ImageRender.vue";


export default {
  name: 'home',
  components: {
    // ImageRender
  },
  data() {
    return {
      filterBy: {
        city: '',
        allCategories: true,
        category: [],
      },
      src: null,
    }
  },
  created: {

  },
  methods: {
    setFilter(city) {
      this.filterBy.city = city;
      this.$store.dispatch({ type: "setFilter", filterBy: this.filterBy });
      // return this.setCityImg(city)
      //   .then(house => {
      //     this.src = house.src[0];
      //     console.log('this.src back' , this.src);
      //   })
    },
    setCityImg(city) {
      // return 'img/houses/house4.jpg' // this is working!!!
      // var src;
      return this.getHouseByCity(city)
        .then(house => {
          this.src = house.src[0];
          // let src = this.src;
          // console.log('src back' , src);
          console.log('this.src back' , this.src);
        })
      // return this.src;
    },
    getHouseByCity(city) {
      return this.$store.dispatch({ type: "getHouseByCity", city: city })
      // this.$store.dispatch({ type: "getHouseByCity", city: city })
      //   .then(house => {
      //     return house;
      //   })
    }
  },
  computed: {
    allCities() {
      return this.$store.getters.allCities;
    },
  }
}
</script>

<style>
  .home-text {
    width: 80%;
    margin: 50px auto;
    font-size: 1.5em;
  }
  .cities {
    flex-wrap: wrap;
    width: 80%;
    margin: auto;
  }
  .city-home-page {
    border: 1px solid;
    margin: 30px;
  }
  .city-home-page>img {
    width: 375px;
    height: 260px;
    padding: 20px;
  }
  .city-home-page>h1 {
    margin: auto;
  }
</style>
