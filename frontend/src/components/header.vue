<template>
  <header>
    <div class="logo">
      <a href="#">
        <img src="../assets/logo.svg" id="logo">
        <img src="../assets/groupomania.svg" id="text">
        <span class="line-logo"></span>
      </a>
    </div>
    <nav>
      <a href="#">Se connecter</a>
      <a href="#">S'inscire</a>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'header',
  components: {
    BaseButton
  },
  data() {
    return {
      online: false
    }
  },
  beforeMount() {
    const today = new Date().getDate()

    if (today % 2 === 0) {
      this.onSale = true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
</style>
