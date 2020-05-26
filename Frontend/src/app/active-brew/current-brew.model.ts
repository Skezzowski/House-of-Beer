export interface Stage {
	name: string,
	description: string,
	time: number
}

export class CurrentBrew {
	stages: Stage[];
	currentStageIndex: number;
	timeBeforeNextStage: number;
	beerId: string;
	actionNeeded: boolean;
	done: boolean;
}
