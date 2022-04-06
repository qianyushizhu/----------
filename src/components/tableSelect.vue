<template>
  <div class="tableSelect">
     
    <el-table
      @selection-change="tableDataList.handleSelectionChange"
      max-height="681"
      :header-cell-style="{ background: '#F5F6F9', color: '#606266' }"
      :data="tableData"
      border
      style="width: 100%"
      size="mini"
    >
      <el-table-column
        v-if="tableDataList.selection || false"
        type="selection"
        width="55"
      >
      </el-table-column>
      <el-table-column
        v-if="tableDataList.index || false"
        label="序号"
        :index="indexMethod"
        type="index"
        width="50"
        align="center"
      >
      </el-table-column>
      <el-table-column
        :sortable="item.sortable || false"
        :show-overflow-tooltip="
          item.showTooltip || true
        "
        v-for="(item, index) of tableDataList.tableList"
        :prop="item.prop"
        :key="index"
        :align="item.align"
        :fixed="item.fixed"
        :label="item.label"
        :width="item.width"
      >
        <template scope="scope">
          <div v-if="item.button">
            <el-button
              :disabled="btn.disabled"
              :circle="btn.circle"
              :plain="btn.plain"
              :round="btn.round"
              :type="btn.type"
              :size="btn.size"
              :icon="btn.icon"
              :style="{ color: btn.color }"
              style="width: auto; margin: 0 3px"
              v-for="(btn, i) of checkDisplay(item.button, scope)"
              :key="i"
              @click="sendClick(btn, scope)"
              >{{ btn.label }}</el-button
            >
          </div>
          <div v-else-if="item.render">
            <custom :render="(h, self) => item.render(h, self, scope)"></custom>
          </div>
          <div v-else-if="item.type === 'img'">
            <el-image
              style="width: 100px; height: 100px"
              :src="scope.row[item.prop]"
              :preview-src-list="[scope.row[item.prop]]"
            >
            </el-image>
          </div>
          <div v-else-if="item.type === 'audio'">
            <div
              @click="toDetail_a($event, scope)"
              style="
                position: relative;
                height: 100px;
                width: 100px;
                cursor: pointer;
                margin: 0 auto;
              "
            >
              <audio :src="scope.row[item.prop]"></audio>
              <div
                style="
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                "
              >
                <img
                  style="width: 16px !important; height: 16px !important"
                  :src="src_a"
                  alt=""
                />
              </div>
              <img
                width="100"
                height="100"
                :src="scope.row[item.poster]"
                alt=""
              />
              <span class="hour"></span>
            </div>
          </div>
          <div v-else-if="item.type === 'video'">
            <video
              style="width: 160px !important; height: 100px !important"
              :poster="scope.row[item.poster]"
              controls="controls"
              :src="scope.row[item.prop]"
            ></video>
          </div>
          <div v-else v-html="getValue(scope, item)"></div>
        </template>
      </el-table-column>
    </el-table>
    <div v-if="pagination" class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="curPage"
        :page-sizes="[10, 15, 20, 25, 30, 40, 50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="parseInt(total)"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
