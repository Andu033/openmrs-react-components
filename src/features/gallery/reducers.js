import GALLERY_TYPES from './types'

const initialState = {
  galleries: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GALLERY_TYPES.FETCH_SUCCEEDED:
      {
        state.galleries.push({
          attachments: action.attachments,
          patientUuid: action.patientUuid
        })
        return state;
      }

    default:
      return state
  }
}
