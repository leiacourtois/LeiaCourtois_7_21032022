<script>
import HeaderNav from '../components/header.vue'
export default {
  name: "SignUp",
  components: {
    HeaderNav
  },
  data() {
    return{
      pseudo:'',
      email: '',
      password: '',
      passwordConfirmation: ''
    }
  },
  methods: {
    pseudoInput() {
      let testVar = this.$store.state.regex.text.test(this.pseudo);
      if(testVar === true){
        document.getElementsByClassName('errorMsg__Pseudo')[0].innerHTML= ''
      } else{
        document.getElementsByClassName('errorMsg__Pseudo')[0].innerHTML= 'Saisie invalide'
      }
    },
    sendData() {
      if( this.password === this.passwordConfirmation){
        let user = {
          pseudo : this.pseudo,
          email : this.email,
          password : this.password,
        }
        alert(user)
      }
    }
  },
}
</script>

<template>
  <div>
    <HeaderNav />
    <main>
      <div class="title">
        <h1>S'INSCIRE</h1>
      </div>
      <form>
        <label for="username">Nom d'utilisateur*</label>
        <input @change="pseudoInput" type="text" name="username" v-model="pseudo"/>
        <p class="errorMsg errorMsg__Pseudo"></p>

        <label for="email">Email*</label>
        <input type="text" name="email" v-model="email"/>

        <label for="password">Mot-de-passe*</label>
        <input type="password" name="password" v-model="password"/>

        <label for="password">Confirmation du mot-de-passe*</label>
        <input type="password" name="password" v-model="passwordConfirmation"/>

        <button @click="sendData" type="submit">S'inscrire</button>
      </form>
    </main>

    <footer>
      <p>© Groupomania 2022</p>
    </footer>
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
