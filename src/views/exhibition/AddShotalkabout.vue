<style>
</style>
<template>
  <div>
    <div style="position: relative; height: 70px">
      <el-button
        type="primary"
        @click="goback"
        style="position: absolute; left: 80%"
      >
        返回
      </el-button>
    </div>
    <ruleForm :formConfig="formConfig" :value="form" ref="getRef" />
    <div style="margin: 50px 0 0 135px; font-size: 20px">类型选择</div>
    <div style="display: flex; align-items: center; margin: 20px 0 0 120px">
      <el-radio
        v-for="(item, index) in tableData1"
        :key="index"
        v-model="radio"
        :label="index"
      >
        {{ item.name }}
      </el-radio>
    </div>
    <!-- 上传视频 -->
    <div style="margin: 40px 0 0 0" v-if="radio == 0">
      <div style="margin: 0 0 0 140px; font-size: 15px">
        (限制只能上传mp4格式)
      </div>
      <el-upload
        style="margin: 15px 0 0 140px"
        v-if="videIask"
        class="upload-demo"
        action="https://upload.qiniup.com"
        :show-file-list="false"
        :http-request="uploadFile"
        accept="video/mp4"
      >
        <el-button size="small" type="primary">视频上传</el-button>
      </el-upload>
      <el-progress :percentage="progress" style="margin: 20px 0"></el-progress>
    </div>
    <!--链接地址-->
    <div style="width: 1200px; margin: 20px 0 0 40px" v-if="radio == 1">
      <el-form label-width="80px">
        <el-form-item label="链接地址">
          <el-input v-model="input3"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <!-- 提交 -->
    <div style="display: flex; justify-content: center; margin-top: 30px">
      <el-button type="primary" @click="apiinsert">提交</el-button>
    </div>
  </div>
</template>
<script>
import * as qiniu from "qiniu-js";
import ruleForm from "../../components/ruleForm.vue";
import { AddHotvideo, getUploadToken } from "@/request/http";
import { structure } from "@/request/fun";
export default {
  components: { ruleForm },
  data() {
    return {
      formConfig: {
        isInline: false,
        labelWidth: "140px",
        formItemList: [
          {
            type: "input",
            prop: "name1",
            label: "标题",
            placeholder: "标题",
            span: 18,
            options: [],
            rules: [{ required: true, message: "请输入标题", trigger: "blur" }],
          },
          {
            type: "input",
            prop: "name2",
            label: "介绍",
            placeholder: "介绍",
            span: 18,
            options: [],
            rules: [{ required: true, message: "请输入介绍", trigger: "blur" }],
          },
          {
            limit: 1, //限制图片上传数量
            type: "uploadImg",
            prop: "img1",
            label: "视频封面",
            placeholder: "请上传视频封面",
            span: 24,
            options: [],
            rules: [
              { required: true, message: "请上传视频封面", trigger: "change" },
            ],
          },
        ],
      },
      form: {
        name1: "", //标题
        name2: "", //介绍
        img1: [], //视频封面
      },
      videIask: true, //上传视频按钮显示与隐藏
      progress: 0, //进度条
      route: "", //传给后台的视频地址
      input3: "", //链接地址
      radio: 0,
      tableData1: [{ name: "视频" }, { name: "链接" }],
    };
  },
  methods: {
    //返回
    goback() {
      let that = this;
      that.$router.go(-1);
    },
    // 上传视频到七牛云
    async uploadFile(fileList) {
      let that = this;
      let { data } = await getUploadToken();
      let qiniuToken = data.token;
      let qiniuKey = data.fid;
      that.videIask = false;
      // 上传文件到七牛
      let observer = {
        //上传过程的监听函数 result参数带有total字段的 object，包含loaded、total、percent三个属性)
        next(result) {
          // 实现上传进度条 ...
          that.progress = parseInt(result.total.percent);
        },
        // 上传完成回调
        complete(res) {
          that.route = qiniuKey;
          console.log("上传成功");
        },
        //上传失败回调
        error(err) {
          console.log("上传失败");
        },
      };
      let putExtra = {
        //原文件名
        fname: "",
        //用来放置自定义变量
        params: {},
        //限制上传文件类型
        mimeType: null,
      };
      let config = {
        //存储区域(z0:代表华东;z2:代表华南,不写默认自动识别)
        // region: qiniu.region.z2,
        //分片上传的并发请求量
        concurrentRequestLimit: 2,
      };
      let observable = qiniu.upload(
        fileList.file,
        qiniuKey,
        qiniuToken,
        putExtra,
        config
      );
      observable.subscribe(observer);
    },
    //提交
    async apiinsert() {
      let that = this;
      let type = 1;
      let route = "";
      //视频
      if (that.radio == 0) {
        type = 1;
        route = that.route;
      }
      //链接
      else if (that.radio == 1) {
        type = 2;
        route = that.input3;
      }
      let data = {
        name: that.form.name1, //标题
        image: structure(that.form.img1).join(","), //封面
        route: route, //地址
        type: type,
        detail: that.form.name2, //介绍
      };
      console.log(data);
      if (
        that.form.name1 &&
        that.form.img1.length > 0 &&
        that.form.name2 &&
        route
      ) {
        let res = await AddHotvideo(data);
        console.log(res);
        that.$message({
          message: "提交成功",
          type: "success",
        });
        that.$router.go(-1);
      } else {
        that.$message({
          showClose: true,
          message: "信息请填写完整",
          type: "warning",
        });
      }
    },
  },
};
</script>