<template>
  <div>
    <!-- search -->
    <!-- 表单元素 -->
    <el-table
      :data="tableData"
      size="mini"
      v-loading="loading"
      element-loading-text="加载中..."
      :border="true"
      :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
      @select="select"
      @select-all="selectAll"
      :defaultSelections="defaultSelections"
    >
      <el-table-column
        v-if="tableSetting.selection || false"
        type="selection"
        align="center"
      >
      </el-table-column>
      <el-table-column
        v-if="tableSetting.isIndex || true"
        type="index"
        label="序号"
        align="center"
        width="50"
      >
      </el-table-column>

      <!-- 正式数据/根据条件 -->
      <el-table-column
        :sortable="item.sortable || false"
        :show-overflow-tooltip="item.showTooltip || true"
        v-for="(item, index) of tableSetting.tableList"
        :prop="item.prop"
        :key="index"
        :align="item.align"
        :fixed="item.fixed"
        :label="item.label"
        :width="item.width"
      >
        <template slot-scope="scope">
          <!-- 如果是button -->
          <div v-if="item.button">
            <el-button
              :circle="btn.circle"
              :plain="btn.plain"
              :round="btn.round"
              :type="btn.type"
              :size="btn.size || 'mini'"
              :icon="btn.icon"
              :style="{ color: btn.color }"
              style="width: auto; margin: 0 3px"
              v-for="(btn, i) of item.button"
              :key="i"
              v-show="!btn.isShow || (btn.isShow && btn.isShow(scope.row))"
              :disabled="btn.isDisabled && btn.isDisabled(scope.row)"
              @click="sendClick(btn, scope.row)"
              >{{ btn.label }}</el-button
            >
          </div>
          <!-- 如果是图片 -->
          <div
            v-else-if="item.type === 'img'"
            style="width: 30px; height: 30px"
          >
            <el-image
              style="width: 30px; height: 30px"
              :src="changeImg(scope.row[item.prop])[0]"
              :preview-src-list="changeImg(scope.row[item.prop])"
            >
            </el-image>
          </div>
          <!-- 进行一次自定义过滤值,再渲染 -->
          <div v-else v-html="getValue(scope, item)"></div>
        </template>
      </el-table-column>
    </el-table>

    <div
      v-if="tableSetting.pagination"
      class="pagination"
      style="display: flex; justify-content: center"
    >
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="tableSetting.params.page"
        :page-sizes="[10, 20, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="parseInt(total)"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { getList } from "./tablesearch";
export default {
  props: {
    tableSetting: {
      type: Object,
      default: () => {},
    },
    handleClick: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      tableData: [],
      loading: false,
      defaultSelections: [],
      total: 0,
    };
  },
  watch: {},
  mounted() {
    this.getPageData();
  },
  methods: {
    // 表格勾选
    select(rows, row) {
      console.log(rows, row);
      this.$emit("select", rows, row);
    },
    // 全选
    selectAll(rows, row) {
      console.log(rows);
      this.$emit("select", rows);
    },
    // 过滤值
    getValue(scope, item) {
      return item.changeValue
        ? item.changeValue(scope.row)
        : scope.row[item.prop];
    },

    changeImg(val){
      
      let arr=val.split(',')
      for(var key in arr){
        arr[key]=this.img+arr[key]
      }
      // console.log(arr)
      return arr
    },
    // 点击事件
    sendClick(btn, row) {
      this.$emit("handleClick", { btnName: btn.btnName, row: row });
    },
    // 获取本页数据
    async getPageData() {
      // if (!this.tableSetting.urlName) {
      //   return;
      // }
      this.loading = true;
      let res = await getList(
        this.tableSetting.urlName,
        this.tableSetting.params
      );
      console.log(res);
      setTimeout(() => {
        if (res.data.list) {
          this.tableData = res.data.list;
          this.total = res.data.totalCount;
        } else {
          this.tableData = res.data;
          this.total = res.count;
        }
        this.loading = false;
      }, 300);
    },
    // 重新加载
    reload() {
      console.log("重新加载了一遍");
      this.getPageData();
    },
    // 页数发生改变
    handleSizeChange(val) {
      console.log(1);
      console.log(val);
      this.tableSetting.params.page = 1;
      this.tableSetting.params.pageSize = val;
      this.getPageData();
    },
    // 页数发生改变
    handleCurrentChange(val) {
      console.log(2);
      console.log(val);
      this.tableSetting.params.page = val;
      this.getPageData();
    },
  },
};
</script>
<style>
.pagination {
  width: 100%;
  text-align: right;
  padding: 20px 20px 0;
}
</style>