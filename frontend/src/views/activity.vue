<script>
import HeaderNav from '../components/header.vue'
import FooterText from '../components/footer.vue'

export default {
  name: "Activity",
  components: {
    HeaderNav,
    FooterText
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
      <form>
        <div class="user">
          <img src="user.svg">
          <h3 class="pseudo">John Doe</h3>
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

      <div class="post">
        <div class="first-row">
          <div class="user-post">
            <img src="user.svg">
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
        <p class="text-post">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <div class="last-row">
          <div class="comments">
            <i class="fa-solid fa-comments"></i>
            <p> 7 comentaires</p>
          </div>
          
        </div>
      </div>
    </main>
    <FooterText/>
  </div>
</template>

<style lang="scss">
  
</style>