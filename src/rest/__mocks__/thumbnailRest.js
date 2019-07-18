const jpgAttachment = {
  "uuid": "some_uuid",
  "dateTime": "some_date",
  "comment": "photo",
  "links": [
    {
      "rel": "self",
      "uri": "link"
    }
  ],
  "resourceVersion": "1.8"
}

const jpgDataArrayBuffer = {
}

const api = {
  deleteAttachment: (uuid) => {
    return "ok"
  }
  ,
  getAttachment: (uuid) => {
    if (uuid === "some_uuid")
      return jpgAttachment
    else throw "error"
  }
  ,

  getAttachmentBytes: (uuid) => {
    return jpgDataArrayBuffer
  }
  ,

  updateAttachment: (uuid, caption) => {
    return 'ok'
  }
}

export default api