const setting = {
  state: {
    isCollapse:false
  },

  mutations: {
    changeCollapse: (state) => {
      state.isCollapse = state.isCollapse?false:true
    },
  },

  actions: {
    
  }
}

export default setting