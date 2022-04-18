<script>
export default {
  name: 'FooterText',
}
</script>

<template>
  <footer>
    <p><i class="fa-regular fa-copyright"></i> Groupomania 2022</p>
  </footer>
</template>

<style scoped lang="scss">
  $grey : #272727;
  $dark-grey: #121212;
  
  footer{
    color: $grey;
    width: 100%;
    bottom: 0px;
    position: fixed;
    padding: 5px 0 5px 5px;
    background: rgba($dark-grey, 0.9);
  }
</style>