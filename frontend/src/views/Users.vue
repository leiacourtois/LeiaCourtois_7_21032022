<script>
import HeaderNav from '../components/header.vue'
import FooterText from '../components/footer.vue'
const axios = require('axios')
export default {
  name: "UsersList",
  components: {
    HeaderNav,
    FooterText
  },
  data() {
    return {
      users: '',
      userInfo: ''
    }
  },
  beforeCreate() {
    let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    if(!userInfo){
      this.$router.push({path: '/login'});
    }
  },
  beforeMount() {
    this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    axios.get('http://localhost:3000/api/params/', {
      headers:{
          'Authorization' : `Token ${this.userInfo[1]}`
      }
    })
    .then(response => {
      this.users = response.data
    })
    .catch(error => {
      alert(`Quelque chose s'est mal passé. Essayez à nouveau! ${error}`)
    });
  },
  methods: {
    deleteUser(user) {
      let userTarget = user.target
      let userDeleted = userTarget.closest('tr');
      let id = userDeleted.dataset.id
      axios.delete(`http://localhost:3000/api/params/${id}`, {
        headers:{
            'Authorization' : `Token ${this.userInfo[1]}`
        }
      })
      .then(() => {
        if(id == this.userInfo[0]) {
          sessionStorage.removeItem('userInfo');
          this.$router.push({path: '/signup'});
        } else{
          userDeleted.remove()
        }
      })
      .catch(error => {
        alert(`Quelque chose s'est mal passé. Essayez à nouveau! ${error}`)
      });
    }
  }
}
</script>

<template>
  <div>
    <HeaderNav />
      <main>
        <div class="table">
          <table>
            <tr>
              <th class="first-col"><i class="fa-solid fa-circle-user"></i></th>
              <th>Pseudo</th>
              <th>Email</th>
              <th>Rôle</th>
              <th class="last-col"></th>
            </tr>
            <tr v-for="user in users" :key="user.id" :data-id="user.id">
              <td class="image">
                <img v-if="user.picture === null" src="../assets/user.svg">
                <img v-else :src="user.picture">
              </td>
              <td class="username">{{user.pseudo}}</td>
              <td class="email">{{user.email}}</td>
              <td class="role">
                <span v-if="user.roleId === 1">Employé</span> 
                <span v-else-if="user.roleId === 2">Admin</span> 
                <i v-if="user.roleId === 1" class="fa-solid fa-user"></i>
                <i v-else-if="user.roleId === 2" class="fa-solid fa-user-gear"></i>
              </td>
              <td class="delete">
                <button @click="deleteUser">
                  <span>Supprimer</span>
                  <i class="fa-solid fa-trash-can"></i>
                </button>
              </td>
            </tr>
          </table>
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
    padding: 30px 0 70px 0;
  }

  table{
    width: 99.9%;
    border-collapse: collapse;
    text-align: center;
  }

  th{
    background: $grey;
    padding: 10px 5px;
    color: $pink-peach;
    i{
      font-size: 20px;
    }
  }

  td{
    border-right: 2px solid $grey;
    border-left: 2px solid $grey;
    padding: 5px;
    font-size: 15px;
  }

  .id{
    text-align: center;
    color: white;
  }

  .image{
    img{
      width: 30px;
      height: 30px;
      object-fit: cover;
      border-radius: 100px;
    }
  }

  .username{
    color: $pink-peach;
  }

  .email{
    color: $light-blue;
  }

  .role{
    color: white;
    span{
      display: none;
    }
  }

  .delete{
    button{
      color: white;
      background: #a6131f;
      border: none;
      padding: 5px 7px;
      border-radius: 50px;
      transition-duration: 300ms;
      &:hover{
        transform: scale(1.1);
      }
    }
    span{
      display: none;
    }
  }

  @media screen and (min-width: 1025px) {

    main{
       padding: 120px 20% 70px 20%;
    }

    .table{
      border: 5px solid $grey;
      border-radius: 15px;
      background: $dark-grey;
      padding: 3px;
    }

    .first-col{
      border-radius: 10px 0 0 0;
    }

    .last-col{
      border-radius: 0 10px 0 0;
    }

    th{
      background: $dark-grey;
      font-size: 21px;
      i{
        font-size: 30px;
      }
    }

    td{
      background: $grey;
      border-color: $dark-grey;
      text-align: left;
      font-size: 18px;
    }

    .image{
      text-align: center;
      img{
        width: 60px;
        height: 60px;
        object-fit: cover;
        border-radius: 100px;
      }
    }

    .role{
      span{
        display: flex;
      }
      i{
        display: none;
      }
    }

    .delete{
      width: 14%;
      text-align: center;
      button{
        font-weight: bold;
        font-size: 20px;
        padding: 10px 15px;
      }
      span{
        display: flex;
      }
      i{
        display: none;
      }
    }
  }
</style>