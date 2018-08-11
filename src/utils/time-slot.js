import moment from "moment";

export function filterTimeSlotsByDate(date, timeSlots) {
    console.log("getAvailableTimeSlots()", date);

    if (!date || !timeSlots) {
        return [];
    }

    var ret = timeSlots.filter(timeSlot => {
        return moment(timeSlot.datetime).isSame(moment(date), "day");
    })


    return ret;

}

