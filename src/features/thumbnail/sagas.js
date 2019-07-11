import { call, put, takeEvery, select } from "redux-saga/effects";
import { checkMIME, arrayBufferToBase64 } from "./utils"
import THUBNAIL_TYPES from "./types";
import thumbnailActions from "./actions";
import { selectors } from "../../store";
import thumbnailRest from "../../rest/thumbnailRest";
import { utils } from "redux-saga";
import galleryRest from "../../rest/galleryRest";

function* fetchThumbnail(action) {

  try {

    const thumbnail = yield call(thumbnailRest.getAttachment, action.uuid.uuid)
    var thumbnails = yield select(selectors.getThumbnails);

    thumbnails = thumbnails.filter(p => (p.uuid === thumbnail.uuid && p.dateTime === thumbnail.dateTime) ? true : false)

    if (thumbnails.length === 0) {
      const buffer = yield call(thumbnailRest.getAttachmentBytes, action.uuid.uuid)
      const res = yield arrayBufferToBase64(buffer)
      yield thumbnail.data = res
      yield thumbnail.MIMEType = checkMIME(buffer);



      yield put(thumbnailActions.fetchThumbnailSucceeded(thumbnail));
    }
    else console.log("already there")
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
  yield takeEvery(THUBNAIL_TYPES.FETCH_REQUESTED, fetchThumbnail)
  yield takeEvery(THUBNAIL_TYPES.UPDATE_REQUESTED, updateThumbnail)
  yield takeEvery(THUBNAIL_TYPES.DELETE_REQUESTED, deleteThumbnail)

}

export default thumbnailSagas;
