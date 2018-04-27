// import {csv} from 'd3';
//
// export const parse = d => {
// 	return {
// 		iyear: d.year,
// 		imonth: d.month,
// 		iday: d.day,
//     latitude:+d.latitude,
//     longitude:+d.longitude,
// 	};
// }
//
//
// export const fetchCsv = (url, parse) => {
// 	return new Promise((resolve, reject) => {
// 		csv(url, parse, (err, data) => {
// 			if(err){
// 				reject(err);
// 			}else{
// 				resolve(data);
// 			}
// 		})
// 	});
// }

export default function(d){

	return {
    year: d.iyear,
    month: d.imonth,
    day: d.iday,
    latitude:+d.latitude,
    longitude:+d.longitude,
    state:d.provstate,
		event_id:d.eventid,
	}
}
