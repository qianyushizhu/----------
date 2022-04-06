import { get, post } from './api'
//获取七牛云文件上传token
export const getUploadToken = p => get('/file/getUploadToken', p);

// 登录封装
export const apiLogin = p => post('/login', p)

//获取用户列表
export const getUserinfo = p => get('/userInfo/getUserList', p)

//获取七牛token 
export const apiGetUploadToken = p => get('/file/getUploadToken', p)

//设置pdf的分类设置权重
export const setpdfWeight = p => post('/classify/setWeight', p);

// 获取小程序用户列表
export const apiGetCustomerMsgList = p => get('/backcus/getCustomerMsgList', p)

// 查询我的收藏
export const apiGetMyCollectPdf = p => get('/MyCollect/backSelMyCollectPdf', p)

//查询我的查看记录
export const apiGetMyHistory = p => get('/MyCollect/backGetMyView', p)

// 查询我的下载记录
export const apiGetMyDownloadPdf = p => get('/MyDownloadPdf/backGetMyDownloadPdf', p)

// 查询用户分享成功的
export const apiSelCssRList = p => get('/cssr/selCSSRList', p)


// 查询所有pdf类型
export const apiGetPdfClassify = p => get('/classify/getPdfClassify', p)

// 新增pdf类型
export const apiInsPdfClassify = p => post('/classify/insPdfClassify', p)

// 修改pdf类型
export const apiUpPdfClassify = p => post('/classify/upPdfClassify', p)

// 删除指定的pdf类型
export const apiDelPdfClassify = p => post('/classify/delPdfClassify', p)
//用户分享记录
export const getUserShareList = p => get('/backcus/getUserShareList', p)

//查询用户 分享出去的 pdf 查看记录
export const getSharePdfViewList = p => get('/backcus/getSharePdfViewList', p)

//查询用户分享出去的 pdf下载记录
export const getSharePdfDowList = p => get('/backcus/getSharePdfDowList', p)

//修改pdf记录
export const Modpdf = p => post('/backpdfdoc/update', p)

// 查询所有pdf
export const apiGetPdfList = p => get('/backpdfdoc/getpdfList', p)


// 添加pdf数据
export const apiAddPdfDoc = p => post('/backpdfdoc/addpdfdoc', p)

// 删除指定的pdf
export const apiDelPdfDoc = p => post('/backpdfdoc/delPdfDoc', p)

//pdf被查看记录
export const pdfViewList = p => get('/backpdfdoc/pdfViewList', p)

// pdf分享记录
export const pdfShareCusList = p => get('/backpdfdoc/pdfShareCusList', p)

//pdf下载记录
export const pdfDowList = p => get('/backpdfdoc/pdfDowList', p)

//设置资讯类别权重
export const setarticleclass = p => post('/activityClassify/setWeight', p);

//新增资讯类别
export const AddInfcategories = p => post('/activityClassify/insert', p);

//修改资讯类别
export const setInfcategories = p => post('/activityClassify/update', p);

//查询资讯类别
export const getInfcategories = p => get('/activityClassify/selectList', p);

//删除资讯类别分
export const delInfcategories = p => post('/activityClassify/deleteList', p);

//新增文章_资讯
export const Addinsert = p => post('/article/insert', p);

//查询多个文章
export const getselectList = p => get('/article/selectList', p);

//批量删除文章
export const Deletearticles = p => post('/article/deleteList', p);

//修改文章
export const Modifyarticle = p => post('/article/update', p);

//设置文章权重
export const setavWeight = p => post('article/setWeight', p);

//文章 上架或下架 
export const Avupdown = p => post('/article/setDisplay', p);

//添加商品类别
export const AddClassigoods = p => post('/goodsType/addGoodsType', p)

//获取商品类别列表
export const getClassigoods = p => get('/goodsType/getGoodsTypes', p)

//删除类别
export const delClassigoods = p => post('/goodsType/delGoodsType', p)

//设置商品类别状态上下架
export const AvClassigoods = p => post('/goodsType/setGoodsTypeStatus', p)

//编辑商品类别
export const ModClassigoods = p => post('/goodsType/updateGoodsType', p)

//添加商品信息
export const Addgoods = p => post('/goods/addGoodsMsg', p)

//获取商品列表
export const getgoods = p => get('/goods/getGoodsMsgList', p)

//删除商品信息
export const delgoods = p => post('/goods/delGoodsMsg', p)

//设置商品上架状态
export const setgoods = p => post('/goods/setGoodsMsgStatus', p)

//编辑商品信息
export const Modgoods = p => post('/goods/updateGoodsMsg', p)

//添加商品规格信息
export const AddProications = p => post('/goods/addGoodsSize', p)

