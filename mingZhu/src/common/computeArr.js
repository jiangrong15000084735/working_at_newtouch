export function computeArr (totalCount, pageSize, listPage) {
  let pageNum = Number(
    String(totalCount / pageSize).split('.')[0]
  )
  let newArr = []
  for (var i = 0; i < pageNum; i++) {
    newArr.push(listPage.splice(0, pageSize))
  }
  if (listPage.length < pageSize) {
    newArr.push(listPage.splice(0, listPage.length))
  }
  listPage = newArr
  return listPage
 
}

 
