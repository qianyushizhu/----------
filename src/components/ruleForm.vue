<template>
  <div>
    <el-form
      ref="ruleForm"
      :model="value"
      :inline="formConfig.isInline"
      label-position="right"
      :label-width="formConfig.labelWidth"
      size="small"
      style="padding-right: 50px"
    >
      <el-row>
        <el-col :span="24">
          <slot name="first"></slot>
          <!--  插槽 用来 接受父组件传来的自定义内容 如上面的 表单 右边的按钮-->
        </el-col>
        <el-col
          v-for="(item, index) in formConfig.formItemList"
          :key="index"
          :span="item.span"
        >
          <!-- 插槽 -->
          <slot></slot>
          <el-form-item
            :label="item.label + ':'"
            :prop="item.prop"
            :rules="item.rules"
          >
            <!-- input输入 -->
            <el-input
              v-if="item.type == 'input'"
              v-model="value[item.prop]"
              :disabled="item.disabled"
              :clearable="true"
              :placeholder="'请输入' + item.placeholder"
            >
            </el-input>
            <!-- input输入 -->
            <el-input
              v-if="item.type == 'textarea'"
              type="textarea"
              :disabled="item.disabled"
              :autosize="{ minRows: 2, maxRows: 4 }"
              :placeholder="'请输入' + item.placeholder"
              v-model="value[item.prop]"
            >
            </el-input>
            <!-- select -->
            <el-select
              :clearable="true"
              v-if="item.type == 'select'"
              v-model="value[item.prop]"
              :disabled="item.disabled"
              :placeholder="'请输入' + item.placeholder"
              @change="selectChange"
              filterable
            >
              <el-option
                v-for="(optItem, index) in item.optList"
                :key="index"
                :label="optItem.label"
                :value="optItem.value"
              ></el-option>
            </el-select>
            <!-- 多选select -->
            <el-select
              v-model="value[item.prop]"
              v-if="item.type == 'selectMore'"
              multiple
              filterable
              allow-create
              default-first-option
              :disabled="item.disabled"
              :placeholder="'请输入' + item.placeholder"
            >
              <el-option
                v-for="(optItem, index) in item.optList"
                :key="index"
                :label="optItem.label"
                :value="optItem.value"
              >
              </el-option>
            </el-select>
            <!-- 选择 -->
            <el-radio-group
              v-if="item.type == 'radio'"
              v-model="value[item.prop]"
            >
              <el-radio
                v-for="(item, i) in item.radioList"
                :key="i"
                :label="item.value"
                >{{ item.name }}</el-radio
              >
              <!-- <el-radio label="线下场地免费"></el-radio> -->
            </el-radio-group>
            <!-- 时间 -->
            <el-date-picker
              :value-format="item.dateFormate"
              v-if="item.type == 'date'"
              v-model="value[item.prop]"
              :type="item.timeType"
              :disabled="item.disabled"
              :clearable="true"
              :placeholder="'请输入' + item.label"
            ></el-date-picker>
            <!-- 图片上传 -->
            <el-upload
              v-if="item.type == 'uploadImg'"
              class="upload-pic"
              :file-list="value[item.prop]"
              :action="domain"
              :data="QiniuData"
              :on-remove="
                (file, fileList) => {
                  return handleRemove(file, fileList, item.prop);
                }
              "
              :on-error="uploadError"
              :on-success="
                (response, file, fileList) => {
                  return uploadSuccess(response, file, fileList, item.prop);
                }
              "
              :before-remove="beforeRemove"
              :before-upload="beforeAvatarUpload"
              :limit="item.limit"
              list-type="picture-card"
              multiple
              :on-exceed="handleExceed"
            >
              <i class="el-icon-plus"></i>
            </el-upload>

            <!-- 视频上传 -->
            <el-upload
              v-if="item.type == 'uploadVedio'"
              class="upload-pic"
              :file-list="value[item.prop]"
              :action="domain"
              :data="QiniuData1"
              :on-remove="
                (file, fileList) => {
                  return handleRemove1(file, fileList, item.prop);
                }
              "
              :on-error="uploadError1"
              :on-success="
                (response, file, fileList) => {
                  return uploadSuccess1(response, file, fileList, item.prop);
                }
              "
              :before-remove="beforeRemove1"
              :before-upload="beforeAvatarUpload1"
              :limit="item.limit"
              multiple
              :on-exceed="handleExceed1"
            >
              <el-button style="margin-left: 10px" size="small" type="success"
                >选择视频</el-button
              >
            </el-upload>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <slot name="last"></slot>
          <!--  插槽 用来 接受父组件传来的自定义内容 如上面的 表单 右边的按钮-->
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { apiGetUploadToken } from "../request/http";
export default {
  props: {
    formConfig: {
      type: Object,
      required: true,
    },
    value: {
      type: Object,
      required: true,
    },
    getRef: {
      type: Function,
    },
  },
  data() {
    return {
      form: {},
      QiniuData: {
        key: "", //图片名字处理
        token: "", //七牛云token
        data: {},
      },
      QiniuData1: {
        key: "", //视频名字处理
        token: "", //七牛云token
        data: {},
      },
      domain: "https://upload.qiniup.com", // 七牛云的上传地址（华东区）
      qiniuaddr: "http://image.********.cn", // 七牛云的图片外链地址 七牛云空间的外链地址
      // imgList:[],//等待上传的图片集合
      fileList: [],
    };
  },
  mounted() {
    this.setDefaultValue();
    // this.apiGetUploadToken();
  },
  methods: {
    setDefaultValue() {
      const formData = { ...this.value };
      // 设置默认值
      this.formConfig.formItemList.forEach(({ key, value }) => {
        if (formData[key] === undefined || formData[key] === null) {
          formData[key] = value;
        }
      });
      this.$emit("getRef", this.$refs.ruleForm);
      this.$emit("input", formData);
    },
    // valide() {
    //   this.$refs.ruleForm.validate((valid) => {
    //     if (valid) {
    //     }
    //   });
    // },
    // 图片==========================
    handleRemove(file, fileList, idx) {
      //(file,fileList)
      this.value[idx] = fileList;
      // this.value.img=fileList
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 张图片，如需更换，请删除上一张图片在重新选择！`
      );
    },
    async beforeAvatarUpload(file) {
      console.log(file);
      // 图片上传之前的方法
      const isPNG = file.type === "image/png";
      const isJPEG = file.type === "image/jpeg";
      const isJPG = file.type === "image/jpg";
      const isLt2M = file.size / 1024 / 1024 < 500;

      if (!isPNG && !isJPEG && !isJPG) {
        this.$message.error("上传头像图片只能是 jpg、png、jpeg 格式!");
        return false;
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 500MB!");
        return false;
      }
      let uploadtoken = await apiGetUploadToken();

      this.QiniuData.token = uploadtoken.data.token;
      this.QiniuData.data = file;
      this.QiniuData.key = `${uploadtoken.data.fid}`;

      // //(this.QiniuData.key);
    },
    uploadSuccess(response, file, fileList, idx) {
      var that = this;
      //图片上传成功的方法
      //(fileList);
      //(response.key);
      //(file);
      // this.imgList.push(response.key)
      console.log(fileList);
      this.value[idx] = fileList;
    },
    uploadError(err, file, fileList) {
      //图片上传失败时调用
      this.$message({
        message: "上传出错，请重试！",
        type: "error",
        center: true,
      });
    },
    beforeRemove(file, fileList) {
      // //(this.imgList)
      // return this.$confirm(`确定移除 ${ file.name }？`);
    },

    // 视频上传========
    handleRemove1(file, fileList, idx) {
      //(file,fileList)
      this.value[idx] = fileList;
      // this.value.img=fileList
    },
    handleExceed1(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个视频，如需更换，请删除上一个视频在重新选择！`
      );
    },
    async beforeAvatarUpload1(file) {
      var fileSize = file.size / 1024 / 1024 < 50;
      if (
        [
          "video/mp4",
          "video/ogg",
          "video/flv",
          "video/avi",
          "video/wmv",
          "video/rmvb",
          "video/mov",
        ].indexOf(file.type) == -1
      ) {
        this.$message.error("请上传正确的视频格式");
        return false;
      }
      if (!fileSize) {
        this.$message.error("视频大小不能超过50MB");
        return false;
      }
      let uploadtoken = await apiGetUploadToken();

      this.QiniuData1.token = uploadtoken.data.token;
      this.QiniuData1.data = file;
      this.QiniuData1.key = `${uploadtoken.data.fid}`;

      // //(this.QiniuData.key);
    },
    uploadSuccess1(response, file, fileList, idx) {
      var that = this;
      //图片上传成功的方法
      //(fileList);
      //(response.key);
      //(file);
      // this.imgList.push(response.key)
      console.log(fileList);
      this.value[idx] = fileList;
    },
    uploadError1(err, file, fileList) {
      //图片上传失败时调用
      this.$message({
        message: "上传出错，请重试！",
        type: "error",
        center: true,
      });
    },
    beforeRemove1(file, fileList) {
      // //(this.imgList)
      // return this.$confirm(`确定移除 ${ file.name }？`);
    },

    selectChange(val) {
      console.log(val);
      // if()
    },
  },
};
</script>

<style>
.el-upload--picture-card {
  width: 100px !important;
  height: 100px !important;
  line-height: 100px !important;
}
.el-upload-list__item-thumbnail {
  width: 100px !important;
  height: 100px !important;
}
.el-upload-list--picture-card .el-upload-list__item {
  width: 100px !important;
  height: 100px !important;
}
</style>