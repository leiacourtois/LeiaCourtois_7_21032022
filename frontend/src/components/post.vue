<script>
const axios = require('axios')
export default {
  name: 'PostUsers',
  props: ['userId', 'pfp', 'pseudo', 'date', 'text', 'image', 'id', 'comments', 'commentsNb' ],
  data() {
    return {
      showComments: false,
      userInfo: '',
      showPost: true,
      comment: '',
      commentPosted: false,
      newComments: []
    }
  },
  beforeMount() {
    this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  },
  mounted(){
    this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  },
  methods: {
    deletePost(post) {
      let postTarget = post.target
      let postDeleted = postTarget.closest('.post');
      let id = postDeleted.dataset.id
      axios.delete(`http://localhost:3000/api/post/${id}`, {
        headers:{
            'Authorization' : `Token ${this.userInfo[1]}`
        }
      })
      .then(() => {
        postDeleted.remove()
      })
      .catch(error => {
        alert(`Quelque chose s'est mal passé. Essayez à nouveau! ${error}`)
      });
    },
    sendComment() {
      const moment = require('moment');
      moment().format();
      moment.locale('fr');

      let comment = {
        text : this.comment,
        userId : this.userInfo[0],
        postId : this.id
      }

      axios.post('http://localhost:3000/api/comment/', comment, {
        headers:{
            'Content-Type': 'application/json',
            'Authorization' : `Token ${this.userInfo[1]}`
        }
      })
      .then( response  => {
        this.comment = ''
        this.commentPosted = true
        let newComment = response.data.data
        newComment.date = moment(newComment.date).format('DD/MM/YY à HH:mm')
        this.newComments.push(newComment);
      
        this.showComments = true
      })
      .catch(error => {
        alert(`Quelque chose s'est mal passé. Essayez à nouveau! ${error}`)
      });
    },
    deleteComment(comment) {
      let commentTarget = comment.target
      let commentDeleted = commentTarget.closest('.comment');
      let id = commentDeleted.dataset.id
      axios.delete(`http://localhost:3000/api/comment/${id}`, {
        headers:{
            'Authorization' : `Token ${this.userInfo[1]}`
        }
      })
      .then(() => {
        commentDeleted.remove()
      })
      .catch(error => {
        alert(`Quelque chose s'est mal passé. Essayez à nouveau! ${error}`)
      });
    }
  }
}
</script>

<template>
  <div class="post" :data-id="id">
    <div class="first-row">
      <router-link :to="{name: 'dashboard', params: { id: userId }}">
        <div class="user-post">
          <img v-if="pfp === null" src="../assets/user.svg">
          <img v-else :src="pfp">
          <div>
            <h3 class="pseudo">{{pseudo}}</h3>
            <p>{{date}}</p>
          </div>
        </div>
      </router-link>
      <div v-if="userId === userInfo[0] || userInfo[4] === 2">
        <i class="fa-solid fa-trash-can" @click="deletePost"></i>
      </div>
    </div>
    <div class="text-post">
      <p>{{text}}</p>
      <span></span>
      <img :src="image">
    </div>
    <div class="last-row">
      <div @click="showComments = !showComments" class="comments">
        <i class="fa-solid fa-comments"></i>
        <p v-if="commentsNb > 1" >{{commentsNb}} comentaires</p>
        <p v-else >{{commentsNb}} comentaire</p>
      </div>
    </div>
    <div v-show="showComments" class="comments-section">

      <aside v-if="commentPosted === true">
        <div v-for="newComment in newComments" :key="newComment.id" :data-id="newComment.id" class="comment">
          <img v-if="userInfo[3] === null" src="../assets/user.svg">
          <img v-else :src="userInfo[3]">
          <div>
            <span><h4>{{userInfo[2]}}</h4> <p>{{newComment.date}}</p> <i class="fa-solid fa-trash-can" @click="deleteComment"></i></span>
            <p>{{newComment.text}}</p>
          </div>
        </div>
      </aside>

      <div v-for="comment in comments" :key="comment.id" :data-id="comment.id" class="comment">
        <img v-if="comment.user.picture === null" src="../assets/user.svg">
        <img v-else :src="comment.user.picture">
        <div>
          <span><h4>{{comment.user.pseudo}}</h4> <p>{{comment.date}}</p> <i v-if="comment.user.id === userInfo[0] || userInfo[4] === 2" class="fa-solid fa-trash-can" @click="deleteComment"></i></span>
          <p>{{comment.text}}</p>
        </div>
      </div>

    </div>
    <div class="add-comment">
      <img v-if="userInfo[3] === null" src="../assets/user.svg">
      <img v-else :src="userInfo[3]">
      <input @keyup.enter="sendComment"  v-model="comment" type="text" name="username" placeholder="Écrivez un commentaire" />
    </div>
  </div>
