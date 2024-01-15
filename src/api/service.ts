import axios from 'axios';
import { Ad } from '../types';

export const getAllAds = async (chosenRegions?: string[]) => {
	try {
		const res = await axios.get<Ad[]>('http://localhost:3000/ads', { params: { chosenRegions } });

		return res.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
}

export const getAdById = async (id: number) => {
	try {
		const res = await axios.get<Ad[]>(`http://localhost:3000/ads/${id}`);

		return res.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
}

export const addNewAd = async (newAd: Ad) => {
	try {
		const res = await axios.post<Ad>('http://localhost:3000/ads/', newAd);
		return res.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
}