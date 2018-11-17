<template>
    <div id="app">
        <m-header></m-header>
        <tab></tab>
       <keep-alive>
       		<router-view></router-view>
       </keep-alive>
       
       <!--keep-alive这个标签是路由跳转后不会重新请求数据！还是保存之前的状态-->
       <player></player>
    </div>
</template>

<script>
    import MHeader from "./components/m-header/m-header"
    import Tab from "./components/tab/tab"
    import Player from "./components/player/player"
  
    export default {
        components:{
            MHeader,
            Tab,
            Player,
        }
    }
</script>

<style>

</style>
