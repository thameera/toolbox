import { DateTime } from "luxon";

export const format_date_from_unix_s = (unix_s_str: string): string => {
  const unix_s = Number(unix_s_str);
  return DateTime.fromSeconds(unix_s).toFormat("yyyy-MM-dd HH:mm:ss ZZ");
};

export const format_date_from_unix_ms = (unix_ms_str: string): string => {
  const unix_ms = Number(unix_ms_str);
  return DateTime.fromMillis(unix_ms).toFormat("yyyy-MM-dd HH:mm:ss ZZ");
};
