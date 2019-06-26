import THUMBNAIL_TYPES from './types'

export default (state = {}, action) => {
  switch (action.type) {
    case THUMBNAIL_TYPES.UPDATE_SUCCEEDED:
      return state.thumbnails.map(thumbnail =>
        thumbnail.uuid === action.uuid
          ? { ...thumbnail, caption: action.caption }
          : thumbnail
      )

    case THUMBNAIL_TYPES.FETCH_SUCCEEDED:
      {
        state.thumbnails.push(action.thumbnail);
        return state;
      }

    case THUMBNAIL_TYPES.DELETE_SUCCEEDED:
      for (var i = 0; i < state.thumbnails.length; i++) {
        if (state.thumbnails[i].uuid === action.uuid) {
          state.thumbnails.splice(i, 1)
          break
        }
        return state
      }

    default:
      return state
  }
}

export const getThumbnails = (state) => {
  return state.thumbnails;
};