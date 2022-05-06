<script>
import HeaderNav from '../components/header.vue'
import FooterText from '../components/footer.vue'
import PostUsers from '../components/post.vue'
import FormPost from '../components/form.vue'
const axios = require('axios')
export default {
  name: "ActivityView",
  components: {
    HeaderNav,
    FooterText,
    PostUsers,
    FormPost
  },
  data(){
    return {
      posts: '',
      userInfo: ''
    }
  },
  beforeCreate(){
    let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    if(!userInfo){
      this.$router.push({path: '/login'});
    }
  },
  beforeMount() {
    this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    axios.get('http://localhost:3000/api/post/', {
      headers:{
          'Authorization' : `Token ${this.userInfo[1]}`
      }
    })
    .then(response => {
      this.posts = response.data
    })
    .catch(error => {
      alert(`Quelque chose s'est mal passé. Essayez à nouveau! ${error}`)
    });
  },
}
</script>

<template>
  <div>
    <HeaderNav />
    <main>
      <FormPost/>
      <PostUsers
        v-for="post in posts"
        :pfp="post.user.picture"
        :pseudo="post.user.pseudo"
        :image="post.image"
        :text="post.text"
        :date="post.date"
        :userId="post.user.id"
        :key="post.id"
      />
    </main>
    <FooterText/>
  </div>
</template>

<style scoped lang="scss">
    main{
      padding: 30px 15px;
    }

    @media screen and (min-width: 1025px) {

      main{
        padding: 120px 20% 60px 20%;
      }
    }
</style>