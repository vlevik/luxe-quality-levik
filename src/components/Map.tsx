/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster'
import uaRegions from '../data/ua_regions.json';
import { GeoJSON } from 'react-leaflet';
import L, { LeafletMouseEvent } from "leaflet";
import { MapEvents } from "./MapEvents";
import LocationMarker from '../markersIcons/location-sign.svg'
import LocationMarkerSelected from '../markersIcons/location-sign-selected.svg'
import { Ad } from '../types';
import { Feature, Geometry } from '@turf/turf';

type Props = {
	adsToRender: Ad[],
	selectedAdId: number | null,
	setSelectedAdId: React.Dispatch<React.SetStateAction<number | null>>,
	setChosenRegions: React.Dispatch<React.SetStateAction<string[]>>,
	setVisibleMarkers: React.Dispatch<React.SetStateAction<number[]>>
}

export const Map: React.FC<Props> = ({ adsToRender, selectedAdId, setSelectedAdId, setChosenRegions, setVisibleMarkers }) => {
	const [updatedGeoRef, setUpdatedGeoRef] = React.useState(false);

  const geoJsonRef = React.useRef<L.GeoJSON<any, any> & { chosenRegions?: number[] }>(null);
	const mapRef = React.useRef<L.Map>(null);

	const handleViewportChange = () => {
		const markersOnMap = adsToRender.filter(ad => mapRef.current && mapRef.current.getBounds().contains([ad.location[0], ad.location[1]]));
		setVisibleMarkers(markersOnMap.map(ad => ad.id));
	}

	useEffect(() => {
		if(geoJsonRef.current) {
			geoJsonRef.current.chosenRegions = [];
		}
	}, [geoJsonRef, updatedGeoRef]);

  const highlightFeature = (e: LeafletMouseEvent) => {
    const layer = e.target;

		if (geoJsonRef.current && geoJsonRef.current.chosenRegions && !geoJsonRef.current.chosenRegions.includes(layer._leaflet_id)) {
			layer.setStyle({
				weight: 5,
				color: '#666',
				dashArray: '',
				fillOpacity: 0.7
			});

			layer.bringToFront();
		}
  };

  const resetHighlight = (e: LeafletMouseEvent) => {
    if (geoJsonRef.current && geoJsonRef.current.chosenRegions && !geoJsonRef.current.chosenRegions.includes(e.target._leaflet_id)) {
      geoJsonRef.current.resetStyle(e.target);
    } 
  }

  const handleChoose = (e: LeafletMouseEvent) => {
    const layer = e.target;

		if(geoJsonRef.current && geoJsonRef.current.chosenRegions) {
			if(geoJsonRef.current.chosenRegions.includes(layer._leaflet_id)) {
				geoJsonRef.current.chosenRegions.splice(geoJsonRef.current.chosenRegions.indexOf(layer._leaflet_id), 1);
				setChosenRegions(prev=> prev.filter(region => region !== layer.feature.properties.name));
				geoJsonRef.current.resetStyle(layer);
			} else {
				setSelectedAdId(null);

				geoJsonRef.current.chosenRegions.push(layer._leaflet_id);
				setChosenRegions(prev=> [...prev, layer.feature.properties.name]);
				layer.setStyle({
					weight: 0,
					color: '#fff',
					dashArray: '',
					fillOpacity: 0
				});
			}
		} else {
			if(geoJsonRef.current) {
				geoJsonRef.current.chosenRegions = [layer._leaflet_id];
			}
			if (selectedAdId) {
				setSelectedAdId(null);
			}
		}
  }

  const onEachFeature = (feature: Feature<Geometry, any>, layer: L.Layer) => {
    layer.on({
      click: handleChoose,
      mouseover: highlightFeature,
      mouseout: resetHighlight,
    });
  };

const LocationIcon = L.icon({
	iconUrl: LocationMarker,
	iconSize: [40, 40],
	iconAnchor: [20, 36],
});

const SelectedLocationIcon = L.icon({
	iconUrl: LocationMarkerSelected,
	iconSize: [40, 40],
	iconAnchor: [20, 36],
});

const handleGeoJsonRefUpdate = (newRef: React.Ref<L.GeoJSON<any, any>>) => {
		{/* @ts-ignore */}
		geoJsonRef.current = newRef;
		setUpdatedGeoRef(true);
}

const handleOnMarkerClick = (ad: Ad) => {
	if (selectedAdId === ad.id) {
		setSelectedAdId(null);
	} else {
		setSelectedAdId(ad.id);
		if(geoJsonRef.current) {
			geoJsonRef.current.chosenRegions = [];

		}
		setChosenRegions([]);
	}
}

	return (
		<MapContainer ref={mapRef} className="Map" style={{ height: '100vh', width: '70vw'}} center={[48.49, 31.26]} zoom={6} scrollWheelZoom={false} 	 >
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			{/* @ts-ignore */}
			<GeoJSON ref={handleGeoJsonRefUpdate} data={uaRegions} onEachFeature={onEachFeature} />
			<MapEvents handleViewportChange={handleViewportChange} />
			<MarkerClusterGroup chunkedLoading maxClusterRadius={25}>
				{adsToRender.map((ad) => (
					<Marker 
						key={ad.id} 
						position={[ad.location[0], ad.location[1]] } 
						icon={selectedAdId === ad.id ? SelectedLocationIcon : LocationIcon}
						eventHandlers={{ click: () => handleOnMarkerClick(ad) }} 
					/>)
				)}
			</MarkerClusterGroup>
		</MapContainer>
	)
}