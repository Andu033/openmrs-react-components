import { axiosInstance } from '../config'

const api = {
  deleteAttachment: uuid => {
    return axiosInstance
      .delete(`attachment/${uuid}?purge=true`)
      .then(response => {
        if (response.status !== 200) {
          throw response.data
        }
      })
  },

  getAttachment: uuid =>
    axiosInstance.get(`attachment/${uuid}`).then(response => {
      if (response.status !== 200) {
        throw response
      } else {
        return response.data
      }
    })
  ,

  getAttachmentBytes: uuid =>
    axiosInstance.get(`attachment/${uuid}/bytes`, {
      responseType: 'arraybuffer'
    }).then(response => {
      if (response.status !== 200) {
        throw response
      } else {
        return new Buffer(response.data, 'binary')
      }
    })
  ,

  updateAttachment: (uuid, comment) =>
    axiosInstance.post(`attachment/`).then(response => {
      if (response.status !== 200) {
        throw response
      } else {
        return response.data
      }
    })
}

export default api
