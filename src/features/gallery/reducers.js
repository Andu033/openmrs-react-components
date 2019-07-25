import GALLERY_TYPES from './types'

const initialState = {
  galleries: []
};

export default (state = initialState, action) => {

  switch (action.type) {
    case GALLERY_TYPES.FETCH_SUCCEEDED:
      {
        for (var i = 0; i < state.galleries.length; i++) {
          if (state.galleries[i].patientUuid === action.patientUuid) {
            state.galleries.splice(i, 1);
          }
        }

        state.galleries.push({
          attachments: action.attachments,
          patientUuid: action.patientUuid
        })
        return state;
      }

    case GALLERY_TYPES.DELETE_ATTACHMENT:
      {
        console.log("-------------------------asdsadasdasdas-----------------------------")
        for (var i = 0; i < state.galleries.length; i++) {
          state.galleries[i].attachments = state.galleries[i].attachments.filter(el => el.uuid != action.uuid)
        }
        return state;
      }

    default:
      return state
  }
}
