import { all } from 'redux-saga/effects';
import authWatcher from './auth.saga';
import lessonWatcher from './lesson.saga';
import matchWatcher from './match.saga';
import taskWatcher from './task.saga';
import tutorialWatcher from './tutorial.saga';
import betWatcher from "./bet.saga";
import heroWatcher from "./hero.saga";

export default function* _rootSaga() {
  yield all([
	  authWatcher(),
    betWatcher(),
    lessonWatcher(),
    heroWatcher(),
    matchWatcher(),
    taskWatcher(),
    tutorialWatcher(),
  ]);
}
