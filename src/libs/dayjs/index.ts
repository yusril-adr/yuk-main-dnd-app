import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
// Month and day names for the Indonesian pages: dayjs(x).locale("id")
import "dayjs/locale/id";

dayjs.extend(utc);

export default dayjs;
