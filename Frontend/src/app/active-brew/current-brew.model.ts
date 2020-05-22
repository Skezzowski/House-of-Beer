export class CurrentBrew {
	stages: {
		name: string,
		description: string
	}[];
	currentStageIndex: number;
	timeBeforeNextStage: number;
	beerId: string;
	actionNeeded: boolean;
	done: boolean;
}
