<script>
import HeaderNav from '../components/header.vue'
export default {
  name: "SignUp",
  components: {
    HeaderNav
  },
  data() {
    return {
      restaurantName: "La belle vue",
    }
  },
  computed: {
    copyright() {
      const currentYear = new Date().getFullYear()
      return `Copyright ${this.restaurantName} ${currentYear}`
    }
  },
  methods: {
    addToShoppingCart(amount) {
      this.shoppingCart += amount
    }
  }
}
</script>

<template>
  <div>
    <HeaderNav />
    <main>
      <div class="title">
        <h1>S'INSCIRE</h1>
      </div>
      <form>
        <label for="username">Nom d'utilisateur*</label>
        <input type="text" name="username">

        <label for="email">Email*</label>
        <input type="text" name="email">

        <label for="password">Mot-de-passe*</label>
        <input type="text" name="password">

        <label for="password">Confirmation du mot-de-passe*</label>
        <input type="text" name="password">

        <button type="submit">S'inscrire</button>
      </form>
    </main>

    <footer>
      <p>© Groupomania 2022</p>
    </footer>
  </div>
</template>
