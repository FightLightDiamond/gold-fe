import {
	useSelector as useReduxSelector,
	TypedUseSelectorHook,
} from 'react-redux'
import { RootState } from '../http/store/reducers/_root.reducer';

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
