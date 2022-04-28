<script>
import HeaderNav from '../components/header.vue'
import FooterText from '../components/footer.vue'
import PostUsers from '../components/post.vue'
export default {
  name: "ActivityView",
  components: {
    HeaderNav,
    FooterText,
    PostUsers
  },
  data() {
    return {
      userInfo: ''
    }
  },
  beforeMount() {
    this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  }
}
</script>

<template>
  <div>
    <HeaderNav />
    <main>
      <form>
        <div class="user">
          <img v-if="userInfo[3] === null" src="../assets/user.svg">
          <img v-else src="">
          <h3 class="pseudo">{{userInfo[2]}}</h3>
        </div>
        <textarea name="post" placeholder="Écrivez quelque chose"></textarea>
        <div class="photo-button">
          <div>
            <i class="fa-solid fa-image"></i>
            <p>Ajoutez une photo</p>
          </div>
          <button>Publier</button>
        </div>
      </form>
      <PostUsers/>
    </main>
    <FooterText/>
  </div>
</template>

<style scoped lang="scss">
  $pink-peach : #d1515a; 
  $light-blue : #325c9b;
  $grey : #272727;
  $dark-grey : #121212;

    main{
      padding: 30px 15px;
    }

    /*Post form*/

    form{
      width: 100%;
      background: $grey;
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
      color: $pink-peach;
      margin: 7px 0 0 5px;
    }

    textarea{
      width: 100%;
      min-width: 100%;
      max-width: 100%;
      height: 80px;
      min-height: 50px;
      padding: 8px;
      color: $pink-peach;
      background: #412d2f;
      border: none;
      border-top: 1px $dark-grey solid;
      border-bottom: 1px $dark-grey solid;
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
        color: $light-blue;
        font-size: 12px;
        margin: 3px 0 0 5px;
      }
      i{
        color: $pink-peach;
        font-size: 20px;
      }
    }

    button{
      background: $pink-peach;
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
        color: $pink-peach;
      }
    }
    @media screen and (min-width: 1025px) {

      main{
        padding: 120px 20% 60px 20%;
      }

      textarea{
        padding: 12px;
      }

      .user{
        padding: 6px 10px;
        img{
          width: 47px;
        }
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

      .pseudo{
        font-size: 22px;
        margin-top: 10px;
      }
    }
</style>