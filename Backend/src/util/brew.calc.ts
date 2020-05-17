import { IBrew, IBrewMenuModel } from "../models/brew.model";

export function brewsToMenuModel(brews: IBrew[]): IBrewMenuModel[] {
	const result: IBrewMenuModel[] = []

	brews.map(brew => {
		result.push({
			beerId: brew.beer._id,
			beerName: brew.beer.name,
			beerType: brew.beer.type,
			brewId: brew._id,
			actionNeeded: isActionNeeded(brew)
		});
	});

	return result;
}

export function isActionNeeded(brew: IBrew): Boolean {
	let timeSinceLastStage = Date.now() - brew.lastModificationDate.getTime()
	return timeSinceLastStage > hourToMilliseconds(brew.beer.stages[brew.activeStageIndex].time)
}

export function getTimeBeforeNextStage(brew: IBrew): number {
	const timeWhenStageDone = brew.lastModificationDate.getTime() +
		hourToMilliseconds(brew.beer.stages[brew.activeStageIndex].time);

	const timeBeforeStageDone = timeWhenStageDone - Date.now();
	if (timeWhenStageDone <= 0) {
		return -1;
	} else {
		return millisecondsToHour(timeBeforeStageDone);
	}
}

function hourToMilliseconds(hour: number): number {
	return hour * 3600000;
}

function millisecondsToHour(millisec: number) {
	return millisec / 3600000;
}