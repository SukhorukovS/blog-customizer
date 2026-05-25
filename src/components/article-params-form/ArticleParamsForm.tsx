import { FC, useRef, useState } from 'react';

import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';
import { Select } from 'src/ui/select';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import { ActionType } from 'src/utils/reducer';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { useArticleParamsForm } from './hooks/useArticleParamsForm';

type Props = {
	settings: ArticleStateType;
	onApply: (newSettings: ArticleStateType) => void;
	onReset: () => void;
};

export const ArticleParamsForm: FC<Props> = ({
	settings,
	onApply,
	onReset,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const formRef = useRef(null);

	useOutsideClickClose({ isOpen, rootRef: formRef, onChange: setIsOpen });

	const { temporarySettings, handleChange, resetTemporarySettings } =
		useArticleParamsForm(settings, isOpen);

	const handleApply = (e: React.FormEvent) => {
		e.preventDefault();
		onApply(temporarySettings);
		setIsOpen(false);
	};

	const resetState = () => {
		onReset();
		resetTemporarySettings();
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
			<aside
				className={clsx(styles.container, isOpen && styles.container_open)}
				ref={formRef}>
				<form className={styles.form} onSubmit={handleApply}>
					<Select
						title='шрифт'
						options={fontFamilyOptions}
						selected={temporarySettings.fontFamilyOption}
						onChange={(value) => handleChange(ActionType.set_font, value)}
					/>
					<RadioGroup
						title='размер шрифта'
						options={fontSizeOptions}
						selected={temporarySettings.fontSizeOption}
						name='fontSize'
						onChange={(value) => handleChange(ActionType.set_font_size, value)}
					/>
					<Select
						title='цвет шрифта'
						options={fontColors}
						selected={temporarySettings.fontColor}
						onChange={(value) => handleChange(ActionType.set_font_color, value)}
					/>
					<Separator />
					<Select
						title='цвет фона'
						options={backgroundColors}
						selected={temporarySettings.backgroundColor}
						onChange={(value) => handleChange(ActionType.set_bg_color, value)}
					/>
					<Select
						title='ширина контента'
						options={contentWidthArr}
						selected={temporarySettings.contentWidth}
						onChange={(value) =>
							handleChange(ActionType.set_content_width, value)
						}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='button'
							type='clear'
							onClick={resetState}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
