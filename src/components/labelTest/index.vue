<template>
  <div style="padding-left:160px;color:#999;margin-bottom:10px;position:relative;top:-10px;">
      {{title}}
  </div>
</template>
<script type="text/javascript">
  export default{
    props: {
        title:{
            type: String,
            default: "标签以英文逗号作为分割符"
        }
    }
  }
</script>
