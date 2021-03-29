import { StringToNumber } from './ArrayStringToNumber';
import moment from 'moment';

//Calculate the diff between days
export function DateDiff(Date, current) {
  const curretDate = moment(current)
    .format('YYYY-MM-DD')
    .split('-');
  const date = moment(Date)
    .format('YYYY-MM-DD')
    .split('-');
  const Sup = moment(StringToNumber(date));
  const Inf = moment(StringToNumber(curretDate));
  return Sup.diff(Inf, 'days');
}
