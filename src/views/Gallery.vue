<template>
    <section>
        <div class="images-container-gallery flex ">
            <house-list class="house-list container flex" :houses="HousesForDisplay" ></house-list>
        </div>
    </section>
</template>

<script>
import HouseList from "@/components/HouseList.vue";

export default {
name: "gallery",
  components: {
    HouseList,
  },
  created() {
      this.loadHouses();
  },
  computed: {
    HousesForDisplay() {
      return this.$store.getters.HousesForGallery;
    },
  },
  methods: {
    loadHouses() {
      this.$store
        .dispatch({ type: "loadHouses" })
        .then(houses => {})
        .catch(err => {
          console.log("err", err);
        });
    },
  }
}
</script>

<style>

</style>
