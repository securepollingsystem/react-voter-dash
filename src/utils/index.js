import moment from "moment";
import axios from "axios";
import bluebird from "bluebird";
import faker from "faker";


function makeid() {

    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

export function fetchTimeSlots() {

    var daysInMonth = moment().daysInMonth();
    var numDates = Math.floor(Math.random() * (daysInMonth - 1)) + 1;
    var dates = Array(numDates).fill(null).map(function(e, i) {
            return Math.floor(Math.random() * daysInMonth - 1);
        })
    console.log("dates", dates);

    dates = dates.filter(function(dateNum, pos) {
            return dates.indexOf(dateNum) === pos;
        })

    dates = dates.map(function(dateNum) {
        let date = moment().startOf("month").add(dateNum, "days");
        date.hour(12);
        return date;
    })
    console.log("dates", dates);

    dates = dates.map(function(date) {return date.toDate();})
    //dates = dates.map(function(date) {return date.toLocaleString();})
    console.log("dates", dates);

    var timeSlots = dates.map(date => {
        return {
            id: makeid(),
            time: date
        };
    })

    return timeSlots;

}


export function bookAppointment(args) {

    var timeSlot = args.timeSlot;
    var personalId = args.personalId;
    var blindedKey = args.blindedKey;

    return bluebird.resolve({
            id: makeid(),
            timeSlotId: timeSlot.id,
            datetime: timeSlot.datetime,
            personalId: personalId,
            blindedKey: blindedKey
        }).delay(1000);

}

export function createFakeTimeSlot() {

    var datetime = faker.date.between(moment(), moment().add(1, "month"));
    datetime = moment(datetime);
    datetime.hour(Math.floor((Math.random() * 8) + 9));
    datetime.minute(Math.floor((Math.random() * 4)) * 15)
    datetime.seconds(0);

    return {
        id: makeid(),
        datetime
    };
}

export function createFakeTimeSlots(n) {

    var timeSlots = Array(n).fill(null).map(n => {
        return createFakeTimeSlot();
    })
    return timeSlots
}

class SPSApi {
    constructor(url = "", options = {}) {
        this.url = url;
        this.mock = options.mock;
    }
    getTimeSlots(query) {
        if (this.mock) {
            // between 5 and 45
            var nTimeSlots = Math.floor((Math.random() * 40) + 5);
            return bluebird.resolve(createFakeTimeSlots(nTimeSlots)).delay(2000);
        }
        return axios.get(this.url + "/time-slots");
    }
    book(data) {
        return axios.post(this.url + "/bookings")
    }
    checkVerified(query) {
    
    }
}

export const spsApi = new SPSApi("", {mock: true});

spsApi.getTimeSlots().then(function(data) {
    console.log("data", data);
})
