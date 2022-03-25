import request from '@/utils/request.js'

// 教师名字下拉框
export const teacherPull = () => {
  return request.get('/practiceTeacher/teacherPull')
}

// 查看教师和班级对应的关系
export const getTeacherAndGrade = (params) => {
  return request.get('/practiceTeacher/search', { params })
}

// 删除班级和老师的对应关系
export const deleteTeacherAndGrade = (id) => {
  return request.delete(`/practiceTeacher/delete/${id}`)
}

// 查看老师个人信息
export const getTeacherInfo = (userId) => {
  return request.get(`/search/${userId}`)
}

// 添加教师个人信息
export const addTeacherInfo = (data) => {
  return request.post('/add', data)
}

// 编辑教师信息
export const editTeacherInfo = (id, data) => {
  return request.put(`/update/${id}`, data)
}

// 管理员获取全部教师信息
export const getTeacherAll = (params) => {
  return request.get('/searchAll', { params })
}

// 获取学生体侧数据
export const getStudentData = (params) => {
  return request.get('/physicalFitness/search', { params })
}

// 添加学生体侧成绩
export const addStudentData = (data) => {
  return request.post('/physicalFitness/add', data)
}
