<script>
import FooterText from '../components/footer.vue'
import PostUsers from '../components/post.vue'
import FormPost from '../components/form.vue'
const axios = require('axios')
export default {
  name: "DashBoard",
  components: {
    FooterText,
    PostUsers,
    FormPost
  },
  data(){
    return {
      userInfo: '',
      user: '',
      posts: '',
      userBoardId: '',
      emailMailto: ''
    }
  },
  beforeCreate(){
    let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    if(!userInfo){
      this.$router.push({path: '/login'});
    }
  },
  beforeMount(){
    this.userBoardId = this.$route.params.id
    this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    axios.get(`http://localhost:3000/api/post/${this.userBoardId}`, {
      headers:{
          'Authorization' : `Token ${this.userInfo[1]}`
      }
    })
    .then(response => {
      this.posts = response.data.posts
      this.user = response.data
    })
    .catch(error => {
      alert(`Quelque chose s'est mal passé. Essayez à nouveau! ${error}`)
    });

    this.emailMailto = 'mailto:' + this.user.email
  },
  methods: {
    logOut() {
      sessionStorage.removeItem('userInfo');
      this.$store.state.online = false
      this.online = false
      this.$router.push({path: '/login'});
    }
  }
}
</script>

<template>
  <div>
    <header>
      <router-link to="/activity" class="logo">
          <img src="../assets/logo.svg" id="logo">
          <img src="../assets/groupomania.svg" id="text">
          <span class="line-logo"></span>
      </router-link>
      <nav>
        <i class="fa-solid fa-arrow-right-from-bracket" @click="logOut"></i>
        <router-link to="/params"><i class="fa-solid fa-screwdriver-wrench"></i></router-link>
      </nav>
      <router-link :to="{name: 'dashboard', params: { id: userInfo[0] }}"><img src="../assets/user.svg" id="user-nav"></router-link>
      <span class="log-on"></span>
    </header>

    <main>
      <aside>
        <div class="user-info">
          <h1>{{user.pseudo}}</h1>
          <h2 v-if="user.roleId === 1" >Employé</h2>
          <h2 v-else-if="user.roleId === 2">Admin</h2>
          <a :href="emailMailto"><p>{{user.email}}</p></a>
        </div>
        <div class="bio">
          <h3>Biographie</h3>
          <p>{{user.bio}}</p>
        </div>
      </aside>

      <FormPost v-if="userBoardId === userInfo[0]"/>
      <PostUsers
        v-for="post in posts"
        :pfp="user.picture"
        :pseudo="user.pseudo"
        :image="post.image"
        :text="post.text"
        :date="post.date"
        :userId="user.id"
        :id="post.id"
        :key="post.id"
      />
    </main>
    <FooterText/>
  </div>
</template>

