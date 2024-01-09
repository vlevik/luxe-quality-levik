import React from 'react';
import './App.scss';
import { Map } from './components/Map';
import { DetailsSection } from './components/DetailsSection';
import { NewItemForm } from './components/NewItemForm';
import defaultAds from './data/ads.json';
import 'bulma/css/bulma.css';

export const App: React.FC = () => {
	const [selectedAdId, setSelectedAdId] = React.useState<number | null>(null);
	const [chosenRegions, setChosenRegions] = React.useState<string[]>([]);
	const [visibleMarkers, setVisibleMarkers] = React.useState<number[]>([]);
	const [ads, setAds] = React.useState(defaultAds);

	let adsToRender = [...ads];

	if (selectedAdId) {
		adsToRender = adsToRender.filter((ad) => ad.id === selectedAdId);
	}

	if (chosenRegions.length) {
		adsToRender = adsToRender.filter((ad) => chosenRegions.includes(ad.region));
	}
	
	if (visibleMarkers.length) {
		adsToRender = adsToRender.filter((ad) => visibleMarkers.includes(ad.id));
	}

  return (
    <div className="App">
			<NewItemForm setAds={setAds} />
			<Map adsToRender={ads} selectedAdId={selectedAdId} setSelectedAdId={setSelectedAdId} setChosenRegions={setChosenRegions} setVisibleMarkers={setVisibleMarkers}/>
			<DetailsSection adsToRender={adsToRender}/>
    </div>
  );
}

export default App;
