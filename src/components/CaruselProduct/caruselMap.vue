<template>
    <div class="brend-image">
        <h1>PRODUCTS</h1>
        <img :src="require('../assets/images/Kenzo/' + product.image)" alt="img">
        <p class="name-product">{{product.name}}</p>
        <p>{{product.price}}</p>
    </div>
</template>

<script>
    export default {
        name: "caruselMap",
        props:{
            product:{
                type: Object,
                require: true,
            },
        },
    }
</script>

<style>
    .container {
        background-color: rgb(0, 107, 201);
        /* position:absolute;
            left:0px; */
    }
    .brend-image{
        background-color: rgb(89, 138, 182);
    }
    .brend-image>img{
        background-color: rgb(121, 165, 208);
        width: 380px;
        height: 500px;
        /* margin-top: 5%; */
        -webkit-overflow-scrolling: auto;
        /* position:absolute;
            left:0; */
    }
    .image-header {
        padding-top: 3%;
        color: black;
        text-align: center;
        font-size: 25px;
    }
</style>