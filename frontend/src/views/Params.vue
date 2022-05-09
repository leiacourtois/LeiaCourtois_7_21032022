<script>
import HeaderNav from '../components/header.vue'
import FooterText from '../components/footer.vue'

export default {
  name: "ParamsUser",
  components: {
    HeaderNav,
    FooterText
  },
  data(){
    return {
      userInfo: ''
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
  },
  methods: {
  }
}
</script>

<template>
  <div>
    <HeaderNav />
      <main>
        <div class="user-change">
          <div>
            <label for="file" id="file-label">
              <img v-if="userInfo[3] === null" src="../assets/user.svg" class="user">
              <img v-else src="" class="user">
              <i class="fa-regular fa-image"></i>
            </label>
            <input @change="imageInput" id="file" type="file">
          </div>
          <h2>{{userInfo[2]}}</h2>
        </div>
        <form>
          <h3>MON COMPTE</h3>
          <label for="username">Nom d'utilisateur</label>
          <input type="text" name="username">

          <label for="email">Email</label>
          <input type="text" name="email">

          <label for="bio">Bio</label>
          <textarea name="bio" placeholder="Écrivez quelque chose à propos de vous"></textarea>

          <button type="submit">Enregistrer</button>
        </form>
        <form>
          <h3>MOT DE PASSE</h3>
          <label for="old-passeword">Ancien mot-de-passe</label>
          <input type="text" name="old-passeword">

          <label for="new-password">Nouveau mot-de-passe</label>
          <input type="text" name="new-password">

          <label for="new-password-confirmation">Confirmation du nouveau mot-de-passe</label>
          <input type="text" name="new-password-confirmation">

          <button type="submit">Enregistrer</button>
        </form>
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
  }

  .user{
    width: 70px;
    transition-duration: 300ms;
  }

  form, .user-change{
    width: 100%;
    background: $grey;
    border-radius: 15px;
    padding: 4px 15px;
    margin-top: 20px;
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
    margin: 22px 0 0 20px;
  }

  form{
    display: flex;
    flex-direction: column;
    padding-top: 20px;
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
    padding: 17px 45px;
    margin: 10px auto 18px auto;
    border-radius: 50px;
    border:  none;
    font-size: 20px;
    background: $light-blue;
    color: white;
    font-weight: bold;
    transform: scale(1.0);
    transition-duration: 300ms;
    z-index: 1;
    &:hover{
      background: $pink-peach;
      transform: scale(1.05);
    }
  }

  @media screen and (min-width: 1025px) {

    main{
      display: flex;
      justify-content: space-around;
      padding-top: 90px;
    }

    .user-change{
      background: none;
      width: 16%;
      flex-direction: column;
      i{
        font-size: 18px;
        padding: 8px;
        margin: 6px 0 0 -32px;
      }
    }

    .user{
      width: 120px;
    }

    h2{
      margin: 10px 0 0 6px;
      font-size: 27px;
    }

    form{
      padding: 15px 40px;
      width: 38%;
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