<style scoped lang="scss">
  $pink-peach : #d1515a; 
  $light-blue : #325c9b;
  $dark-grey : #121212;
  $grey : #272727;

  /*nav*/

  header{
    display: flex;
    justify-content: space-between;
    background: #d1515a;
    width: 100%;
    z-index: 2;
  }

  .logo{
    padding: 10px 15px 5px 13px;
    background: #d1515a;
    display: flex;
    width: 590px;
  }

  #logo{
    width: 47px;
    padding:0 5px 5px 0;
    transition-duration: 300ms;
    z-index: 1;
  }

  .line-logo{
    position: absolute;
    margin-top: 44px;
    width: 45px;
    height: 3px;
    background: #122542;
    transform: scaleX(0);
    transition-duration: 500ms;
  }

  .logo:hover .line-logo{
    transform: scaleX(1.0);
  }

  #text{
    display: none;
    transition-duration: 300ms;
    z-index: 1;
  }

  nav{
    width: 100%;
    display: flex;
    justify-content: flex-end;
    padding: 5px 10px;
    div{
      width: 50%;
    }
    i{
      color: #272727;
      font-size: 24px;
      margin: 15px 0 0 28px;
      transition-duration: 300ms;
      z-index: 1;
      cursor: pointer;
      &:hover{
        color:  #122542;
        transform: scale(0.9);
      }
    }
  }

  #user-nav{
    box-sizing: content-box;
    position: absolute;
    width: 80px;
    top: 20px;
    left: 50%;
    transform: translate(-50%, 0%);
  }

  .log-on{
    position: absolute;
    top: 81px;
    left: 50%;
    transform: translate(-50%, 0%);
    width: 16px;
    height: 16px;
    margin-left: 24px;
    background: #2de500;
    border-radius: 20px;
  }

  main{
    padding: 30px 15px;
  }

  /*info user*/

  aside{
    padding: 30px 0;
    display: flex;
    border-bottom: 5px #d1515a solid;
    margin-bottom: 30px;
  }

  .user-info{
    background: #272727;
    padding: 10px;
    border-radius: 10px;
    margin-right: 10px;
    text-align: right;
    width: 45%;
    max-height: 120px;
    h1{
      color: #325c9b;
      font-size: 18px;
    }
    h2{
      color: #d1515a;
      font-weight: 100;
      font-size: 18px;
      margin-bottom: 5px;
    }
    a{
      text-decoration: none;
      color: white;
      font-size: 15px;
      &:hover{
        color: #325c9b;
      }
    }
  }

  .bio{
    margin-top: -29px;
    width: 100%;
    h3{
      text-align: right;
      color: #325c9b;
      font-size: 17px;
      padding: 5px;
    }
    p{
      background: #272727;
      padding: 10px;
      border-radius: 10px;
      margin-left: 10px;
      color: white;
      font-size: 14px;
      line-height: 21px;
    }
  }

  /*post Form*/

  form{
    width: 100%;
    background: #272727;
    border-radius: 15px;
  }

  .user{
    display: flex;
    padding: 3px 5px;
    img{
      width: 35px;
      &:hover{
        filter : brightness(150%);
      }
    }
  }

  .pseudo{
    font-weight: 100;
    color: #d1515a;
    margin: 7px 0 0 5px;
  }

  textarea{
    width: 100%;
    min-width: 100%;
    max-width: 100%;
    height: 80px;
    min-height: 50px;
    padding: 8px;
    color: #d1515a;
    background: #412d2f;
    border: none;
    border-top: 1px #121212 solid;
    border-bottom: 1px #121212 solid;
  }

  .photo-button{
    display: flex;
    justify-content: space-between;
    padding: 8px;
    div{
      display: flex;
      padding: 5px;
      border-radius: 5px;
      transition-duration: 300ms;
      &:hover{
        background: rgba(0, 0, 0, 0.2);
        transform: scale(1.05);
      }
    }
    p{
      color: #325c9b;
      font-size: 12px;
      margin: 3px 0 0 5px;
    }
    i{
      color: #d1515a;
      font-size: 20px;
    }
  }

  button{
    background: #d1515a;
    border: none;
    padding: 3px 20px;
    color: white;
    font-weight: bold;
    border-radius: 20px;
    transform: scale(1.0);
    transition-duration: 300ms;
    z-index: 1;
    &:hover{
      transform: scale(1.05);
      background: white;
      color: #d1515a;
    }
  }

  @media screen and (min-width: 1025px) {
    header{
      position: fixed;
      width: 100%;
    }

    nav{
      padding: 10px 30px 5px 10px;
      min-height: 75px;
      i{
        font-size: 35px;
        margin: 12px 0 0 40px;
      }
    }

    #logo{
      width: 18%;
    }

    #text{
      display: flex;
      width: 100%;
      margin-right: 40px;
    }

    .line-logo{
      margin-top: 57px;
      width: 388px;
    }

    #user-nav{
      width: 100px;
    }

    .log-on{
      top: 94px;
      margin-left: 28px;
      height: 19px;
      width: 19px;
      border-width: 6px;
    }

    main{
      padding: 130px 30% 60px 10%;
    }

    aside{
      padding: 0;
      margin: 0;
      border: none;
    }

    .user-info{
      width: 17%;
      position: fixed;
      right: 8px;
      margin: 0;
      top: 120px;
      min-width: 200px;
      h1{
        font-size: 23px;
      }
      h2{
        font-size: 23px;
      }
      a{
        font-size: 19px;
      }
    }

    .bio{
      margin-top: 0;
      position: fixed;
      right: 8px;
      margin-top: 120px;
      width: 17.5%;
      min-width: 207px;
      p{
        font-size: 18px;
        line-height: 25px;
      }
      h3{
        font-size: 20px;
      }
    }

    textarea{
      padding: 12px;
    }

    .user{
      padding: 6px 10px;
    }

    .photo-button{
      padding: 12px;
      i{
        font-size: 30px;
      }
      p{
        font-size: 15px;
        margin-top: 6px;
      }
    }

    button{
      padding: 7px 37px;
      font-size: 16px;
    }

    .user img{
      width: 47px;
    }

    .pseudo{
      font-size: 22px;
      margin-top: 10px;
    }
  }
</style>