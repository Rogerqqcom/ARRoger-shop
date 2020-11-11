import {request} from "./request"

export function getBusiness(data) {
  return request({
    method: 'get',
    url: './business',
    data
  })
}
//添加用户到user中
export function postBusiness(data) {
  return request({
    method: 'post',
    url: './business',
    data
  })
}

//获取当前用户
export function getOneBusiness(businessId) {
  return request('./business/' + businessId)
}


//更改用户信息/ 添加/修改 地址/用户信息
export function putBusiness (iid,data) {
  return request({
    method: 'put',
    url: './business/'+iid,
    data
  })
}
export function deleteBusiness (id) {
  return request({
    method: 'delete',
    url: './business/'+id,
  })
}

