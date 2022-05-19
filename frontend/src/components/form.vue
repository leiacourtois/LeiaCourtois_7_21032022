<script>
const axios = require('axios')
import PostUsers from '../components/post.vue'
export default {
  name: 'FormPost',
  components: {
    PostUsers
  },
  data() {
    return {
      userInfo: '',
      pfp: '',
      sendVar: false,
      text: '',
      imageSrc: '',
      curFiles: '',
      paraContent: '',
      posted: false,
    }
  },
  beforeMount() {
    this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  },
  methods: {
    textPost(){
      let testVar = this.$store.state.regex.text.test(this.text);
      if(testVar === true){
        this.sendVar = true
      } else{
        this.sendVar = false
      }
    },
    imageInput(){
      let input = document.querySelector('input');

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

            this.imageSrc = window.URL.createObjectURL(this.curFiles[i]);

          } else {
            this.paraContent = this.curFiles[i].name + ": Ce n'est pas un type de données valide.";
            this.imageSrc = null
          }
        }
      }
    },
    sendPost(){
      if(this.sendVar === true){
        let formData = new FormData()
        let image = this.curFiles[0]

        let post = {
            text : this.text,
            userId : this.userInfo[0]
        }

        formData.append('post', JSON.stringify(post));
        if (image) {
            formData.append('image', image);
        }

        axios.post('http://localhost:3000/api/post/', formData,{
          headers:{
              'Content-Type': 'multipart/form-data',
              'Authorization' : `Token ${this.userInfo[1]}`
          }
        })
        .then( response  => {
          this.post = response.data.data
          this.curFiles = '';
          this.imageSrc = '';
          this.paraContent = '';
          this.text = '';

          this.posted = true

        })
        .catch(error => {
          alert(`Quelque chose s'est mal passé. Essayez à nouveau! ${error}`)
        });
      } else{
        alert('Certains champs sont invalides')
      }
    }
  }
}
</script>

<template>
  <div>
    <form>
      <div class="user">
        <img v-if="userInfo[3] === null" src="../assets/user.svg">
        <img v-else :src="userInfo[3]">
        <h3 class="pseudo">{{userInfo[2]}}</h3>
      </div>
      <textarea @change="textPost" v-model="text" name="post" placeholder="Écrivez quelque chose"></textarea>
      <div class="photo-button">
        <div class="photo">
          <div class="photo-input">
            <label for="file">
              <i class="fa-solid fa-image"></i>
              <p>Choisir une image</p>
            </label>
            <input @change="imageInput" id="file" type="file">
          </div>
          <div class="preview">
            <img :src="imageSrc">
            <p>{{ paraContent }}</p>
          </div>
        </div>
        <button @click="sendPost" type="reset">Publier</button>
      </div>
    </form>
    <PostUsers 
        v-if="posted === true"
        :pfp="userInfo[3]"
        :pseudo="userInfo[2]"
        :date="post.date"
        :image="post.image"
        :text="post.text"
        :userId="userInfo[0]"
        :id="post.id"
        :key="post.id"/>
  </div>
</template>

<style scoped lang="scss">
  $pink-peach : #d1515a; 
  $light-blue : #325c9b;
  $grey : #272727;
  $dark-grey : #121212;

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
      height: 35px;
      object-fit: cover;
      border-radius: 100px;
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
    color: white;
    background: #412d2f;
    border: none;
    border-top: 1px $dark-grey solid;
    border-bottom: 1px $dark-grey solid;
    &::placeholder{
      color: $pink-peach;
    }
  }

  .photo-button{
    display: flex;
    flex-direction: column;
    padding: 8px; 
    position: relative;
  }

  .photo-input{
    display: flex;
    padding: 5px;
    border-radius: 5px;
    transition-duration: 300ms;
    width: 140px;
    &:hover{
      background: rgba(0, 0, 0, 0.2);
      transform: scale(1.05);
    }
    label{
      display: flex;
      cursor: pointer;
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
    input{
      display: none;
    }
  }

  .preview{
    display: flex;
    p{
      color: white;
      font-size: 8px;
      padding-left: 5px;
    }
    img{
      width: 100px;
    }
  }

  button{
    background: $pink-peach;
    position: absolute;
    bottom: 7px;
    right: 5px;
    border: none;
    padding: 7px 20px;
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
    textarea{
      padding: 12px;
    }

    .user{
      padding: 6px 10px;
      img{
        width: 47px;
        height: 47px;
      }
    }

    .photo-input{
      padding: 7px;
      margin: 3px;
      width: 180px;
      i{
        font-size: 30px;
      }
      p{
        font-size: 15px;
        margin-top: 6px;
      }
    }

    button{
      padding: 13px 37px;
      font-size: 16px;
    }

    .pseudo{
      font-size: 22px;
      margin-top: 10px;
    }

    .preview{
      p{
        font-size: 10px;
      }
      img{
        width: 200px;
      }
    }
  }
</style>