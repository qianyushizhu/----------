<template>
  <div class="scrollBar">
    <el-scrollbar
      ref="scrollContainer"
      :vertical="false"
      class="scroll-container"
      @wheel.native.prevent="handleScroll"
    >
      <div
        class="tagBox_item"
        :class="[item.active ? 'active_tagBox_item active_tagBox_itemAdd' : '']"
        ref="tag"
        v-for="(item, i) in itemList"
        :key="i"
        @click="moveToTarget($event, i)"
      >
        {{ item.tagName }}
        <span class="el-icon-close" @click.stop="delTag($event, i)"></span>
      </div>
    </el-scrollbar>
  </div>
</template>
<script>
const tagAndTagSpacing = 4;
export default {
  data() {
    return {
      cur: 0,
    };
  },
  computed: {
    itemList() {
      return this.$store.getters.itemList;
    },
    scrollWrapper() {
      // console.log(this.$refs.scrollContainer.$refs.wrap);
      return this.$refs.scrollContainer.$refs.wrap;
    },
  },
  
  mounted() {
    this.scrollWrapper.addEventListener("scroll", this.emitScroll, true);
  },
  beforeDestroy() {
    this.scrollWrapper.removeEventListener("scroll", this.emitScroll);
  },
  methods: {
    handleScroll(e) {
      const eventDelta = e.wheelDelta || -e.deltaY * 40;
      const $scrollWrapper = this.scrollWrapper;
      $scrollWrapper.scrollLeft = $scrollWrapper.scrollLeft + eventDelta / 4;
    },
    moveToTarget(e, i) {
      for (var key in this.itemList) {
        this.itemList[key].active = false;
      }
      this.itemList[i].active = true;
      
      this.$store.commit('changeRoute',this.itemList[i].path)
      this.$router.push(this.itemList[i].path)

      let currentTag = e.srcElement;
      const $container = this.$refs.scrollContainer.$el;
      const $containerWidth = $container.offsetWidth;
      const $scrollWrapper = this.scrollWrapper;
      const tagList = this.$refs.tag;
      // console.log(tagList);
      let firstTag = null;
      let lastTag = null;
      // find first tag and last tag
      if (tagList.length > 0) {
        firstTag = tagList[0];
        lastTag = tagList[tagList.length - 1];
      }
      if (firstTag === currentTag) {
        // console.log($scrollWrapper.scrollLeft);
        $scrollWrapper.scrollLeft = 0;
      } else if (lastTag === currentTag) {
        $scrollWrapper.scrollLeft =
          $scrollWrapper.scrollWidth - $containerWidth;
      } else {
        // find preTag and nextTag
        const currentIndex = tagList.findIndex((item) => item === currentTag);
        console.log(currentIndex);
        const prevTag = tagList[currentIndex - 1];
        const nextTag = tagList[currentIndex + 1];
        // console.log(prevTag);
        // console.log(nextTag);
        // console.log(nextTag.offsetLeft);
        // // the tag's offsetLeft after of nextTag
        const afterNextTagOffsetLeft =
          nextTag.offsetLeft + nextTag.offsetWidth + tagAndTagSpacing;
        // // the tag's offsetLeft before of prevTag
        const beforePrevTagOffsetLeft = prevTag.offsetLeft - tagAndTagSpacing;
        if (
          afterNextTagOffsetLeft >
          $scrollWrapper.scrollLeft + $containerWidth
        ) {
          $scrollWrapper.scrollLeft = afterNextTagOffsetLeft - $containerWidth;
        } else if (beforePrevTagOffsetLeft < $scrollWrapper.scrollLeft) {
          $scrollWrapper.scrollLeft = beforePrevTagOffsetLeft;
        }
      }
    },
    // 删除tag
    delTag(e, i) {
      // this.$store.dispatch('updateVisitedView', this.$route)
      if (this.itemList.length <= 1) {
        // this.itemList.splice(i,1)
      } else {
        if (this.itemList[this.itemList.length-1].active) {
          this.itemList.splice(i, 1);
          this.itemList[this.itemList.length-1].active=true
          this.$store.commit('changeRoute',this.itemList[this.itemList.length-1].path)
          this.$router.push(this.itemList[this.itemList.length-1].path)
        } else {
          this.itemList.splice(i, 1);
        }
      }
    },
  },
};
</script>
<style>
.el-scrollbar .el-scrollbar__wrap .el-scrollbar__view {
  white-space: nowrap;
}

.scroll-container {
  overflow-x: hidden;
}
.scrollBar {
  height: 34px;
  width: 100%;
  border-bottom: 1px solid #d8dce5;
  -webkit-box-shadow: 0 1px 3px 0 rgb(0 0 0 / 12%), 0 0 3px 0 rgb(0 0 0 / 4%);
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 12%), 0 0 3px 0 rgb(0 0 0 / 4%);
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.el-scrollbar__thumb {
  display: block;
  width: 0 !important;
  height: 0px !important;
  cursor: pointer;
  border-radius: inherit;
  background-color: rgba(144, 147, 153, 0.3);
  -webkit-transition: background-color 0.3s;
  transition: background-color 0.3s;
}
.el-icon-close {
  width: 16px;
  height: 16px;
  vertical-align: 0;
  border-radius: 50%;
  text-align: center;
  line-height: 16px;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  transform-origin: 100% 50%;
}
.el-icon-close:hover {
  background-color: #b4bccc;
  color: #fff;
  line-height: 1.4 !important;
  border: none;
}
.tagBox_item {
  display: inline-block;
  position: relative;
  cursor: pointer;
  height: 26px;
  line-height: 26px;
  border: 1px solid #d8dce5;
  color: #495060;
  padding: 0 8px;
  font-size: 12px;
  margin-left: 5px;
  margin-top: 4px;
}
.tagBox_item:last-child {
  margin-right: 10px;
}
.tagBox_item:first-child {
  margin-left: 10px;
}
.active_tagBox_item {
  background-color: #42b983;
  color: #fff;
  border-color: #42b983;
}
.active_tagBox_itemAdd::before {
  content: "";
  background: #fff;
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  position: relative;
  margin-right: 2px;
}
</style>