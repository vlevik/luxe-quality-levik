import React from 'react';
import { Ad } from '../types';
import { AdsInfo } from './AdsInfo';

type Props = {
	adsToRender: Ad[],
}

export const DetailsSection:React.FC<Props> = ({ adsToRender }) => {
	return (
		<div className='p-4 DetailsSection'>
			<h4 className="title is-4">{`Знайдено ${adsToRender.length} оголошень на видимій території`}</h4>
			{adsToRender.map((ad) => 
				<AdsInfo key={ad.id} ad={ad} /> 
			)}
		</div>
	)
}
