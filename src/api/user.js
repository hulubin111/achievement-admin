import request from '@/utils/request'
// 登录
export const login = (data) => {
  return request.post('/sys/login', data)
}

// 添加用户账号
export const addUser = (data) => {
  return request.post('/sys/add', data)
}

// 查找用户
export const searchUser = (params) => {
  return request.get('/sys/search', { params })
}

// 删除用户
export const deleteUser = (id) => {
  return request.delete(`/sys/delete/${id}`)
}

// 编辑用户’
export const editUser = (id, data) => {
  return request.put(`/sys/update/${id}`, data)
}

