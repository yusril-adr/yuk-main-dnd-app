import dayjs from "dayjs";
import "dayjs/locale/en";
import "dayjs/locale/id";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(relativeTime);

export default dayjs;
