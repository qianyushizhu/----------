export function handleTree(data,rootId){
  // console.log(data);
  // 排序
  function NumCompare(a,b){
    //数字比较函数
    return a.orderNum - b.orderNum;
  }
  rootId = rootId || Math.min.apply(Math, data.map(item => { return item.parentId })) || 0
  // console.log('rootId:',rootId);
  // 对原数据进行克隆
  const cloneData = JSON.parse(JSON.stringify(data))
  // console.log(cloneData);
  //循环所有项
	const treeData = cloneData.filter(father => {
    // return father.id==1
		let branchArr = cloneData.filter(child => {
			//返回每一项的子级数组
      // console.log(father);
      // console.log(child);

			return father.id === child.parentId
		});
    branchArr.sort(NumCompare) 
		branchArr.length > 0 ? father.children = branchArr : '';
		//返回第一层
    // console.log(branchArr);

		return father.parentId === rootId || !father.parentId;
	});
  // console.log(treeData);

  treeData.sort(NumCompare)
  // console.log(treeData);
	return treeData != '' ? treeData : data;
}




