import { axiosInstance } from '../config'

const api = {
  deleteAttachment: uuid => {
    return axiosInstance
      .delete(`attachment/${uuid}?purge=true`)
      .then(response => {
        if (response.status !== 200) {
          throw response
        }
      })
  },

  getAttachment: uuid =>
    axiosInstance.get(`attachment/${uuid}`).then(response => {

      if (response.status !== 200) {
        throw response
      } else {
        console.log(response)
        return response.data
      }
    }),

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
