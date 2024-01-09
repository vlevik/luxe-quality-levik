import React from 'react'
import cn from 'classnames';

type Props = {
	id: string;
	type: string; 
	name: string;
	placeholder: string;
	value: string | number;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	label: string;
	isError?: boolean;
	errorMessage?: string;
	className?: string;
}

export const Input: React.FC<Props> = ({
	id,
	type,
	name,
	placeholder,
	value,
	onChange,
	label,
	className,
	isError,
	errorMessage
}) => {
	return (
		<div className={cn('field mg-small', className)}>
			{isError ? <p className="help is-danger my-3 title is-6">{errorMessage}</p> : <label className="label">{label} </label>}
			<div className="control">
			<input 
					className={cn('input', { 'is-danger': isError })}
					id={id} 
					type={type} 
					name={name} 
					placeholder={placeholder} 
					value={value} 
					onChange={onChange}
				/>
			</div>
			
		</div>
	)
}
