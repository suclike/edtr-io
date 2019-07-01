import { put, select, takeEvery } from 'redux-saga/effects'

import { serializeDocument } from '../documents/reducer'
import { copy, CopyAction, pureCopy } from './actions'
import { scopeSelector } from '../helpers'

export function* clipboardSaga() {
  yield takeEvery(copy.type, copySaga)
}

function* copySaga(action: CopyAction) {
  const document: ReturnType<typeof serializeDocument> = yield select(
    scopeSelector(serializeDocument, action.scope),
    action.payload
  )
  if (!document) return
  yield put(pureCopy(action.scope)(document))
}