//获取商品规格列表
export const getProications = p => get('/goods/getGoodsSizeList', p)

//删除规格
export const delProications = p => post('/goods/delGoodsSize', p)

//编辑商品规格
export const ModProications = p => post('/goods/updateGoodsSize', p)

//获取轮播列表
export const getswiper = p => get('/carousel/getCarouselMsgList', p);

//删除轮播信息
export const Deleteswiper = p => post('/carousel/delCarouselMsg', p);

//添加轮播信息
export const Addswiper = p => post('/carousel/addCarouselMsg', p);

//编辑轮播信息
export const Modswiper = p => post('/carousel/updateCarouselMsg', p);

//新增作品
export const Addworks = p => post('/opusOpen/insert', p);

//修改作品
export const Modworks = p => post('/opusOpen/update', p);

//获取作品
export const getworks = p => get('/opusOpen/selectList', p);

//删除作品
export const delworks = p => post('/opusOpen/deleteList', p);

//作品权重
export const setworks = p => post('/opusOpen/setWeight', p);

//上架或者下架
export const Avworks = p => post('/opusOpen/setDisplay', p);

//新增作品下的商品
export const Addworksgoods = p => post('/opusOpen/insertGoods', p);

//删除作品展下的商品
export const delworksgoods = p => post('/opusOpen/deleteListGoods', p);

//查询绑定商品
export const getworksgoods = p => get('/opusOpen/selGoodsIn', p);

//新增作家简介
export const AddMemberlist = p => post('/member/insert', p);

//获取作家简介
export const getMemberlist = p => get('/member/selectList', p);

//修改作家简介
export const ModMemberlist = p => post('/member/update', p);

//删除作家简介
export const delMemberlist = p => post('/member/deleteList', p);

//作家简介上下架
export const AvMemberlist = p => post('/member/setDisplay', p);

//作家简介权重
export const setMemberlist = p => post('/member/setWeight', p);

//新增资讯海报图
export const AddInforPoster = p => post('/articleBanner/insert', p);

//删除资讯海报图
export const delInforPoster = p => post('/articleBanner/deleteList', p);

//获取资讯海报图
export const getInforPoster = p => get('/articleBanner/selectList', p);

//资讯海报图上下架
export const AvInforPoster = p => post('/articleBanner/setDisplay', p);

//获取热门视屏
export const getHotvideo = p => get('/smallVideo/selectList', p);

//新增热门视屏
export const AddHotvideo = p => post('/smallVideo/insert', p);

//修改热门视屏
export const ModHotvideo = p => post('/smallVideo/update', p);

//删除热门视屏
export const delHotvideo = p => post('/smallVideo/deleteList', p);

//热门视屏上下架
export const AvHotvideo = p => post('/smallVideo/setDisplay', p);

//热门视屏权重
export const setHotvideo = p => post('/smallVideo/setWeight', p);

//查询首页轮播图
export const getindswiper = p => get('/teamBanner/selectList', p);

//新增首页轮播图
export const Addindswiper = p => post('/teamBanner/insert', p);

//删除首页轮播图
export const delindswiper = p => post('/teamBanner/deleteList', p);

//首页轮播图上下架
export const Avindswiper = p => post('/teamBanner/setDisplay', p);

//获取订单列表
export const getOrder = p => get('/order/getOrderList', p);

//取消订单（未发货前可取消）
export const cancelOrder = p => post('/order/cancelOrder', p);

//结束订单
export const finishOrder = p => post('/order/setOrderFinish', p);

//发货
export const startShipping = p => post('/order/setOrderExpressMsg', p);

//获取订单详情
export const getOrderDetail = p => get('/order/getOrderDetail', p);

//设置用户为 推广员 和上下架一样 再点一下删除
export const Addelpromoters = p => post('/user/upSales', p);

//查询推广员
export const getpromoters = p => get('/user/getSalesAll', p);

//取消推广员设置
export const delpromoters = p => post('/user/delSales', p);

//查询启动分销状态
export const selectOne = p => get('/startUpTactics/selectOne', p);

//修改是否禁用分销状态
export const updatOne = p => post('/startUpTactics/update', p);

//获取我的团队 推广员下面的就是一级店长 一级店长下面的就是二级店长
export const getUserTeam = p => get('/user/getUserTeam', p);

//获取我的用户
export const getUserCust = p => get('/user/getUserCust', p);

//查询 我的团队的顾客成交订单 购买记录 更多
export const getPurchaseAl = p => get('/user/getPurchaseAll', p);

//设置商品权重
export const setgoodsWeight = p => post('/goods/setWeight', p);

//获取推荐商品列表
export const getRecGoods = p => get('/goods/getRecGoods', p);


