</template>

<style scoped lang="scss">
  $pink-peach : #d1515a; 
  $light-blue : #325c9b;
  $grey : #272727;
  $dark-grey : #121212;

  .pseudo{
    font-weight: 100;
    color: $pink-peach;
    margin: 7px 0 0 5px;
  }

  .post{
    width: 100%;
    background: $grey;
    border-radius: 15px;
    padding: 4px 8px;
    margin: 20px 0;
  }

  .first-row{
    display: flex;
    justify-content: space-between;
    i{
      color: $light-blue;
      font-size: 20px;
      padding: 10px 5px;
      transition-duration: 300ms;
      z-index: 1;
      &:hover{
        color: $pink-peach;
        transform: scale(0.9);
      }
    }
  }

  .user-post{
    text-decoration: none;
    display: flex;
    width: 100%;
    padding-bottom: 5px;
    border-bottom: 2px $pink-peach solid;
    img{
      width: 45px;
      height: 45px;
      object-fit: cover;
      border-radius: 100px;
      &:hover{
        filter : brightness(150%);
      }
    }
    p{
      font-size: 9px;
      color: white;
      margin-left: 5px;
    }
  }

  .text-post{
    display: flex;
    flex-direction: column;
    color: white;
    padding: 5px 0;
    font-size: 13px;
    line-height: 20px;
    border-bottom: 2px $light-blue solid;
    img{
      margin: auto;
      padding-top: 10px;
      max-width: 100%;
      max-height: 400px;
    }
  }

  .last-row{
    display: flex;
    padding: 5px 5px 5px 5px;
  }

  .comments{
    display: flex;
    justify-content: space-between;
    vertical-align: middle;
    padding: 5px;
    border-radius: 5px;
    transition-duration: 300ms;
    &:hover{
      color: $pink-peach;
      transform: scale(0.95);
      background: rgba(0, 0, 0, 0.2);
    }
    i{
      color: $pink-peach;
      font-size: 25px;
    }
    p{
      color: $light-blue;
      font-weight: bold;
      padding: 5px 5px 7px 5px;
    }
  }

  /*comments*/

  .comments-section{
    border-top: 2px $light-blue solid;
    padding: 7px 0;
  }

  .comment{
    display: flex ;
    div{
      background: rgba($dark-grey, 0.4);
      margin-bottom: 7px;
      padding: 10px;
      border-radius: 10px;
      width: 100%;
    }
    h4{
      color: $pink-peach;
      margin-right: 5px;
      font-size: 14px;
    }
    p{
      color: white;
      font-size: 13px;
    }
    img{
      width: 30px;
      height: 30px;
      object-fit: cover;
      border-radius: 100px;
      margin-right: 5px;
    }
    span{
      display: flex;
      position: relative;
      p{
        font-size: 10px;
        margin-top: 2px;
        color: grey;
      }
      i{
        color: $light-blue;
        position: absolute;
        font-size: 15px;
        right: 0px;
        transition-duration: 300ms;
        &:hover{
          color: $pink-peach;
          transform: scale(0.9);
        }
      }
    }
  }

  .add-comment{
    border-top: 2px $light-blue solid;
    padding: 7px 0;
    display: flex;
    justify-content: space-between;
    img{
      width: 30px;
      height: 30px;
      object-fit: cover;
      border-radius: 100px;
    }
    input{
      width: 100%;
      border-radius: 100px;
      border: none;
      color: white;
      margin-left: 7px;
      padding: 10px;
      font-size: 14px;
      background: rgba($dark-grey, 0.4);
      &::placeholder{
        color: $pink-peach;        
      }
    }
  }

  @media screen and (min-width: 1025px) {
    .pseudo{
      font-size: 22px;
      margin-top: 10px;
    }

    .user-post{
      img{
        width: 55px;
        height: 55px;
      }
      p{
        font-size: 12px;
      }
    }

    .post{
      padding: 8px 12px;
    }

    .text-post{
      font-size: 17px;
      line-height: 25px;
    }

    .last-row{
      i{
        font-size: 35px;
      }
      p {
        font-size: 20px;
      }
    }

    .comment{
      h4{
        font-size: 19px;
      }
      p{
        font-size: 17px;
      }
      img{
        width: 40px;
        height: 40px;
      }
      span{
        p{
          margin-top: 5px;
        }
      }
    }

    .add-comment{
      input{
        font-size: 17px;
        padding: 12px;
      }
      img{
        width: 40px;
        height: 40px;
      }
    }
  }
</style>