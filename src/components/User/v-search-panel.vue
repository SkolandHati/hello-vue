<template>
    <div class="search">
        <form action="" method="get">
            <span class="span-search">
                <input class="panel-search" placeholder="Поиск по сайту..." type="search">
                <button class="fa-thin" type="submit"></button>
            </span>
        </form>
    </div>
</template>

<script>
    export default {
        name: "v-searcvh-panel",
        components: {
        },
        props:{

        },
        data(){
            return{}
        },
        computed: {

        }

    }
</script>

<style>
    .search>form { 
        display: flex;
    }
    .search>form>.span-search{
        display: flex;
        height: 50px;
        width: 650px;
        padding-left: 40%;
        border-radius: 5px;
    }
    .search>form>.span-search>input{
        width: 300px;
        height: 30px;
        margin-top: 10px;
        border: 2px solid #7BA7AB;
        border-radius: 5px 0px 0px 5px;
        outline: none;
        background: #edf8ff;
    }
    .search>form>.span-search>.fa-thin {
        margin-top: 10px;
        height: 30px;
        width: 30px;
        background: #7BA7AB;
        border: 2px solid #7BA7AB;
        border-radius: 0px 5px 5px 0px;
        cursor: pointer;
    }
    .search>form>.span-search>button:before {
        content: "\f002";
        font-family: FontAwesome;
        font-size: 16px;
        color: #ffffff;
    }
</style>