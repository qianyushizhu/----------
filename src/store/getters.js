const getters = {
  userName: state => state.user.userName,
  isCollapse:state => state.setting.isCollapse,
  menuList:state => state.user.menuList,
  roles:state => state.user.roles,
  itemList:state => state.mainData.itemList,
  activeRoute:state => state.mainData.activeRoute,
  breadList:state => state.mainData.breadList,
}
export default getters