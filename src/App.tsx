import React, { useEffect } from 'react';
import './App.scss';
import { Map } from './components/Map';
import { DetailsSection } from './components/DetailsSection';
import { NewItemForm } from './components/NewItemForm';
import 'bulma/css/bulma.css';
import { getAllAds } from './api/service';
import { Ad } from './types';

export const App: React.FC = () => {
	const [selectedAdId, setSelectedAdId] = React.useState<number | null>(null);
	const [chosenRegions, setChosenRegions] = React.useState<string[] | undefined>();
	const [visibleMarkers, setVisibleMarkers] = React.useState<number[]>([]);
	const [ads, setAds] = React.useState<Ad[]>([]);
	const [adsToRender, setAdsToRender] = React.useState<Ad[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			const res = await getAllAds(chosenRegions);
			const mappedAds = res.map(ad => ({ ...ad, lat: +ad.lat, long: +ad.long }))

			setAds(mappedAds);
			setAdsToRender(mappedAds);
			setVisibleMarkers(mappedAds.map(ad => ad.id));
		}
			
		fetchData();
	}, [chosenRegions, ads.length]);

	useEffect(() => {
			let localAdsToRender: Ad[] = [];

			if (visibleMarkers.length) {
				localAdsToRender = ads.filter((ad) => visibleMarkers.includes(ad.id));
			}

			setAdsToRender(localAdsToRender); 
	}, [visibleMarkers, ads]);

  return (
    <div className="App">
			<NewItemForm setAds={setAds} />
			<Map ads={ads} adsToRender={adsToRender} selectedAdId={selectedAdId} setSelectedAdId={setSelectedAdId} setChosenRegions={setChosenRegions} setVisibleMarkers={setVisibleMarkers}/>
			<DetailsSection adsToRender={adsToRender}/>
    </div>
  );
}

export default App;