/**
 *  tableDataList: {  //  主要入口传参
        params: { status: 2, curPage: 1, pageSize: 10 },  //  默认发送后台携带的参数
        paramsName: '',   //  接口返回的list的参数名称  如放在data里面 则填上data即可
        index: true,  //  是否需要左侧序号排序  默认  false
        pagination: true,  //  是否需要下方分页  默认  true
        selection: false,  //  是否需要左侧多选框  默认  false
        handleSelectionChange: val => {    //  左侧多选框选择事件  @params 参数 val 当前选中的左右数据集合
          console.log(val)
        },
        urlName: '/cs/cs/query',  //  是否需要自动调用接口  不填的情况下可从  localData  中传递参数效果等同自己调用接口   场景比较复杂的接口返回数据组件无法满足
        localData: [],  //  只有在 urlName 为 '' 的情况下才会生效
        tableList: [  //  tanle  展示数据集  @type  Array
          {
            prop: 'mobile',    //  prop
            label: '手机号码',  //  label
            align: 'center',   //  align
            fixed: false  //  fixed
            showTooltip: true  //  超出隐藏  默认为true
            width: 200,  //  列占用的宽度  默认自适应
            changeValue: row => {  // @params row 当前行的数据集合  需要经过处理的数据  可 return 一个 html 片段
              return true
            }
          },
          {
            label: '操作',
            fixed: false,
            width: 200,
            align: 'center',
            button: [  //   加上参数 button 的时候  可在页面中生成按钮
              {
                label: '下载',  //  按钮名称
                type: 'text',  //  按钮类型
                onClick: 'on-detail',  //  按钮 $emit 事件名称
                visibility: row => {  // @params row 当前行的数据集合  按钮的显示和隐藏
                  return true
                }
              }
            ]
          }
        ]
      }
    }
  },
*/
// import { REQUEST_INSTANCE } from "@/components/network/request";
export default {
  props: {
    tableDataList: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    custom: {
      functional: true,
      props: ["render"],
      render: (h, ctx) => {
        return ctx.props.render(h, ctx);
      },
    },
  },
  data() {
    return {
      // src_a: require("@/assets/img/图标／声音／a.png"),
      pagination: true,
      paramsName: "dataList",
      params: {},
      urlName: "",
      tableData: [],
      curPage: 1,
      pageSize: 10,
      total: 0,
      requestObj: {},
      filePlayList: [],
      fileHourList: [],
      localData: [],
    };
  },
  watch: {
    tableDataList: {
      handler(val) {
        Object.keys(val).forEach((item) => {
          // eslint-disable-next-line no-prototype-builtins
          if (this.hasOwnProperty(item)) {
            this[item] = val[item];
          }
        });
      },
      deep: true,
      immediate: true,
    },
    localData: {
      handler(val) {
        this.tableData = val;
      },
      deep: true,
    },
  },

  methods: {
    toDetail_a(e, { $index }) {
      if (this.filePlayList.length > 0) {
        this.filePlayList.forEach((item, index) => {
          if ($index !== index) {
            item.file.pause();
            item.icon.classList.remove("changeNone");
          }
        });
      }
      if (e.currentTarget.children[1].classList[0] === "changeNone") {
        e.currentTarget.children[0].pause();
        e.currentTarget.children[1].classList.remove("changeNone");
        this.filePlayList.splice($index, 1);
      } else {
        e.currentTarget.children[0].play();
        e.currentTarget.children[1].classList.add("changeNone");
        this.filePlayList[$index] = {
          file: e.currentTarget.children[0],
          icon: e.currentTarget.children[1],
        };
      }
    },
    // 转换序号
    indexMethod(index) {
      return (this.curPage - 1) * 10 + (index + 1);
    },
    // 需要转换的值
    getValue(scope, item) {
      return item.changeValue
        ? item.changeValue(scope.row)
        : scope.row[item.prop];
    },
    localReload(i, val) {
      this.$set(this.tableData, i, { ...val });
      console.log(this.tableData, "222");
    },
    // 重新调用接口
    reload(params = {}) {
      this.requestObj = params;
      this.curPage = 1;
      this.queryPage();
    },
    // 获取数据
    queryPage() {

      // if (!this.urlName) {
      //   return;
      // }
      // let allParams = {
      //   ...this.params,
      //   ...this.requestObj,
      // };
      // Object.keys(allParams).forEach((item) => {
      //   if (!allParams[item] || allParams[item].length === 0) {
      //     delete allParams[item];
      //   }
      // });
      // if (this.pagination) {
      //   allParams.curPage = this.curPage;
      //   allParams.pageSize = this.pageSize;
      // }
      // setTimeout(() => {
        let data=[{user:'徐先生',phone:'1365558447'},{user:'王先生',phone:'1365558447'},{user:'李先生',phone:'1365558447'},{user:'咯先生',phone:'1365558447'}]
        this.tableData = data
      // }, 2000);
      // REQUEST_INSTANCE.post(this.urlName, allParams)
      //   .then((res) => {
      //     if (res.jsonData) {
      //       let { totalRows } = res.jsonData;

      //       this.tableData = this.getData(res.jsonData);
      //       if (res.jsonData[this.paramsName].length === 0) {
      //         this.total = 0;
      //       } else {
      //         this.total = totalRows ? totalRows : this.total;
      //       }
      //     } else {
      //       this.tableData = [];
      //       this.total = 0;
      //     }
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
    },
    // 页数发生改变
    handleSizeChange(val) {
      this.pageSize = val;
      // this.queryPage();
    },
    // 页数发生改变
    handleCurrentChange(val) {
      this.curPage = val;
      // this.queryPage();
    },
    // 按钮的控制隐藏
    checkDisplay(buttonList, scope) {
      console.log(scope);
      let newButtonList = buttonList.filter((item) => {
        if (!item.visibility) {
          return item;
        } else if (item.visibility) {
          return item.visibility(scope.row);
        }
      });
      return newButtonList;
    },
    // 按钮点击事件
    sendClick(buttonItem, scope) {
      this.$emit(buttonItem.onClick, { ...scope.row, $index: scope.$index });
    },
    // 处理接口数据
    getData(obj, path = this.paramsName) {
      let result = null;
      let s = path.split(".");
      if (path.length === 0) {
        return obj;
      }
      if (s.length === 1) {
        return obj[path];
      }
      function getL(list, key, index = 0) {
        let s = key.length;
        if (index === s - 1) {
          result = list[key[index]];
        } else {
          getL(list[key[index]], key, index + 1);
        }
      }
      getL(obj, s);
      return result;
    },
  },
  mounted() {
    this.queryPage();
  },
};
</script>

<style scoped>
.hour {
  position: absolute;
  right: 2px;
  bottom: 2px;
  color: #fff;
}
.pagination {
  width: 100%;
  text-align: right;
  padding: 20px 20px 0;
}
.tableSelect {
  background: #fff;
}
.changeNone {
  display: none !important;
}
</style>

