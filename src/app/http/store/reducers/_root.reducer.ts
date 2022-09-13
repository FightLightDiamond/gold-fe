import { combineReducers } from "redux";
import { IAction } from '../IAction';
import authReducer from './auth.slice';
import betReducer from './bet.slice';
import chartsReducer from './charts.slice';
import wsReducer from './ws.slice';
import tutorialReducer from './tutorial.slice'
import lessonReducer from './lesson.slice'
import taskReducer from './task.slice'
import matchReducer from './match.slice'
import eloMatchReducer from './elo-match.slice'
import heroReducer from './hero.slice'
import statisticMatchesReducer from './statistic-matches.slice'
import userHeroReducer from './user-hero.slice'

const appReducer = combineReducers({
	auth: authReducer,
	bet: betReducer,
	charts: chartsReducer,
	eloMatch: eloMatchReducer,
	hero: heroReducer,
	lesson: lessonReducer,
	match: matchReducer,
	task: taskReducer,
	tutorial: tutorialReducer,
	statisticMatches: statisticMatchesReducer,
	userHero: userHeroReducer,
	ws: wsReducer,
})

const rootReducer = (state: any, action: IAction<any>) => {
    return appReducer(state, action);
}

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer;
