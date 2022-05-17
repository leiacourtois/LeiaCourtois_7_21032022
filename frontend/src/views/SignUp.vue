<script>
import HeaderNav from '../components/header.vue'
import FooterText from '../components/footer.vue'
const axios = require('axios')
export default {
  name: "SignUp",
  components: {
    HeaderNav,
    FooterText
  },
  data() {
    return{
      sendVar: false,
      pseudo:'',
      email: '',
      password: '',
      passwordConfirmation: ''
    }
  },
  beforeCreate(){
    let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    if(userInfo){
      this.$router.push({path: '/activity'});
    }
  },
  methods: {
    pseudoInput() {
      let testVar = this.$store.state.regex.text.test(this.pseudo);
      if(testVar === true){
        document.getElementsByClassName('errorMsg__Pseudo')[0].innerHTML= ''
        this.sendVar = true
      } else{
        document.getElementsByClassName('errorMsg__Pseudo')[0].innerHTML= 'Saisie invalide'
        this.sendVar = false
      }
    },
    emailInput() {
      let testVar = this.$store.state.regex.email.test(this.email);
      if(testVar === true){
        document.getElementsByClassName('errorMsg__Email')[0].innerHTML= ''
        this.sendVar = true
      } else{
        document.getElementsByClassName('errorMsg__Email')[0].innerHTML= 'Saisie invalide'
        this.sendVar = false
      }
    },
    passwordInput() {
      let testVar = this.$store.state.regex.password.test(this.password);
      if(testVar === true){
        document.getElementsByClassName('errorMsg__pw')[0].innerHTML= ''
        this.sendVar = true
      } else{
        document.getElementsByClassName('errorMsg__pw')[0].innerHTML= 'Votre mot-de-passe est trop faible'
        this.sendVar = false
      }
    },
    sendData() {
      if(this.sendVar === true){
        if( this.password === this.passwordConfirmation){
          let user = {
            pseudo : this.pseudo,
            email : this.email,
            password : this.password,
          }
          axios.post('http://localhost:3000/api/auth/signup', user, {
            headers:{
                'Content-Type': 'application/json'
            }
          })
          .then(() => {
            axios.post('http://localhost:3000/api/auth/login', user, {
              headers:{
                  'Content-Type': 'application/json'
              }
            })
            .then(response =>{
              let userArray = [response.data.id, response.data.token, response.data.pseudo, response.data.picture, response.data.role]
              sessionStorage.setItem('userInfo', JSON.stringify(userArray));
              this.$store.state.online = true
              this.$router.push({path: '/activity'});
            })
            .catch(error => {
              alert(`Quelque chose s'est mal passé. ${error}`)
            });

          })
          .catch(error => {
            alert(`Quelque chose s'est mal passé. Essayez à nouveau! ${error}`)
          });
        } else{
          alert('Mot-de-passe invalide')
        }
      } else{
        alert('Certains champs sont invalides')
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
        <input @change="emailInput" type="text" name="email" v-model="email"/>
        <p class="errorMsg errorMsg__Email"></p>

        <label for="password">Mot-de-passe*</label>
        <input @change="passwordInput" type="password" name="password" v-model="password"/>
        <p class="errorMsg errorMsg__pw"></p>

        <label for="password">Confirmation du mot-de-passe*</label>
        <input type="password" name="password" v-model="passwordConfirmation"/>

        <button @click="sendData" type="button" >S'inscrire</button>
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
    margin: 5px 0 5px 0;
    padding: 15px;
    font-size: 19px;
    border-radius: 13px;
    border: 3px $light-blue solid;
  }

  .errorMsg{
    margin-bottom: 45px;
    color: $light-blue;
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
