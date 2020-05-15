export class Beer {
	public id: string;
	public name: string;
	public description: string;
	public type: string;
	public ingredients: string;
	public picture: string;
	public timeToCook: string;

	constructor(
		id: string, name: string, desc: string, type: string,
		ingredients: string, picture: string, timeToCook: string
	) {
		this.id = id;
		this.name = name;
		this.description = desc;
		this.type = type;
		this.ingredients = ingredients;
		this.picture = picture;
		this.timeToCook = timeToCook;
	}
}
