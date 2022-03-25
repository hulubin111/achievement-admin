import Vue from 'vue'

Vue.filter('transformToChinese', (v) => {
  let chinese = ''
  switch (v) {
    case 'date':
      chinese = '日期'
      break
    case 'address':
      chinese = '地址'
      break
    case 'name':
      chinese = '名字'
      break
    case 'number':
      chinese = '学号'
      break
    case 'age':
      chinese = '年龄'
      break
    case 'phone':
      chinese = '电话'
      break
    case 'createTime':
      chinese = '创建时间'
      break
    case 'updateTime':
      chinese = '更新时间'
      break
    case 'gradeId':
      chinese = '班级'
      break
    case 'jobNumber':
      chinese = '工号'
      break
    case 'sex':
      chinese = '性别'
      break
    case 'department':
      chinese = '所属院系'
      break
    default:
      chinese = v
  }
  return chinese
})
