import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Ad, NewAd } from '../types';
import uaRegions from '../data/ua_regions.json';
import uaCities from '../data/ua_cities.json';
import { Input } from './Input';
import { Select } from './Select';
import { addNewAd } from '../api/service';


const regions = uaRegions.features.map(region => region.properties.name);

const formSchema = yup.object({
	title: yup.string().min(3, 'Мінімальна довжина 3 символів').required('Назва обов`язкова'),
	description: yup.string().min(10, 'Мінімальна довжина 10 символів').required('Опис обов`язковий'),
	image: yup.string().url('Невірний URL').required('Зображення обов`язкове'),
	price: yup.number().min(10, 'Мінімальна ціна 10$').required('Ціна обов`язкова'),
	region: yup.string().required('Область обов`язкова').oneOf(regions),
	city: yup.string().required('Місто обов`язкове'),
})

type Props = {
	setAds: React.Dispatch<React.SetStateAction<Ad[]>>;
}
export const NewItemForm: React.FC<Props> = ({ setAds }) => {
	const [selectedOblast, setSelectedOblast] = React.useState<string>('');
	const [availableCities, setAvailableCities] = React.useState<string[]>([]);

	React.useEffect(() => {
		const region = uaRegions.features.find(region => region.properties.name === selectedOblast);
		const cities = [...uaCities].filter(city => city.admin_name === region?.properties['name:en']);
		setAvailableCities(cities.map(city => city.city));
	}, [selectedOblast])

	const { handleSubmit, values, handleChange, errors, touched, resetForm } = useFormik<NewAd>({
		initialValues: {
			title: '',
			description: '',
			image: '',
			price: 0,
			region: '',
			city: '',
			long: 0,
			lat: 0,
		},
		onSubmit: async (values) => {
			const city = uaCities.find(city => city.city === values.city);

			if (city) {
				const newAd = {
					...values,
					id: Date.now(),
					long: Number(city.lng),
					lat: Number(city.lat),
				}
	
				const createdAd = await addNewAd(newAd);
				
				setAds(prev => [createdAd, ...prev]);
				resetForm();
			}
		},
		validationSchema: formSchema,
	});

	const handleRegionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedOblast(event.target.value);
		handleChange(event);
	}

	return (
	<div className='p-4'>
		<h1 className="title is-4">Нове оголошення</h1>
		<form onSubmit={handleSubmit} className='rows'>
			<Input  
				className='row' 
				id='title' 
				type="text" 
				name="title" 
				placeholder="Назва оголошення" 
				value={values.title} 
				onChange={handleChange} 
				label='Назва' 
				isError={touched.title && !!errors.title} 
				errorMessage={errors.title}
			/>
			<Input 
				className='row' 
				id='description' 
				type="text" 
				name="description" 
				placeholder="Опис" 
				value={values.description} 
				onChange={handleChange} 
				label='Опис' 
				isError={touched.description && !!errors.description} 
				errorMessage={errors.description}
			
			/>
			<Input 
				className='row' 
				id='image' 
				type="url" 
				name="image" 
				placeholder="Посилання на зображення" 
				value={values.image} 
				onChange={handleChange} 
				label='Зображення' 
				isError={touched.image && !!errors.image} 
				errorMessage={errors.image}
			/>
			<Input 
				className='row' 
				id='price' 
				type="number" 
				name="price" 
				placeholder="Ціна" 
				value={values.price} 
				onChange={handleChange} 
				label='Ціна' 
				isError={touched.price && !!errors.price} 
				errorMessage={errors.price}
			/>
			<Select 
				className='row' 
				id='region' 
				name="region" 
				value={values.region} 
				onChange={handleRegionChange} 
				defaultOption={<option value="" disabled>Не обрано</option>} 
				label='Область' 
				options={regions} 
				isError={touched.region && !!errors.region} 
				errorMessage={errors.region} 
			/>
			<Select 
				className='row mgt-medium' 
				id='city' 
				name="city" 
				value={values.city} 
				onChange={handleChange} 
				defaultOption={<option value="" disabled>Не обрано</option>} 
				label='Місто' 
				options={availableCities} 
				isError={touched.city && !!errors.city} 
				errorMessage={errors.city} 
			/>
			<button 
				className='row button is-success' 
				type="submit" 
				onClick={() => console.log(errors)} 
				>
					Додати
			</button>
		</form>
	</div>
	);
};
