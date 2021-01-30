export interface Log {
	data: number[];
	start: string;
	type: string;
	created: {seconds: number}
}
export interface Data {
	logs: Log[];
	active: boolean;
	pullups: number;
}
