export type Ad = {
	"id": number,
	"title": string,
	"description": string,
	"image": string,
	"price": number,
	"long": number,
	"lat": number,
	"city": string,
	"region": string
};

export type NewAd = Omit<Ad, 'id' | 'location'> ;
