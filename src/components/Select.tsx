import React from 'react'
import cn from 'classnames';

type Props = {
	id: string;
	name: string;
	value: string | number;
	onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
	label: string;
	options: string[];
	defaultOption: React.ReactNode;
	className?: string;
	isError?: boolean;
	errorMessage?: string;
}

export const Select: React.FC<Props> = ({
	id,
	name,
	value,
	onChange,
	label,
	options,
	defaultOption,
	className,
	isError,
	errorMessage
}) => {
	return (
		<div className='field'>
		{isError ? <p className="help is-danger my-3 title is-6">{errorMessage}</p> : <label className="label">{label}</label>}
		<div className={cn('select', className, { 'is-danger': isError })}>
			<select id={id} name={name} value={value} onChange={onChange}>
				{defaultOption}
				{options.map(option => (
					<option key={option} value={option}>
						{option}
					</option>
				))}
			</select>
		</div>
		</div>

	)
}
