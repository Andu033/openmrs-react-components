import { call, put, takeEvery, all } from "redux-saga/effects";

import THUBNAIL_TYPES from "./types";
import thumbnailActions from "./actions";
// import { selectors } from "../../store";
import thumbnailRest from "../../rest/thumbnailRest";

function* fetchThumbnail(action) {

  try {
    const thumbnail = yield call(thumbnailRest.getAttachment, action.uuid)
    yield put(thumbnailActions.fetchThumbnailSucceeded(thumbnail));
  }
  catch (e) {
    yield put(thumbnailActions.fetchThumbnailFailed(e.message));
  }
}

function* updateThumbnail(action) {

  try {
    yield call(thumbnailRest.updateAttachment, action.uuid, action.caption)
    yield put(thumbnailActions.updateThumbnailSucceeded(action.uuid, action.caption));
  }
  catch (e) {
    yield put(thumbnailActions.updateThumbnailFailed(e.message));
  }
}

function* deleteThumbnail(action) {

  try {
    yield call(thumbnailRest.deleteAttachment, action.uuid)
    yield put(thumbnailActions.deleteThumbnailSucceeded(action.uuid));
  }
  catch (e) {
    yield put(thumbnailActions.deleteThumbnailFailed(e.message));
  }

}

function* thumbnailSagas() {
  yield all([
    takeEvery(THUBNAIL_TYPES.FETCH_REQUESTED, fetchThumbnail),
    takeEvery(THUBNAIL_TYPES.UPDATE_REQUESTED, updateThumbnail),
    takeEvery(THUBNAIL_TYPES.DELETE_REQUESTED, deleteThumbnail)
  ]);
}

export default thumbnailSagas;
