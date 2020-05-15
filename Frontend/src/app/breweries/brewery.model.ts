export class Brewery {
	public id: string;
	public name: string;
	public location: string;
	public description: string;
	public picture: string;

	constructor(id: string, name: string, loc: string, desc: string, picture: string) {
		this.id = id;
		this.name = name;
		this.description = desc;
		this.location = loc;
		this.picture = picture;
	}
}
