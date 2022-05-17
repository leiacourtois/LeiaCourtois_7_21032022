<script>
export default {
  name: 'HeaderNav',
  data() {
    return {
      userInfo: ''
    }
  },
}
</script>

<template>
  <router-view/>
</template>

<style lang="scss">
  *{
    margin: 0;
    padding: 0;
    font-family: Arial;
    box-sizing: border-box;
    text-decoration: none;
  }

  body{
    background: #121212;
  }
</style>
