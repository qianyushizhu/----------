<template>
  <div
    class="prologoBox"
    :style="{ width: isCollapse ? 64 + 'px' : 200 + 'px' }"
  >
    <div class="prologo">
      <img class="prologo_img" style="" src="../assets/timg.jpg" alt="" />
      载天文房后台
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: {
    collapse: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    isCollapse() {
      return this.$store.getters.isCollapse;
    },
  },
};
</script>
<style>
.prologoBox {
  width: 200px;
  height: 50px;
  line-height: 50px;
  overflow: hidden;
  transition: width 0.28s;
}
.prologo {
  line-height: 50px;
  font-weight: 600;
  line-height: 50px;
  font-size: 14px;
  color: #ffffff;
  font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
}

.prologo_img {
  margin: 0 18px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  vertical-align: middle;
}
</style>