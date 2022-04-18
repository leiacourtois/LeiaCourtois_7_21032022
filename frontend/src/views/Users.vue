<script>
import HeaderNav from '../components/header.vue'
import FooterText from '../components/footer.vue'

export default {
  name: "UsersList",
  components: {
    HeaderNav,
    FooterText
  },
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
            <tr>
              <td class="image"><img src="../assets/user.svg"></td>
              <td class="username">John Doe</td>
              <td class="email"><a href="mailto:johndoe@email.com">johndoe@email.com</a></td>
              <td class="role"><span>Employé</span><i class="fa-solid fa-user"></i></td>
              <td class="delete"><button><span>Supprimer</span><i class="fa-solid fa-trash-can"></i></button></td>
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

  .image{
    img{
      width: 30px;
      &:hover{
        filter : brightness(150%);
      }
    }
  }

  .username{
    color: $pink-peach;
  }

  .email{
    a{
      text-decoration: none;
      color: $light-blue;
      &:hover{
        color: white;
    }
    }
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