export type Ad = {
	"id": number,
	"title": string,
	"description": string,
	"image": string,
	"price": number,
	"location": number[],
	"city": string,
	"region": string
};

export type NewAd = Omit<Ad, 'id' | 'location'> ;
