<template>
    <div class="filter-gallery-container  flex flex-start ">
    <div name="slowDisplay">
        <div class="checkbox-filter-container capitalize">
            <div class="filter-menu">
                <!-- <h3 class="filter-header category">Category</h3> -->
                <el-checkbox class="checkbox-filter" label="All categories" :value="filterBy.allCategories" @change="toggleAllCategories"></el-checkbox>
                <el-checkbox-group class="checkbox-filter" v-model="filterBy.category" v-if="allFilterCategories" @change="setFilter">
                    <ul class="checkbox flex column">
                        <li v-for="oneCategory in allFilterCategories" :key="oneCategory">
                            <el-checkbox class="checkbox-filter" :label="oneCategory"></el-checkbox>
                        </li>
                    </ul>
                </el-checkbox-group>
            </div>
            <div class="filter-menu">
                <!-- <h3 class="filter-header">City</h3> -->
                <el-checkbox class="checkbox-filter" label="All cities" :value="filterBy.allCities" @change="toggleAllCities"></el-checkbox>
                <el-checkbox-group class="checkbox-filter" v-model="filterBy.city" v-if="allFilterCities" @change="setFilter">
                    <ul class="checkbox flex column">
                        <li v-for="oneCity in allFilterCities" :key="oneCity">
                            <el-checkbox class="checkbox-filter" :label="oneCity"></el-checkbox>
                        </li>
                    </ul>
                </el-checkbox-group>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
import debounce from "lodash.debounce";
import HouseService from "@/services/HouseService.js";

export default {
  components: {},
  data() {
    return {
      filterBy: {
        city: '',
        allCategories: true,
        category: [],
      },
      allFilterCities: null,
      allFilterCategories: null
    };
  },
  created() {
    this.allFilterCities = this.$store.getters.allCities;
    this.allFilterCategories = this.$store.getters.allCategories;
    // console.log("allFilterCategories in home", this.allFilterCategories);
    this.filterBy = JSON.parse(
      JSON.stringify(this.$store.state.HouseModule.filterBy)
    );

    this.$store.dispatch({
      type: "setFilter",
      filterBy: this.$store.state.HouseModule.filterBy
    });
  },
  methods: {
    setFilter: debounce(function() {
      var filterBy = JSON.parse(JSON.stringify(this.filterBy));
      console.log('var filterBy', filterBy);
      this.$store.dispatch({ type: "setFilter", filterBy }).then(houses => {});
    }, 500),
    toggleAllCategories() {
      this.filterBy.allCategories = !this.filterBy.allCategories;
      if (this.filterBy.allCategories) this.filterBy.category = [];
      this.setFilter();
    }
  },
  watch: {
    ["filterBy.city"]() {
      if (this.filterBy.city.length > 0)
        this.filterBy.allCities = false;
    },
    ["filterBy.category"]() {
      if (this.filterBy.category.length > 0)
        this.filterBy.allCategories = false;
    }
  }
};
</script>

<style scoped lang="scss">
// @import "~@/assets/scss/style.scss";


</style>