export default function transform(v) {
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
    case 'chinning':
      chinese = '引体向上'
      break
    case 'eightHundred':
      chinese = '	八百米成绩'
      break
    case 'fourHundred':
      chinese = '	四百米成绩'
      break
    case 'height':
      chinese = '		身高'
      break
    case 'jump':
      chinese = '		跳远'
      break
    case 'oneHundred':
      chinese = '		百米成绩'
      break
    case 'pulmonary':
      chinese = '		肺活量'
      break
    case 'sitAndReach':
      chinese = '		座位体前屈'
      break
    case 'sitUp':
      chinese = '		仰卧起坐'
      break
    case 'weight':
      chinese = '			体重'
      break
    default:
      chinese = v
  }
  return chinese
}
