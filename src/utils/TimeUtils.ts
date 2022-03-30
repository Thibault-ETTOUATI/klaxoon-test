import { GLOBAL } from "../Constants";

export default class TimeUtils {
  // Transforms string date into human time string (ex: "2019-08-13 08:18:34" -> "August 13 2019")
  static formatSecondsIntoHumanTimeString(date: string): string {
    // Delete time value in the date
    const dateWithoutTime = date.split(" ");
    const splitDate = dateWithoutTime[0].split("-");

    const day = splitDate[2];
    const month = splitDate[1];
    const years = splitDate[0];

    // Transform month value from a number to a string (ex: 01 -> January)
    const transformMonthFromNumberToString = () => {
      switch (month) {
        case "01":
          return GLOBAL.DATE.MONTH.JANUARY;
        case "02":
          return GLOBAL.DATE.MONTH.FEBRUARY;
        case "03":
          return GLOBAL.DATE.MONTH.MARCH;
        case "04":
          return GLOBAL.DATE.MONTH.APRIL;
        case "05":
          return GLOBAL.DATE.MONTH.MAY;
        case "06":
          return GLOBAL.DATE.MONTH.JUNE;
        case "07":
          return GLOBAL.DATE.MONTH.JULY;
        case "08":
          return GLOBAL.DATE.MONTH.AUGUST;
        case "09":
          return GLOBAL.DATE.MONTH.SEPTEMBER;
        case "10":
          return GLOBAL.DATE.MONTH.OCTOBER;
        case "11":
          return GLOBAL.DATE.MONTH.NOVEMBER;
        default:
          return GLOBAL.DATE.MONTH.DECEMBER;
      }
    };

    return `${transformMonthFromNumberToString()} ${day} ${years}`;
  }

  // Calculate number of hours
  static getNumberOfHours(seconds: number): number {
    return Math.floor(seconds / 3600);
  }

  // Calculate number of minutes
  static getNumberOfMinutes(seconds: number): number {
    return Math.floor(
      (seconds - TimeUtils.getNumberOfHours(seconds) * 3600) / 60
    );
  }

  // Calculate number of seconds
  static getNumberOfSeconds(seconds: number): number {
    return (
      seconds -
      TimeUtils.getNumberOfHours(seconds) * 3600 -
      TimeUtils.getNumberOfMinutes(seconds) * 60
    );
  }

  // Format time from last update
  static formatTimeFromLastUpdate(sec: number): string {
    const hours = TimeUtils.getNumberOfHours(sec);
    const minutes = TimeUtils.getNumberOfMinutes(sec);
    const seconds = TimeUtils.getNumberOfSeconds(sec);

    if (hours > 0) {
      return `${hours} ${GLOBAL.DATE.SINCE.HOURS}`;
    }
    if (minutes > 0) {
      return `${minutes} ${GLOBAL.DATE.SINCE.MINUTES}`;
    }
    return `${seconds} ${GLOBAL.DATE.SINCE.SECONDS}`;
  }

  // Convert duration from number to HH:MM:SS format (ex: 1455 -> 00:24:15)
  static convertDurationIntoHMSFormat(sec: number): string {
    const hours = TimeUtils.getNumberOfHours(sec);
    const minutes = TimeUtils.getNumberOfMinutes(sec);
    const seconds = TimeUtils.getNumberOfSeconds(sec);

    let newHours = String(hours);
    let newMinutes = String(minutes);
    let newSeconds = String(seconds);

    if (hours < 10) {
      newHours = `0${newHours}`;
    }

    if (minutes < 10) {
      newMinutes = `0${newMinutes}`;
    }

    if (seconds < 10) {
      newSeconds = `0${newSeconds}`;
    }

    return `${newHours}:${newMinutes}:${newSeconds}`;
  }
}
