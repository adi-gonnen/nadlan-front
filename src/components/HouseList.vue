<template>
  <div class="house-list flex">
        <ul class="house-cards-container flex" v-if="houses">
          <div class="game game-preview clean-list" v-for="house in houses" :key="house._id">
            <router-link class="btn btn-more-details" :to="'/house/'+house._id">
                <house-preview :house="house"></house-preview>
            </router-link>
          </div>
        </ul>
  </div>
</template>

<script>
import HousePreview from "@/components/HousePreview.vue";

export default {
  name: "HouseList",
  props: ["houses"],
  components: {
    HousePreview
  },
  created() {
    console.log('houses from list:', this.houses);
  }
};
</script>
<style>
.house-cards-container {
  flex-wrap: wrap;
}
</style>