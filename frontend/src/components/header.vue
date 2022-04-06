<script>
export default {
  name: 'HeaderNav',
  data() {
    return {
      online: false
    }
  },
  beforeMount() {
    this.online = this.$store.state.online
  }
}
</script>

<template>
  <div>
    <header v-if="online === false">
      <div class="logo">
        <a href="/">
          <img src="../assets/logo.svg" id="logo">
          <img src="../assets/groupomania.svg" id="text">
          <span class="line-logo"></span>
        </a>
      </div>
      <nav>
        <router-link to="/login">Se connecter</router-link>
        <router-link to="/signup">S'inscire</router-link>
      </nav>
    </header>
    <header v-if="online === true">
      <p>Coucou</p>
    </header>
  </div>
</template>

<style scoped lang="scss">
  $pink-peach : #d1515a; 
  $dark-blue : #122542;

  header{
    background: $pink-peach;
    padding: 20px;
  }

  .logo{
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
    margin-top: 62px;
    width: 400px;
    height: 3px;
    background: $dark-blue;
    transform: scaleX(0);
    transition-duration: 500ms;
  }

  nav{
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
  @media screen and (min-width: 1025px) {
    header{
      position: fixed;
      width: 100%;
    }

    nav{
      width: 96%;
    }

    nav a{
      font-size: 21px;
    }

    .logo a{
      padding: 5px 15px;
      width: 410px;
      &:hover .line-logo{
        transform: scaleX(1.0);
      }
      &:hover img{
        filter : opacity(100%);
      }
    }

    #logo{
      width: 19%;
    }

    #text{
      width: 100%;
    }
  }
</style>
