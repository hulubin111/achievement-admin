import request from '@/utils/request.js'

// 管理员获取学生信息
export const getStudentInfo = (params) => {
  return request.get('/userInfo/searchByAdmin', { params })
}

// 查看学生个人信息
export const getPerStuInfo = (userId) => {
  return request.get(`/userInfo/search/${userId}`)
}

// 修改用户信息
export const editStudentInfo = (id, data) => {
  return request.put(`/userInfo/update/${id}`, data)
}

// 添加个人信息
export const addPerInfo = (data) => {
  return request.post('/userInfo/add', data)
}
