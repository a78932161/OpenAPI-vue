import axios from 'axios'

export function addItemApi(data,doc) {
  return axios({
    url: "/project/create-project",
    method: "post",
    params:data,
    data:doc
  })
}

export function getApi(data) {
  return axios({
    url: data,
    method: "get",
    headers:{'Content-Type':'application/json'},
  })
}


export function getProject(data) {
  return axios({
    url: '/project/getall-project',
    method: "get",
    params:data,
  })
}

export function getProjectid(data) {
  return axios({
    url: '/project/getall-api-info',
    method: "get",
    params:data,
  })
}

export function upItemApi(data,doc) {
  return axios({
    url: '/project/getall-api-info',
    method: "get",
    params:data,
    data:doc
  })
}


