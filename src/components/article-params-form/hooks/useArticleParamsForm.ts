import { useEffect, useReducer } from 'react';
import { ArticleStateType, OptionType } from 'src/constants/articleProps';
import { reducer, ActionType, Action } from 'src/utils/reducer';

export const useArticleParamsForm = (
	initialSettings: ArticleStateType,
	isOpen: boolean
) => {
	const [temporarySettings, tempDispatch] = useReducer(
		reducer,
		initialSettings
	);

	useEffect(() => {
		if (isOpen) {
			tempDispatch({ type: ActionType.apply_all, payload: initialSettings });
		}
	}, [isOpen, initialSettings]);

	const handleChange = (type: ActionType, value: OptionType) => {
		tempDispatch({ type, payload: value } as Action);
	};

	const resetTemporarySettings = () => {
		tempDispatch({ type: ActionType.reset });
	};

	return {
		temporarySettings,
		handleChange,
		resetTemporarySettings,
	};
};
