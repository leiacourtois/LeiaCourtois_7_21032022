<script>
import HeaderNav from '../components/header.vue'
import FooterText from '../components/footer.vue'
import PostUsers from '../components/post.vue'
import FormPost from '../components/form.vue'
export default {
  name: "ActivityView",
  components: {
    HeaderNav,
    FooterText,
    PostUsers,
    FormPost
  }
}
</script>

<template>
  <div>
    <HeaderNav />
    <main>
      <FormPost/>
      <PostUsers/>
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