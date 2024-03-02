export declare class Duration {
	constructor(millisecond: number);
	
	get amount(): number;
	set amount(value: number);
	
	get millisecond(): number;
	set millisecond(value: number);
	
	get second(): number;
	set second(value: number);
	
	get day(): number;
	set day(value: number);
	
	toString(): string;
}

export declare interface DateTemplate {
	year?: number;
	month?: number;
	day?: number;
}

type $D = globalThis.Date;

export declare class Date {
	constructor(year: number, month: number, day: number);
	
	get year(): number;
	set year(value: number);
	
	get month(): number;
	set month(value: number);
	
	get day(): number;
	set day(value: number);
	
	eq(dateObject: Date | DateTemplate): boolean;
	
	subtract(dateObject: Date | Duration | DateTemplate): Duration | Date;
	
	toString(): string;
	
	toObject(): DateTemplate;
}

export declare interface TimeTemplate {
	hour?: number;
	minute?: number;
	second?: number;
	millisecond?: number;
}

export declare class Time {
	constructor(hour: number, minute: number, second: number, millisecond: number);
	
	get hour(): number;
	set hour(value: number);
	
	get minute(): number;
	set minute(value: number);
	
	get second(): number;
	set second(value: number);
	
	get millisecond(): number;
	set millisecond(value: number);
	
	eq(timeObject: Time | TimeTemplate): boolean;
	
	subtract(timeObject: Time | Duration | TimeTemplate): Duration | Time;
	
	toString(): string;
	
	toObject(): TimeTemplate;
}

export declare interface SetDateTimeTemplate extends DateTemplate, TimeTemplate {
	year?: number;
	month?: number;
	day?: number;
	hour?: number;
	minute?: number;
	second?: number;
	millisecond?: number;
}

export declare interface GetDateTimeTemplate extends DateTemplate, TimeTemplate {
	year?: number;
	month?: number;
	day?: number;
	weekday?: number;
	hour?: number;
	minute?: number;
	second?: number;
	millisecond?: number;
}

export declare interface DurationTemplate {
	year?: number;
	month?: number;
	day?: number;
	week?: number;
	hour?: number;
	minute?: number;
	second?: number;
	millisecond?: number;
}

export declare class DateTime {
	constructor(datetimeObject?: DateTime | $D | SetDateTimeTemplate | number | string, locale?: string);
	
	private _source: $D;
	private _locale: string;
	
	get date(): Date;
	set date(value: Date);
	
	get time(): Time;
	set time(value: Time);
	
	get year(): number;
	set year(value: number);
	
	get month(): number;
	set month(value: number);
	
	get day(): number;
	set day(value: number);
	
	get weekday(): number;
	
	get weekdayName(): string;
	
	get hour(): number;
	set hour(value: number);
	
	get minute(): number;
	set minute(value: number);
	
	get second(): number;
	set second(value: number);
	
	get millisecond(): number;
	set millisecond(value: number);
	
	get locale(): string;
	set locale(value: string);
	
	timestamp(): number;
	
	toString(formatString?: string): string;
	
	humanize(): string;
	
	toNumber(): number;
	
	toDate(): $D;
	
	toObject(): GetDateTimeTemplate;
	
	static fromTimestamp(timestamp: number): DateTime;
	
	static fromString(dateString: string, locale?: string): DateTime;
	
	static dehumanize(dateString: string, locale?: string): DateTime;
	
	static fromNumber(timestamp: number): DateTime;
	
	static fromDate(date: $D): DateTime;
	
	static fromObject(datetimeObject: SetDateTimeTemplate, standard?: DateTime | SetDateTimeTemplate): DateTime;
	
	add(datetimeObject: DateTime | Duration | DurationTemplate): DateTime;
	
	subtract(datetimeObject: DateTime | Duration | DurationTemplate): DateTime | Duration;
	
	set(datetimeObject: DateTime | SetDateTimeTemplate | Date | Time): DateTime;
	
	eq(datetimeObject: DateTime | number | $D | SetDateTimeTemplate, ignoreMillisecond?: boolean): boolean;
	
	neq(datetimeObject: DateTime | number | $D | SetDateTimeTemplate, ignoreMillisecond?: boolean): boolean;
	
	ge(datetimeObject: DateTime | number | $D | SetDateTimeTemplate): boolean;
	
	gt(datetimeObject: DateTime | number | $D | SetDateTimeTemplate): boolean;
	
	le(datetimeObject: DateTime | number | $D | SetDateTimeTemplate): boolean;
	
	lt(datetimeObject: DateTime | number | $D | SetDateTimeTemplate): boolean;
	
	static at(hour: number, minute?: number, second?: number, millisecond?: number): DateTime;
	
	static in(year: number): DateTime;
	
	static on(month: number, day?: number): DateTime;
	
	static set(datetimeObject: SetDateTimeTemplate): DateTime;
	
	static parse(dateString: string, locale?: string): DateTime | undefined;
	
	static parseWithFilteredString(dateString: string, locale?: string): { parse: DateTime | undefined, string: string };
	
	// private static _parse(dateString: string, locale?: string): [ SetDateTimeTemplate, string? ];
	
	static now(): DateTime;
	
	static today(): DateTime;
	
	static tomorrow(): DateTime;
	
	static yesterday(): DateTime;
	
	static sunday(): DateTime;
	
	static monday(): DateTime;
	
	static tuesday(): DateTime;
	
	static wednesday(): DateTime;
	
	static thursday(): DateTime;
	
	static friday(): DateTime;
	
	static saturday(): DateTime;
	
	static january(day?: number): DateTime;
	
	static february(day?: number): DateTime;
	
	static march(day?: number): DateTime;
	
	static april(day?: number): DateTime;
	
	static may(day?: number): DateTime;
	
	static june(day?: number): DateTime;
	
	static july(day?: number): DateTime;
	
	static august(day?: number): DateTime;
	
	static september(day?: number): DateTime;
	
	static october(day?: number): DateTime;
	
	static november(day?: number): DateTime;
	
	static december(day?: number): DateTime;
	
	static isLeapYear(year: number): boolean;
	
	static leapYearCount(start: number, end: number): number;
	
	static lengthOfMonth(year: number, month: number): number;
	
	static lengthOfYear(year: number): number;
	
	static getWeekdayFromName(weekDayName: string, startOnMon?: boolean, locale?: string): number;
	
	isLeapYear(): boolean;
	
	isWeekend(): boolean;
	
	isWeekday(): boolean;
	
	isToday(): boolean;
	
	lengthOfMonth(): number;
	
	lengthOfYear(): number;
}