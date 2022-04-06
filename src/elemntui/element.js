// 导入自己需要的组件
import { Radio, RadioGroup, Progress, Slider, Row, Col, Upload, Button, Input, Breadcrumb, BreadcrumbItem, Scrollbar, Table, Tabs, TabPane, Dropdown, DropdownItem, DropdownMenu, TableColumn, Loading, Pagination, Form, FormItem, Submenu, Menu, Select, Image, MenuItem, MenuItemGroup, Dialog, Message, DatePicker, Checkbox, Notification, MessageBox } from 'element-ui'
const element = {
  install: function (Vue) {
    Vue.use(Button)
    Vue.use(Upload)
    Vue.use(Slider)
    Vue.use(Progress)
    Vue.use(RadioGroup)
    Vue.use(Radio)
    Vue.use(Menu)
    Vue.use(MenuItem)
    Vue.use(MenuItemGroup)
    Vue.use(Submenu)
    Vue.use(Breadcrumb)
    Vue.use(BreadcrumbItem)
    Vue.use(Scrollbar)
    Vue.use(Tabs)
    Vue.use(TabPane)
    Vue.use(Dropdown)
    Vue.use(DropdownItem)
    Vue.use(DropdownMenu)
    Vue.use(Loading)
    Vue.use(DatePicker)
    Vue.use(Select)
    Vue.use(Image)
    Vue.use(Checkbox)
    Vue.use(Row)
    Vue.use(Col)
    Vue.use(Table)
    Vue.use(TableColumn)
    Vue.use(Pagination)
    Vue.use(Form)
    Vue.use(FormItem)
    Vue.use(Input)
    Vue.use(Dialog)
    Vue.prototype.$message = Message
    Vue.prototype.$messageBox = MessageBox
    Vue.prototype.$notify = Notification
    // 解决首次进入自动弹出的问题
    Vue.component(Message.name, Message)
    Vue.component(Notification.name, Notification)
    Vue.component(MessageBox.name, MessageBox)
  }
}
export default element