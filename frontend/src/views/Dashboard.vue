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
        <img v-if="userInfo[3] === null" src="../assets/user.svg">
        <img v-else :src="userInfo[3]">
      </nav>
      <router-link :to="{name: 'dashboard', params: { id: userInfo[0] }}">
        <img v-if="user.picture === null" src="../assets/user.svg" id="user-nav"> 
        <img v-else :src="user.picture" id="user-nav">
      </router-link>
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
        <div v-if="user.bio != null" class="bio">
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
    img{
      width: 50px;
      height: 50px;
      object-fit: cover;
      border-radius: 100px;
      margin: 5px 0 0 28px;
    }
  }

  #user-nav{
    box-sizing: content-box;
    position: absolute;
    width: 80px;
    height: 80px;
    object-fit: cover;
    top: 45px;
    left: 50%;
    transform: translate(-50%, 0%);
    border-radius: 100px;
  }

  .log-on{
    position: absolute;
    top: 115px;
    left: 51%;
    transform: translate(-50%, 0%);
    width: 20px;
    height: 20px;
    margin-left: 24px;
    background: #2de500;
    border-radius: 20px;
    border: 4px solid $dark-grey;
  }

  main{
    padding: 60px 15px;
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
      height: 100px;
      border: 5px solid $dark-grey;
    }

    .log-on{
      top: 130px;
      left: 50.3%;
      margin-left: 28px;
      height: 25px;
      width: 25px;
      border-width: 5px;
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
  }
</style>