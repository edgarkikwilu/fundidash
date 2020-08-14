<template>
  <div id="app">
    <!-- <router-view name="login" v-if="!isAuth"/> -->
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
// import {mdbNavBar,mdbNavItem,mdbNavBarBav,mdbSideNav2,mdbAvatar,mdbBtn,mdbIcon} from 'mdbvue'

export default {
  name: 'App',
  data:function(){
    return {
      isAuth:false
    }
  },
  mounted(){
    // this.isAuth = this.$isAuth
    //     if (this.isAuth) {
    //       this.$router.push({name:'home'})
    //     }
    }
  // components:{mdbNavBar,mdbNavItem,mdbNavBarBav,mdbSideNav2,mdbAvatar,mdbBtn,mdbIcon}
}
</script>

<style lang="scss">
$image-path: '../mdb/mdbvue/img';
@import '../mdb/mdbvue/scss/mdb-free.scss';

@import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap');

@font-face {
  font-family: "voda-bold";
  src: local("voda-bold"),
      url(./font/VodafoneRg-Bold.ttf) format("truetype");
}

@font-face {
  font-family: "voda-rg";
  src: local("voda-rg"),
      url(./font/VodafoneRg-Regular.ttf) format("truetype");
}

#app {
  text-align: center;
  // margin-top: 150px;
}
</style>
