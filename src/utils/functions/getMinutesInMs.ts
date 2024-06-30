import { getSecsInMs } from "./getSecsInMs";

export const getMinutesInMs = (minutes: number) => minutes * getSecsInMs(60);