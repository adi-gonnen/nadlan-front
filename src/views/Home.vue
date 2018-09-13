<template>
  <div class="home">
    <p class="home-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    <div class="cities flex">
      <div class="city-home-page flex column">
        <h1>Herzelia</h1>
        <img src="img/houses/house1.jpg"/>
      </div>
      <div class="city-home-page flex column">
        <h1>Ra'anana</h1>
        <img src="img/houses/house2.jpg"/>
      </div>
      <div class="city-home-page flex column">
        <h1>Kfar-Saba</h1>
        <img src="img/houses/house3.jpg"/>
      </div>
      <div class="city-home-page flex column">
        <h1>Out of Israel</h1>
        <img src="img/houses/house4.jpg"/>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'home',
  components: {
    
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
