<template>
  <div style="color:#999;margin-bottom:10px;position:relative;">
      支持图片格式：{{format}}，单个图片不超过{{size}}，尺寸：{{width}}*{{height}}px
  </div>
</template>
<script type="text/javascript">
  export default{
    props: {
      format: {
        type: String,
        default: ".png"
      },
      size: {
        type: String,
        default: "300kb"
      },
      width: {
        type: String,
        default: "300"
      },
      height: {
        type: String,
        default: "300"
      },
    }
  }
</script>
