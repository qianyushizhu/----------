<template>
  <div class="EditorItem">
    <vue-ueditor-wrap
      v-model="content"
      :config="myConfig"
      @beforeInit="addCustomButtom"
    >
    </vue-ueditor-wrap>
    <!-- 弹出框 -->
    <el-dialog
      title="图片上传"
      :visible.sync="dialogVisible1"
      width="40%"
      append-to-body
      :lock-scroll="true"
      :close-on-click-modal="false"
    >
      <div class="image-upload-panel">
        <div class="image-item" v-for="(item, index) in imageList" :key="index">
          <img width="100%" height="100%" :src="imgurl + item" />
          <span class="image-del el-icon-close" @click="delImage(index)">
          </span>
        </div>
        <!-- <el-upload class="image-upload-btn"
                   :action="url"
                   name="upfile"
                   accept="image/png, image/jpeg"
                   with-credentials
                   :show-file-list="false"
                   :on-success="imageUploadSuccess"
                   :before-upload="imageBeforeUpload">
          <i class="el-icon-plus"></i>
        </el-upload> -->
        <div>
          <el-button class="image-upload-btn" @click="zh_uploadFile">
            <i class="el-icon-plus"></i>
          </el-button>
          <input
            type="file"
            ref="evfile"
            @change="zh_uploadFile_change"
            @click="
              (event) => {
                event.target.value = null;
              }
            "
            style="display: none"
            multiple
          />
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button
          @click="
            () => {
              this.dialogVisible1 = false;
            }
          "
        >
          取 消
        </el-button>
        <el-button type="primary" @click="insertImage">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 上传视频 -->
    <el-dialog title="视频上传" :visible.sync="dialogVisible" width="30%">
      <el-button @click="zh_uploadFile1">点击上传</el-button>
      <p style="margin: 10px 0 0 10px">文件: {{ videoShow }}</p>
      <p style="margin: 10px 0 0 10px">进度: {{ processVideo }}</p>
      <input
        type="file"
        ref="evfile1"
        @change="zh_uploadFile_change1"
        @click="
          (event) => {
            event.target.value = null;
          }
        "
        style="display: none"
        multiple
      />
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelVedio()">取 消</el-button>
        <el-button type="primary" @click="insertVideo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import VueUeditorWrap from "vue-ueditor-wrap";
