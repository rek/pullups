export interface UserLog extends Log {
	user: string;
}
export interface Log {
	data: number[];
	start: string; // start time??
	type: string; // pullup, weight, scale
	weight: number; // the weight when you did this
	created: {seconds: number} // date this data was created
}
export interface Data {
	logs: Log[];
	active: boolean;
	pullups: number;
}
