<script>
import HeaderNav from '../components/header.vue'
import FooterText from '../components/footer.vue'
const axios = require('axios')

export default {
  name: "ParamsUser",
  components: {
    HeaderNav,
    FooterText
  },
  data(){
    return {
      curFiles: '',
      userInfo: '',
      paraContent: '',
      user: '',
      sendVar: false,
      oldpw: '',
      pw: '',
      pwConfirmation: ''
    }
  },
  beforeCreate(){
    let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    if(!userInfo){
      this.$router.push({path: '/login'});
    }
  },
  beforeMount(){
    this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'));

    axios.get(`http://localhost:3000/api/params/${this.userInfo[0]}`, {
      headers:{
          'Authorization' : `Token ${this.userInfo[1]}`
      }
    })
    .then(response => {
      this.user = response.data
    })
    .catch(error => {
      alert(`Quelque chose s'est mal passé. Essayez à nouveau! ${error}`)
    });
  },
  methods: {
    imageInput(){
      let input = document.querySelector('#file');

      var fileTypes = [
        'image/jpeg',
        'image/png'
      ]

      function validFileType(file) {
        for(var i = 0; i < fileTypes.length; i++) {
          if(file.type === fileTypes[i]) {
            return true;
          }
        }

        return false;
      }

      function returnFileSize(number) {
        if(number < 1024) {
          return number + ' octets';
        } else if(number >= 1024 && number < 1048576) {
          return (number/1024).toFixed(1) + ' Ko';
        } else if(number >= 1048576) {
          return (number/1048576).toFixed(1) + ' Mo';
        }
      }

      this.curFiles = input.files;
      if(this.curFiles.length === 0) {
        this.paraContent = 'No files currently selected for upload';
      } else {
        for(let i = 0; i < this.curFiles.length; i++) {
          if(validFileType(this.curFiles[i])) {
            this.paraContent = this.curFiles[i].name + ' ' + returnFileSize(this.curFiles[i].size) + '.';

            this.user.picture = window.URL.createObjectURL(this.curFiles[i]);

          } else {
            this.paraContent = this.curFiles[i].name + ": Ce n'est pas un type de données valide.";
            this.user.picture = null
          }
        }
      }
    },
    pseudoInput() {
      let testVar = this.$store.state.regex.text.test(this.user.pseudo);
      if(testVar === true){
        this.sendVar = true
      } else{
        this.sendVar = false
      }
    },
    emailInput() {
      let testVar = this.$store.state.regex.email.test(this.user.email);
      if(testVar === true){
        this.sendVar = true
      } else{
        this.sendVar = false
      }
    },
    bioInput() {
      let testVar = this.$store.state.regex.text.test(this.user.bio);
      if(testVar === true){
        this.sendVar = true
      } else{
        this.sendVar = false
      }
    },
    /*passwordInput() {
      let testVar = this.$store.state.regex.password.test(this.pw);
      if(testVar === true){
        this.sendVar = true
      } else{
        this.sendVar = false
      }
    },*/
    sendUserParams() {
      if(this.sendVar === true || this.curFiles){
        let formData = new FormData()
        let image = this.curFiles[0]

        let newUser = {
          pseudo : this.user.pseudo,
          email : this.user.email,
          bio : this.user.bio,
          id : this.user.id
        }

        formData.append('newUser', JSON.stringify(newUser));
        if (image) {
            formData.append('image', image);
        }
        
        axios.put(`http://localhost:3000/api/params/${this.user.id}`, formData, {
          headers:{
              'Content-Type': 'multipart/form-data',
              'Authorization' : `Token ${this.userInfo[1]}`
          }
        })
        .then(response => {
          this.userInfo[2] = response.data.pseudo
          this.userInfo[3] = response.data.picture
          sessionStorage.setItem('userInfo', JSON.stringify(this.userInfo));
          this.$router.push({path: '/activity'});
        })
        .catch(error => {
          alert(`Quelque chose s'est mal passé. Essayez à nouveau! ${error}`)
        });
      } else{
        alert('Vous ne pouvez pas sauver ces parametres')
      }
    }
  }
}
</script>

