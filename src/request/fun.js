export function fenToYuan(num) {
    return (num / 100).toFixed(2);
}
// 验证是否是数字
export function req1(num) {
    var reg = /^[0-9]+$/;
    return reg.test(`${num}`)
}
const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}
//转年月日时分秒
export function formatTimeTwo(number, format) {
    var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
    var returnArr = [];
    var date = new Date(number * 1000);
    returnArr.push(date.getFullYear());
    returnArr.push(formatNumber(date.getMonth() + 1));
    returnArr.push(formatNumber(date.getDate()));
    returnArr.push(formatNumber(date.getHours()));
    returnArr.push(formatNumber(date.getMinutes()));
    returnArr.push(formatNumber(date.getSeconds()));
    for (var i in returnArr) {
        format = format.replace(formateArr[i], returnArr[i]);
    }
    return format;
}
//转换图片存储格式
export function structure(val) {
    let Logo = []
    if (val.length > 0) {
        val.forEach((x) => {
            Logo.push(x.response.key);
        });
        return Logo
    } else {
        return Logo
    }
}
import { imgl } from '../main.js'
//图片回显格式转换
export function cture(val) {
    let goodList = []
    if (val) {
        val.split(",").forEach((x, y) => {
            goodList.push({
                name: "y.jpg",
                response: {
                    key: x,
                },
                url: imgl() + x,
            });
        });
    }
    return goodList
}
function v() {
    let that = this
    that.$messageBox
        .confirm("此操作将删除, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
        })
        .then(async () => {
            that.$message({
                message: "删除成功",
                type: "success",
            });
        })
        .catch(() => {
            that.$message({
                type: "info",
                message: "已取消删除",
            });
        });
}
