<script>
import HeaderNav from '../components/header.vue'
import FooterText from '../components/footer.vue'

export default {
  name: "LogIn",
  components: {
    HeaderNav,
    FooterText
  },
}
</script>

<template>
  <div>
    <HeaderNav />
    <main>
      <div class="title">
        <h1>SE CONNECTER</h1>
      </div>
      <form>
        <label for="email">Email</label>
        <input type="text" name="email">

        <label for="password">Mot-de-passe</label>
        <input type="text" name="password">

        <button type="submit">Se connecter</button>
      </form>
    </main>
    <FooterText/>
  </div>
</template>

<style scoped lang="scss">
  $pink-peach : #d1515a; 
  $light-blue : #325c9b;
  $grey : #272727;
  $dark-blue : #122542;

  /*content*/

  main{
    padding: 10px 20px;
  }

  h1{
    color: white;
    font-size: 20px;
  }

  .title{
    border-bottom: 3px $grey solid;
    padding-bottom: 10px;
  }

  form{
    padding-top: 30px;
    display: flex;
    flex-direction: column;
  }

  label{
    color: $pink-peach;
    font-size: 19px;
  }

  input{
    margin: 5px 0 50px 0;
    padding: 15px;
    font-size: 19px;
    border-radius: 13px;
    border: 3px $light-blue solid;
  }

  button{
    padding: 20px;
    margin: 10px auto 70px auto;
    border-radius: 50px;
    border:  none;
    font-size: 20px;
    background: $light-blue;
    color: white;
    font-weight: bold;
    width: 200px;
    transition-duration: 300ms;
    &:hover{
      transform: scale(1.05);
      background: $pink-peach;
    }
  }

  @media screen and (min-width: 1025px) {
    main{
      padding-top: 190px;
    }

    h1{
      font-size: 27px;
    }

    label{
      font-size: 21px;
    }

    form{
      margin: 0 25%;
    }

    input{
      font-size: 21px;
      padding: 18px 15px;
    }

    button{
      font-size: 23px;
    }

  }
</style>