<template>
  <div>
    <HeaderNav />
      <main>
        <form>
          <h3>MON COMPTE</h3>
          <div class="user-change">
            <label for="file" id="file-label">
              <img v-if="user.picture === null" src="../assets/user.svg" class="user">
              <img v-else :src="user.picture" class="user">
              <i class="fa-regular fa-image"></i>
            </label>
            <input @change="imageInput" id="file" type="file">
            <p>{{paraContent}}</p>
          </div>
          <div class="params">
            <label for="username">Nom d'utilisateur</label>
            <input @change="pseudoInput" type="text" name="username" v-model="user.pseudo">

            <label for="email">Email</label>
            <input @change="emailInput" type="text" name="email" v-model="user.email">

            <label for="bio">Bio</label>
            <textarea @change="bioInput" name="bio" placeholder="Écrivez quelque chose à propos de vous" v-model="user.bio"></textarea>
          </div>
          <button @click="sendUserParams" id="save" type="button">Enregistrer</button>
        </form>
        <div class="section-right">
          <form id="pw">
            <h3>MOT DE PASSE</h3>
            <div class="params">
              <label for="old-passeword">Ancien mot-de-passe</label>
              <input type="text" name="old-passeword" v-model="oldpw">

              <label for="new-password">Nouveau mot-de-passe</label>
              <input type="text" name="new-password" v-model="pw">

              <label for="new-password-confirmation">Confirmation du nouveau mot-de-passe</label>
              <input type="text" name="new-password-confirmation" v-model="pwConfirmation">
            </div>
            <button id="save" type="button">Enregistrer</button>
          </form>
          <button id="delete" type="submit">Supprimer l'utilisateur</button>
        </div>
      </main>
    <FooterText/>
  </div>
</template>

<style scoped lang="scss">
  $pink-peach : #d1515a; 
  $light-blue : #325c9b;
  $dark-grey : #121212;
  $grey : #272727;

   main{
    padding: 5px 15px 70px 15px;
    text-align: center;
  }

  .user{
    margin-top: 10px;
    width: 70px;
    transition-duration: 300ms;
    border-radius: 100px;
    height: 70px;
    object-fit: cover;
  }

  form{
    width: 95%;
    background: $grey;
    border-radius: 15px;
    padding: 4px 15px;
    margin-top: 20px;
  }

  .section-right{
    width: 100%;
  }

  .user-change{
    display: flex;
    i{
      font-size: 14px;
      color: $dark-grey;
      position: absolute;
      margin: 3px 0 0 -23px;
      padding: 6px;
      background: #ffffff73;
      border-radius: 30px;
      transition-duration: 300ms;
    }
    p{
      color: $light-blue;
      font-size: 13px;
      margin-right: 10px;
      padding: 40px 0 0 10px;
    }
  }

  #file{
    display: none;
  }

  #file-label{
    cursor: pointer;
    &:hover .user {
      filter : brightness(150%);
    }
    &:hover i{
      transform: scale(1.1);
    }
  }

  h2{
    font-weight: 100;
    color: $pink-peach;
    margin: 22px 0 0 10px;
  }

  .params{
    display: flex;
    flex-direction: column;
    padding-top: 20px;
    text-align: left;
  }

  h3{
    display: none;
  }

  label{
    color: $pink-peach;
    font-size: 16px;
  }

  input, textarea{
    margin: 5px 0 25px 0;
    padding: 15px;
    font-size: 19px;
    border-radius: 13px;
    border: 3px $light-blue solid;
  }

  textarea{
    max-width: 100%;
    min-width: 100%;
    max-height: 250px;
    min-height: 63px;
  }

  button{
    cursor: pointer;
    margin: 30px 0 50px 10px;
    padding: 17px 45px;
    border-radius: 50px;
    border:  none;
    font-size: 20px;
    font-weight: bold;
    transform: scale(1.0);
    transition-duration: 300ms;
    z-index: 1;
    &:hover{
      background: $pink-peach;
      transform: scale(1.05);
    }
  }

  #save{
    color: white;
    background: $light-blue;
  }

  #delete{
    margin-top: 80px;
    color: white;
    background: #a6131f;
  }

  @media screen and (min-width: 1025px) {

    main{
      padding-top: 100px;
      display: flex;
    }

    form{
      margin: 20px;
      padding: 15px 40px;
    }

    #pw{
      height: 600px;
    }

    .user-change{
      background: none;
      i{
        font-size: 18px;
        padding: 8px;
        margin: 6px 0 0 -32px;
      }
      p{
        font-size: 15px;
        padding: 60px 0 0 10px;
      }
    }

    .user{
      width: 120px;
      height: 120px;
    }

    h2{
      margin-top: 10px;
      font-size: 27px;
    }

    h3{
      display: flex;
      justify-content: center;
      color: white;
      margin-bottom: 30px;
      font-size: 23px;
    }

    label{
      font-size: 20px;
    }

    input, textarea{
      font-size: 22px;
    }

    button{
      padding: 19px 60px;
      font-size: 23px;
    }
  }
</style>