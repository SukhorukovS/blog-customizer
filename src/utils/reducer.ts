import {
	ArticleStateType,
	defaultArticleState,
	OptionType,
} from 'src/constants/articleProps';

export type SetFontAction = {
	type: ActionType.set_font;
	payload: OptionType;
};

export type SetFontSizeAction = {
	type: ActionType.set_font_size;
	payload: OptionType;
};

export type SetFontColorAction = {
	type: ActionType.set_font_color;
	payload: OptionType;
};

export type SetBgColorAction = {
	type: ActionType.set_bg_color;
	payload: OptionType;
};

export type SetContentWidthAction = {
	type: ActionType.set_content_width;
	payload: OptionType;
};

export type ResetAction = {
	type: ActionType.reset;
};

export type ApplyAllAction = {
	type: ActionType.apply_all;
	payload: ArticleStateType;
};

export type Action =
	| SetFontAction
	| SetFontSizeAction
	| SetFontColorAction
	| SetBgColorAction
	| SetContentWidthAction
	| ResetAction
	| ApplyAllAction;

export enum ActionType {
	set_font,
	set_font_size,
	set_font_color,
	set_bg_color,
	set_content_width,
	reset,
	apply_all,
}

export function reducer(
	state: ArticleStateType,
	action: Action
): ArticleStateType {
	switch (action.type) {
		case ActionType.set_font: {
			return {
				...state,
				fontFamilyOption: action.payload,
			};
		}
		case ActionType.set_font_size: {
			return {
				...state,
				fontSizeOption: action.payload,
			};
		}
		case ActionType.set_font_color: {
			return {
				...state,
				fontColor: action.payload,
			};
		}
		case ActionType.set_bg_color: {
			return {
				...state,
				backgroundColor: action.payload,
			};
		}
		case ActionType.set_content_width: {
			return {
				...state,
				contentWidth: action.payload,
			};
		}
		case ActionType.reset: {
			return defaultArticleState;
		}
		case ActionType.apply_all: {
			return action.payload;
		}
		default:
			return state;
	}
}
