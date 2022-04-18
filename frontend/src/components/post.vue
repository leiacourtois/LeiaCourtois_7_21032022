<script>
export default {
  name: 'PostUsers',
  data() {
    return {
      showComments: false
    }
  },
}
</script>

<template>
  <div class="post">
    <div class="first-row">
      <div class="user-post">
        <img src="../assets/user.svg">
        <div>
          <h3 class="pseudo">John Doe</h3>
          <p>15 Mars</p>
        </div>
      </div>
      <div>
        <i class="fa-solid fa-pen-to-square"></i>
        <i class="fa-solid fa-trash-can"></i>
      </div>
    </div>
    <div class="text-post">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.   
      </p>
    </div>
    <div class="last-row">
      <div @click="showComments = !showComments" class="comments">
        <i class="fa-solid fa-comments"></i>
        <p> 7 comentaires</p>
      </div>
    </div>
    <div v-show="showComments" class="comments-section">
      <div>
        <h4>Jane Nada</h4>
        <p>Super Cool !</p>
      </div>
      <div>
        <h4>Jean Dupont</h4>
        <p>Ullamcorper velit sed ullamcorper morbi tincidunt ornare massa eget. Egestas erat imperdiet sed euismod nisi. Molestie at elementum eu facilisis sed. Sapien et ligula ullamcorper malesuada. Tortor at auctor urna nunc id cursus metus. </p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  $pink-peach : #d1515a; 
  $light-blue : #325c9b;
  $grey : #272727;

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
      font-size: 15px;
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
    display: flex;
    width: 65%;
    padding-bottom: 5px;
    border-bottom: 2px $pink-peach solid;
    img{
      width: 45px;
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
    flex-wrap: wrap;
    justify-content: center;
    color: white;
    padding: 5px 0;
    font-size: 13px;
    line-height: 20px;
    border-bottom: 2px $light-blue solid;
    img{
      margin: 10px 0;
      max-width: 100%;
      max-height: 500px;
    }
  }

  .last-row{
    display: flex;
    padding: 5px 5px 0 5px;
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

  .comments-section{
    border-top: 2px $light-blue solid;
    margin-top: 5px;
    padding: 7px 0;
    div{
      display: flex ;
      background: rgba($light-blue, 0.4);
      margin: 7px 0;
      padding: 10px;
      border-radius: 10px;
    }
    h4{
      color: $pink-peach;
      margin-right: 20px;
      font-size: 14px;
    }
    p{
      color: white;
      font-size: 13px;
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
      }
      p{
        font-size: 12px;
      }
    }

    .first-row i{
      font-size: 20px;
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

    .comments-section{
    h4{
      font-size: 19px;
    }
    p{
      font-size: 17px;
    }
  }
  }
</style>