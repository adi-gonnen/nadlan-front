<template>
    <div class="nav flex">
        <router-link to="/">Home</router-link>
        <router-link to="/gallery">Gallery</router-link>
        <router-link to="/about">About</router-link>
        <router-link to="/article">Articles</router-link>
        <!-- <router-link to="/raanana">Ra'anana</router-link>
        <router-link to="/kfar-saba">Kfar-Saba</router-link>
        <router-link to="/herzelia">Herzelia</router-link>
        <router-link to="/abroud">Out of Israel</router-link> -->
        <router-link to="/contact">Contact</router-link>
    </div>
</template>

<script>
export default {

};
</script>

<style>
.nav {
    /* justify-content: space-around; */
    align-items: center;
    margin: 20px auto;
    /* width: 50% */
}
.nav>a {
    padding: 5px;
    font-size: 1.5em;
    text-decoration: none;
}
.flex {
    display: flex;
}
</style>
