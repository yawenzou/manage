<template>
  <footer style="z-index:10" class="footer" v-once>Copyright &copy; {{getYear}} asdaimeiye All Rights Reserved</footer>
</template>
<script type="text/javascript">
  export default {
    computed: {
      getYear(){
        return new Date().getFullYear()
      }
    }
  }
</script>
