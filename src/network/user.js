import {request} from "./request"

export function getUser(data) {
  return request({
    method: 'get',
    url: './user',
    data
  })
}
//添加用户到user中
export function postUser(data) {
  return request({
    method: 'post',
    url: './user',
    data
  })
}

//获取当前用户
export function getOneUser(userId) {
  return request('./user/' + userId)
}


//更改用户信息/ 添加/修改 地址/用户信息
export function putUser (iid,data) {
  return request({
    method: 'put',
    url: './user/'+iid,
    data
  })
}
