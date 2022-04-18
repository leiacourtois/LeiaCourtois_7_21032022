<script>
export default {
  name: 'HeaderNav',
  data() {
    return {
      online: true
    }
  },
  beforeMount() {
    /*this.online = this.$store.state.online*/
  }
}
</script>

<template>
  <div>
    <header v-if="online === false" class="offline">
      <div class="logo-offline">
        <router-link to="/">
          <img src="../assets/logo.svg" id="logo">
          <img src="../assets/groupomania.svg" id="text">
          <span class="line-logo line-logo-offline"></span>
        </router-link>
      </div>
      <nav class="nav-offline">
        <router-link to="/login">Se connecter</router-link>
        <router-link to="/signup">S'inscire</router-link>
      </nav>
    </header>
    <header v-if="online === true" class="online">
      <router-link to="/activity" class="logo-online">
          <img src="../assets/logo.svg" id="logo">
          <img src="../assets/groupomania.svg" id="text">
          <span class="line-logo line-logo-offline"></span>
      </router-link>
      <nav class="nav-online">
        <div>
          <router-link to="/login"><i class="fa-solid fa-arrow-right-from-bracket"></i></router-link>
          <router-link to="/params"><i class="fa-solid fa-screwdriver-wrench"></i></router-link>
        </div>
        <router-link to="/dashboard">
          <img src="../assets/user.svg" id="user-nav">
          <span class="log-on"></span>
        </router-link>
      </nav>
    </header>
  </div>
</template>

<style scoped lang="scss">
  $pink-peach : #d1515a; 
  $dark-blue : #122542;

  #logo{
    width: 16%;
    padding:0 5px 5px 0;
    max-width: 60px;
  }

  #text{
    width: 100%;
    max-width: 330px;
  }

  .line-logo{
    position: absolute;
    height: 3px;
    background: $dark-blue;
    transform: scaleX(0);
    transition-duration: 500ms;
  }

  /*offline*/

  .offline{
    background: $pink-peach;
    padding: 20px;
    z-index: 2;
  }

  .logo-offline{
    display: flex;
    margin-bottom: 20px;
    a{
      padding: 15px 15px 8px 13px;
      background: $pink-peach;
      display: flex;
      justify-content: center;
      &:hover img{
        filter : opacity(80%);
      }
    }
  }

  .nav-offline{
    display: flex;
    justify-content: flex-end;
    width: 100%;
    a{
      text-decoration: none;
      color: white;
      font-size: 17px;
      margin-left: 20px;
      padding-bottom: 5px;
      border-bottom: 3px #fff0 solid;
      transition-duration: 500ms;
      &:hover{
        transform: scale(1.05);
        border-bottom: 3px $dark-blue solid;
      }
    }
  }

  .line-logo-offline{
    margin-top: 62px;
    width: 400px;
  }

  /*online*/

  .online{
      display: flex;
      flex-direction: column-reverse;
      z-index: 2;
    }

  .logo-online{
    padding: 15px 15px 8px 13px;
    background: #d1515a;
    display: flex;
    justify-content: center;
    &:hover img{
      filter : opacity(80%);
    }
  }

  .line-logo-online{
    margin-top: 57px;
    width: 388px;
  }

  .nav-online{
    display: flex;
    justify-content: space-between;
    padding: 5px 10px;
    div{
      height: 100%;
    }
    i{
      color: #325c9b;
      font-size: 33px;
      margin: 10px 10px 0 10px;
      transition-duration: 300ms;
      z-index: 1;
      &:hover{
        color:  #122542;
        transform: scale(0.9);
      }
    }
  }

  #user-nav{
    width: 50px;
  }

  .log-on{
    position: absolute;
    top: 39px;
    right: 10px;
    width: 18px;
    height: 18px;
    background: #2de500;
    border-radius: 20px;
    border: 4px #121212 solid;
  }

  @media screen and (min-width: 1025px) {
    #logo{
      width: 19%;
    }

    #text{
      width: 100%;
    }

    /*offline*/
    .offline{
      position: fixed;
      width: 100%;
    }

    .nav-offline{
      width: 96%;
      a{
        font-size: 21px;
      }
    }

    .logo-offline a{
      padding: 5px 15px;
      width: 410px;
      &:hover .line-logo{
        transform: scaleX(1.0);
      }
      &:hover img{
        filter : opacity(100%);
      }
    }

    /*online*/

    .online{
      flex-direction: row;
      justify-content: space-between;
      background: #d1515a;
      padding-top: 5px;
      position: fixed;
      width: 100%;
    }

    .logo-online{
      padding: 5px 15px;
      width: 410px;
      &:hover .line-logo{
        transform: scaleX(1.0);
      }
      &:hover img{
        filter : opacity(100%);
      }
    }

    .nav-online i{
      color: #272727;
      font-size: 32px;
      margin: 17px 29px 0 -10px;
    }

    #user-nav{
      width: 60px;
    }

    .log-on{
      top: 52px;
      width: 20px;
      height: 20px;
      border: 4.5px #d1515a solid;
    }
  }
</style>
