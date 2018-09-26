<template>
    <section>
        <div class="images-container-gallery flex ">
            <house-list class="house-list container flex" :houses="HousesForDisplay" ></house-list>
            <house-filter></house-filter>
        </div>
    </section>
</template>

<script>
import HouseList from "@/components/HouseList.vue";
import HouseFilter from "@/components/HouseFilter.vue";

export default {
name: "gallery",
  components: {
    HouseList,
    HouseFilter
  },
  created() {
      // this.loadHouses();
  },
  computed: {
    HousesForDisplay() {
      return this.$store.getters.HousesForGallery;
    },
  },
  methods: {
    // loadHouses() {
    //   this.$store
    //     .dispatch({ type: "loadHouses" })
    //     .then(houses => {})
    //     .catch(err => {
    //       console.log("err", err);
    //     });
    // },
  }
}
</script>

<style>

</style>
