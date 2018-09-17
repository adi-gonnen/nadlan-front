<template>
    <section> 
        <div class="house-preview flex column">
            <h1>{{house.txt.en.title}}</h1>
            <img :src="house.src[0]"/>
        </div>
    </section>
</template>

<script>
export default {
    name: "housePreview",
    props: ["house"]
}
</script>

<style>
/* .column {
    flex-direction: column;
} */
.house-preview {
    border: 1px solid;
    align-items: center;
    padding: 30px;
}
.house-preview>img {
    width: 350px;
    height: 260px;
}
.house-preview>h1 {
    font-size: 1.5em;
    margin: 0 0 20px 0;
}
a {
    text-decoration: none;
}
.house-preview {
    margin: 30px;
}
</style>
