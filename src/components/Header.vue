<template>
    <div class="header-container flex column">
        <div class="header-title flex">
            <div class="admin">
                <img src="img/logo-sarit.png"/>
                <div class="phone flex">
                    <p>📞</p>
                    <h4> +972-54-5222395</h4>
                </div>
            </div>
            <div class="header-center flex column">
                <div class="flags flex">
                    <img src="img/en.png" class="flag"/>
                    <img src="img/es.png" class="flag"/>
                    <img src="img/fr.png" class="flag"/>
                    <img src="img/he.png" class="flag"/>
                </div>
                <h1>Nadlan</h1>
            </div>
            <div class="admin">
                <img src="img/logo-ruthi.png"/>
                <div class="phone flex">
                    <p>📞</p>
                    <h4> +972-54-4842920</h4>
                </div>
            </div>
        </div>
        <Navbar class="navbar"/>
    </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";

export default {
    components: {
    Navbar,
  }
}
</script>

<style>
.header-container {
    width: 80%;
    margin: auto;
}
.header-title {
    justify-content: space-between;
}
.header-title>h1 {
    margin: auto;
}
.navbar {
    /* margin: auto; */
}
.admin>img {
    width: 280px;
    height: 130px;
}
.admin>h4 {
    font-size: 1.2em;
}
.header-center {
    /* justify-content: space-between; */
}
.flags {
    margin-bottom: 20px;
}
.flag {
    width: 26px;
    height: 20px;
    padding: 2px;
}
.column {
    flex-direction: column;
}
.phone {
    border: 1px solid;
    border-radius: 15px;
    justify-content: center;
    margin: 10px;
}
.phone>h4 {
    margin: 0;
    padding: 10px 2px;
}
.phone>p {
    color: green;
    margin: 0;
    padding: 10px 2px;
}
</style>
