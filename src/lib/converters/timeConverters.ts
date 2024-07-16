import { DateTime } from "luxon";

export const format_date_from_unix_s = (unix_s_str: string): string => {
  const unix_s = Number(unix_s_str);
  return DateTime.fromSeconds(unix_s).toFormat("yyyy-MM-dd HH:mm:ss ZZ");
};

export const format_date_from_unix_ms = (unix_ms_str: string): string => {
  const unix_ms = Number(unix_ms_str);
  return DateTime.fromMillis(unix_ms).toFormat("yyyy-MM-dd HH:mm:ss ZZ");
};

export const current_time_formatted_local = (): string => {
  return DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss ZZ");
};

export const current_time_formatted_utc = (): string => {
  return DateTime.utc().toFormat("yyyy-MM-dd HH:mm:ss ZZ");
};

export const current_time_unix_s = (): string => {
  return String(Math.floor(DateTime.local().toSeconds()));
};

export const current_time_unix_ms = (): string => {
  return String(Math.floor(DateTime.local().toMillis()));
};
