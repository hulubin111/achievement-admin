import request from '@/utils/request'

// 班级下拉框
export const getGradePull = () => {
  return request.get('/practiceTeacher/gradePull')
}

// 获取所有的班级
export const getAllGrade = (params) => {
  return request.get('/grade/search', { params })
}

// 添加班级
export const addGrade = (data) => {
  return request.post('/grade/add', data)
}

// 删除班级
export const deleteGrade = (id) => {
  return request.delete(`/grade/delete/${id}`)
}

// 给班级安排老师
export const addTeacherToGrade = (data) => {
  return request.post('/practiceTeacher/add', data)
}
