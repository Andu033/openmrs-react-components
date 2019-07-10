import GALLERY_TYPES from './types'


const fetchGalleryRequested = uuid => ({
  type: GALLERY_TYPES.FETCH_REQUESTED,
  uuid: uuid
})

const fetchGalleryFailed = message => ({
  type: GALLERY_TYPES.FETCH_FAILED,
  message: message
})

const fetchGallerySucceded = (attachments, uuid) => ({
  type: GALLERY_TYPES.FETCH_SUCCEEDED,
  attachments: attachments,
  patientUuid: uuid
})


export default {
  fetchGalleryFailed,
  fetchGalleryRequested,
  fetchGallerySucceded

}
