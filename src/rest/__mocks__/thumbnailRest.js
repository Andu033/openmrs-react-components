const jpgAttachment = {
  "uuid": "4ae5cca3-0e2f-4ab5-9020-79116b2932c6",
  "dateTime": "2019-07-11T11:33:50.000+0300",
  "comment": "photo",
  "links": [
    {
      "rel": "self",
      "uri": "http://localhost:8080//openmrs/ws/rest/v1/attachment/4ae5cca3-0e2f-4ab5-9020-79116b2932c6"
    }
  ],
  "resourceVersion": "1.8"
}

const jpgDataArrayBuffer = {
}

const api = {
  deleteAttachment: () => {
    return "ok"
  }
  ,
  getAttachment: () => {
    return jpgAttachment
  }
  ,

  getAttachmentBytes: () => {
    return jpgDataArrayBuffer
  }
  ,

  updateAttachment: () => {
    return 'ok'
  }
}

export default api