import { getUploadToken } from "../../request/http.js";
import * as qiniu from "qiniu-js";
export default {
  components: {
    VueUeditorWrap,
  },
  props: {
    value: {
      type: String,
      default: "",
    },
    myConfig: {
      type: Object,
      default: () => ({
        // 功能框不在动定位在页面上
        autoFloatEnabled: false,
        // 编辑器不自动被内容撑高
        autoHeightEnabled: false,
        // 初始容器高度
        initialFrameHeight: 450,
        // 初始容器宽度
        initialFrameWidth: "100%",
        // UEditor 资源文件的存放路径，如果你使用的是 vue-cli 生成的项目，通常不需要设置该选项，vue-ueditor-wrap 会自动处理常见的情况，如果需要特殊配置，参考下方的常见问题2
        UEDITOR_HOME_URL: "/UE/",
      }),
    },
  },
  data() {
    return {
      imgurl: "",
      loading: "",
      dialogVisible1: false,
      dialogVisible: false,
      imageList: [],
      video: [],
      editorHandler: null,
      content: this.value,
      editorHandler1: null,
      processVideo: 0,
      videoShow: "",
    };
  },
  created() {
    let that = this;
    that.imgurl = that.img;
  },
  methods: {
    // ///////////////////////////////////视频上传
    zh_uploadFile1() {
      // this.processImg = true
      // console.log('选取文件')
      // console.log(this.$ref.evfile)
      this.$refs.evfile1.click();
    },
    zh_uploadFile_change1(evfile) {
      // this.imageList=''
      // console.log(evfile.target.files[0].name)
      this.videoShow = evfile.target.files[0].name;
      // 获取token上传七牛云
      getUploadToken({ fileName: evfile.target.files[0].name }).then((res) => {
        // console.log(uptoken,file)
        var uptoken = res.data.token;
        var file = evfile.target.files[0]; // Blob 对象，上传的文件
        var key = res.data.fid; // 上传后文件资源名以设置的 key 为主，如果 key 为 null 或者 undefined，则文件资源名会以 hash 值作为资源名。

        const config = {
          useCdnDomain: true, // 表示是否使用 cdn 加速域名，为布尔值，true 表示使用，默认为 false。
          region: qiniu.region.z0, // 根据具体提示修改上传地区,当为 null 或 undefined 时，自动分析上传域名区域
        };

        const putExtra = {
          fname: "", // 文件原文件名
          params: {}, // 用来放置自定义变量
          mimeType: null, // 用来限制上传文件类型，为 null 时表示不对文件类型限制；限制类型放到数组里： ["image/png", "image/jpeg", "image/gif"]
        };
        var observable = qiniu.upload(file, key, uptoken, putExtra, config);
        observable.subscribe({
          next: (result) => {
            // 主要用来展示进度
            this.loading = this.$loading({
              lock: true,
              text: "加载中......",
              spinner: "el-icon-loading",
              background: "rgba(0, 0, 0, 0.1)",
            });
            this.processVideo = result.total.percent + "%";
          },
          error: (errResult) => {
            // 失败报错信息
            // console.log(errResult)
          },
          complete: (result) => {
            // 接收成功后返回的信息
            // console.log(result)
            if (this.loading !== undefined) {
              this.loading.close();
            }
            // 从后台获取图片显示
            this.video = [];
            this.video.push(result.key);
            // console.log(res.key)
          },
        });
      });
    },
    // ///////////////////////////////////图片上传
    zh_uploadFile() {
      this.processImg = true;
      // console.log('选取文件')
      // console.log(this.$ref.evfile)
      this.$refs.evfile.click();
    },
    // 选择文件后触发的事件---上传到七牛云
    zh_uploadFile_change(evfile) {
      // this.imageList=''
      // 限制用户上传类型
      var targetFiles = evfile.target.files;
      console.log(targetFiles)
      var fileTypes = ["gif", "jpg", "jpeg", "png"];
      for (let i = 0; i < targetFiles.length; i++) {
        if (fileTypes.includes(targetFiles[i].name.split(".")[1])) {
          // 获取token上传七牛云
          getUploadToken({ fileName: evfile.target.files[i].name }).then(
            (res) => {
              var uptoken = res.data.token;
              var file = evfile.target.files[i]; // Blob 对象，上传的文件
              var key = res.data.fid; // 上传后文件资源名以设置的 key 为主，如果 key 为 null 或者 undefined，则文件资源名会以 hash 值作为资源名。

              const config = {
                useCdnDomain: true, // 表示是否使用 cdn 加速域名，为布尔值，true 表示使用，默认为 false。
                region: qiniu.region.z0, // 根据具体提示修改上传地区,当为 null 或 undefined 时，自动分析上传域名区域
              };

              const putExtra = {
                fname: "", // 文件原文件名
                params: {}, // 用来放置自定义变量
                mimeType: null, // 用来限制上传文件类型，为 null 时表示不对文件类型限制；限制类型放到数组里： ["image/png", "image/jpeg", "image/gif"]
              };
              var observable = qiniu.upload(
                file,
                key,
                uptoken,
                putExtra,
                config
              );
              observable.subscribe({
                next: (result) => {
                  console.log(result);
                  // 主要用来展示进度
                  this.loading = this.$loading({
                    lock: true,
                    text: "加载中......",
                    spinner: "el-icon-loading",
                    background: "rgba(0, 0, 0, 0.1)",
                  });
                },
                error: (errResult) => {
                  // 失败报错信息
                  console.log(errResult)
                },
                complete: (result) => {
                  // 接收成功后返回的信息
                  // console.log(result)
                  if (this.loading !== undefined) {
                    this.loading.close();
                  }
                  // 从后台获取图片显示
                  const item = result.key;
                  this.imageList.push(item);
                  console.log(this.imageList)
                },
              });
            }
          );
        } else {
          this.$message.error("您选中的某个类型不支持上传,请重新选择");
        }
      }
    },
    // 删除图片
    delImage(index) {
      const imageList = this.imageList;
      imageList.splice(index, 1);
    },
    // 图片开始上传
    // imageBeforeUpload () {
    //   this.loading = this.$loading({
    //     lock: true,
    //     text: '加载中......',
    //     spinner: 'el-icon-loading',
    //     background: 'rgba(0, 0, 0, 0.7)'
    //   })
    // },
    // 图片上传成功
    // imageUploadSuccess (response, file) {
    //   if (this.loading !== undefined) {
    //     this.loading.close()
    //   }
    //   const imageList = this.imageList
    //   const item = response.data
    //   imageList.push(item)
    //   this.imageList = imageList
    // },
    insertImage() {
      let that = this;
      const imageList = this.imageList;
      let imageHtml = "";
      (imageList || []).map((item) => {
        imageHtml =
          imageHtml +
          '<p><img style="width:100%"' +
          `src="${that.img}` +
          item +
          '"/></p>';
      });
      if (imageHtml !== "") {
        this.editorHandler.execCommand("inserthtml", imageHtml);
      }

      this.imageList = "";
      // console.log(this.imageList)
      this.dialogVisible1 = false;
    },
    insertVideo() {
      let that = this;
      const videos = this.video;
      let imageHtml = "";
      // console.log(this.video)
      (videos || []).map((item) => {
        imageHtml =
          imageHtml + '<p><video src="' + that.img + item + '"/></video>';
      });
      if (imageHtml !== "") {
        this.editorHandler1.execCommand("inserthtml", imageHtml);
      }

      // this.imageList1=''
      // console.log(this.imageList)
      this.dialogVisible = false;
      this.video = [];
      this.processVideo = 0;
      this.videoShow = "";
    },
    cancelVedio() {
      this.dialogVisible = false;
      this.processVideo = 0;
      this.video = [];
      this.videoShow = "";
    },
    addCustomButtom(editorId) {
      this.addCustomButtom2(editorId);
      this.addCustomButtom1(editorId);
    },
    addCustomButtom2(editorId) {
      // console.log(editorId)
      const _this = this;
      window.UE.registerUI(
        "test-button1",
        function (editor, uiName) {
          // 注册按钮执行时的 command 命令，使用命令默认就会带有回退操作
          editor.registerCommand(uiName, {
            execCommand: () => {
              // console.log('chenggong')
              _this.imageList1 = [];
              _this.dialogVisible = true;
              _this.editorHandler1 = editor;
              // editor.execCommand('inserthtml', `<span>这是一段由自定义按钮添加的文字</span>`)
            },
          });

          // 创建一个 button
          var btn1 = new window.UE.ui.Button({
            // 按钮的名字
            name: uiName,
            // 提示
            title: "上传视频",
            // 需要添加的额外样式，可指定 icon 图标，图标路径参考常见问题 2
            cssRules: "background-position: -120px -40px;",
            // 点击时执行的命令
            onclick: function () {
              // 这里可以不用执行命令，做你自己的操作也可
              editor.execCommand(uiName);
            },
          });

          // 当点到编辑内容上时，按钮要做的状态反射
          editor.addListener("selectionchange", function () {
            var state = editor.queryCommandState(uiName);
            if (state === -1) {
              btn1.setDisabled(true);
              btn1.setChecked(false);
            } else {
              btn1.setDisabled(false);
              btn1.setChecked(state);
            }
          });
          // 因为你是添加 button，所以需要返回这个 button
          return btn1;
        },
        66 /* 指定添加到工具栏上的哪个位置，默认时追加到最后 */,
        editorId /* 指定这个 UI 是哪个编辑器实例上的，默认是页面上所有的编辑器都会添加这个按钮 */
      );
    },
    addCustomButtom1(editorId) {
      // console.log(editorId)
      const _this = this;
      window.UE.registerUI(
        "test-button",
        function (editor, uiName) {
          // 注册按钮执行时的 command 命令，使用命令默认就会带有回退操作
          editor.registerCommand(uiName, {
            execCommand: () => {
              _this.imageList = [];
              _this.dialogVisible1 = true;
              _this.editorHandler = editor;
              // editor.execCommand('inserthtml', `<span>这是一段由自定义按钮添加的文字</span>`)
            },
          });

          // 创建一个 button
          var btn = new window.UE.ui.Button({
            // 按钮的名字
            name: uiName,
            // 提示
            title: "上传图片",
            // 需要添加的额外样式，可指定 icon 图标，图标路径参考常见问题 2
            cssRules: "background-position: -380px 0;",
            // 点击时执行的命令
            onclick: function () {
              // 这里可以不用执行命令，做你自己的操作也可
              editor.execCommand(uiName);
            },
          });

          // 当点到编辑内容上时，按钮要做的状态反射
          editor.addListener("selectionchange", function () {
            var state = editor.queryCommandState(uiName);
            if (state === -1) {
              btn.setDisabled(true);
              btn.setChecked(false);
            } else {
              btn.setDisabled(false);
              btn.setChecked(state);
            }
          });
          // 因为你是添加 button，所以需要返回这个 button
          return btn;
        },
        55 /* 指定添加到工具栏上的哪个位置，默认时追加到最后 */,
        editorId /* 指定这个 UI 是哪个编辑器实例上的，默认是页面上所有的编辑器都会添加这个按钮 */
      );
    },
  },
  watch: {
    value(newValue) {
      this.content = newValue;
    },
    content(newValue) {
      this.$emit("input", newValue);
    },
  },
};
</script>
<style scoped>
.image-upload-panel {
  overflow: hidden;
}
.image-upload-btn {
  float: left;
  width: 150px;
  height: 150px;
  border: 1px dashed #c0ccda;
  border-radius: 6px;
  line-height: 150px;
  text-align: center;
}

.EditorItem .el-icon-plus:before {
  margin-left: 22px;
}
i {
  font-size: 60px;
  margin-left: 22px;
}
.image-item {
  float: left;
  width: 150px;
  height: 150px;
  background: #ddd;
  margin-right: 10px;
  border-radius: 6px;
  position: relative;
}
.image-item img {
  max-width: 150px;
  border-radius: 6px;
}
.image-del {
  position: absolute;
  top: 0px;
  right: 0px;
  color: rgb(0, 255, 128);
  font-weight: bold;
  font-size: 20px;
  cursor: pointer;
}
</style>
