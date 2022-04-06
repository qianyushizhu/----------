<template>
  <div class="searchForm">
    <el-form
      class="formsearch"
      :inline="inLine"
      :model="form"
      ref="form"
      label-width="100px"
    >
      <el-form-item :label="item.label+' :'" v-for="item in formLabel" :key="item.model">
        <el-input
          size="mini"
          v-model="form[item.model]"
          :clearable="item.clearable"
          :placeholder="'请输入' + item.label"
          v-if="!item.type"
        ></el-input>
        <el-select
          :clearable="item.clearable"
          size="mini"
          v-model="form[item.model]"
          :placeholder="'请选择' + item.label"
          filterable
          v-if="item.type == 'select'"
        >
          <el-option
            v-for="(subItem, idx) in item.opts"
            :key="idx"
            :label="subItem.label"
            :value="subItem.value"
          ></el-option>
        </el-select>

        <div class="block" v-if="item.type == 'datePick'">
          <el-date-picker
            size="mini"
            value-format="yyyy-MM-dd HH:mm:ss"
            v-model="form[item.model]"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </div>
        <el-switch
          v-model="form[item.model]"
          v-if="item.type == 'switch'"
        ></el-switch>
      </el-form-item>
      <el-form-item>
        <slot></slot>
        <!--  插槽 用来 接受父组件传来的自定义内容 如上面的 表单 右边的按钮-->
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    form: Object, //  用来存放 用户输入的数据
    formLabel: Array, //存放每个表单前的文字描述
    inLine: Boolean, //  判断  表单是横向排列 还是竖向排列   这样的话 默认是 false
  },
};
</script>

<style>
 .searchForm .el-form-item__label{
   font-size: 15px;
   font-weight: 700;
 }
</style>