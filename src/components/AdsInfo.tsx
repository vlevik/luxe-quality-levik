import React from 'react';
import { Ad } from '../types';

type Props = {
	ad: Ad,
}

export const AdsInfo: React.FC<Props> = ({ ad }) => {
	return (
		<div className="card box">
			<div className="card-image is-square"> 
				<figure className="image is-1by1">
					<img src={ad.image} alt={ad.title} style={{objectFit: 'cover'}}/>
				</figure>
			</div>
			<div className='card-header-title'>{ad.title}</div>
			<div>{ad.description}</div>
			<div>{`${ad.price} $`}</div>
			<div>{ad.city}</div>
		</div>
	)
}
