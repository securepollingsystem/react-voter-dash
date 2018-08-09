import JSEncrypt from "jsencrypt";
import BlindSignature from "blind-signatures";
import moment from "moment";
import axios from "axios";
import bluebird from "bluebird";
import faker from "faker";

let DEFAULT_KEY_SIZE=2048;
let LOCAL_STORAGE_KEY="SPSRsaKeys";

export function createRSAKeys() {

    var jsencrypt = new JSEncrypt({"default_key_size": DEFAULT_KEY_SIZE})
    var keys = {
        public: jsencrypt.getPublicKey(),
        private: jsencrypt.getPrivateKey()
    };
    return keys;

}

export function getOrCreateRSAKeys() {

    var keys;
    keys = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (keys) {
        console.log("FOUND KEYS IN LOCAL STORAGE");
    }
    if (!keys) {
        console.log("NO KEYS FOUND; CREATING SOME");
        keys = createRSAKeys();
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(keys));
    }
    return keys;

}


export function blindPublicKey(publicKey) {

    this.key = publicKey;
    var jsencrypt = new JSEncrypt();
    jsencrypt.setPublicKey(publicKey);
    this.jsencrypt = jsencrypt;

    var message = this.key;
    var N = this.jsencrypt.key.n.toString();
    var E = this.jsencrypt.key.e.toString();

    var blindData = {
        message: message,
        N: N,
        E: E
    };
    console.log("blindData", blindData);
    return BlindSignature.blind(blindData);

}

export function unblindPublicKey(blindedKey, r) {

    var unblindedKey;

    return unblindedKey
}

export class PublicKeyBlinder {

    PublicKeyBlinder() {

    }

    blind(publicKey) {

        this.key = publicKey;
        var jsencrypt = new JSEncrypt();
        jsencrypt.setPublicKey(publicKey);
        this.jsencrypt = jsencrypt;

        var message = this.key;
        var N = this.jsencrypt.key.n.toString();
        var E = this.jsencrypt.key.e.toString();

        var blindData = {
            message: message,
            N: N,
            E: E
        };
        console.log("blindData", blindData);
        const { blinded, r } = BlindSignature.blind(blindData);
        this.r = r;
    
        return blinded;

    }

    unblind(signedKey) {

        var N = this.jsencrypt.key.n.toString();
        var r = this.r;

        var unblindData = {
            signed: signedKey,
            N: N,
            r: r,
        };

        const unblinded = BlindSignature.unblind(unblindData);

        this.unblinded = unblinded;

        return unblinded;
    
    }

    verify(registrarPublicKey) {

        var unblinded = this.unblinded;
        var key = registrarPublicKey;
        var message = this.key;

        var verifyData = {
            unblinded: unblinded,
            key: key,
            message: message,
        };

        const result2 = BlindSignature.verify2(verifyData);

        return result2;

    }
}

//export function blindPublicKey(publicKey) {
//
//    var message = this.state.keys.public;
//    var N = this.state.jsencrypt.key.n.toString();
//    var E = this.state.jsencrypt.key.e.toString();
//    const { blinded, r } = BlindSignature.blind({
//        message: message,
//        N: N,
//        E: E
//    });
//
//}

function makeid() {

    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

export function fetchTimeSlots() {

    var today = moment();
    var firstDayOfMonth = today.startOf("month");
    var daysInMonth = moment().daysInMonth();
    var numDates = Math.floor(Math.random() * (daysInMonth - 1)) + 1;
    var dates = Array(numDates).fill(null).map(function(e, i) {
            return Math.floor(Math.random() * daysInMonth - 1);
        })
    console.log("dates", dates);

    dates = dates.filter(function(dateNum, pos) {
            return dates.indexOf(dateNum) == pos;
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

    return dates.map;

}


export function bookAppointment(args) {

    var timeSlotId = args.timeSlotId;
    var personalId = args.personalId;
    var blindedKey = args.blindedKey;

    return {
        id: makeid(),
        timeSlotId: timeSlotId,
        personalId: personalId,
        blindedKey: blindedKey
    }

}

function createFakeTimeSlot() {

    var date = faker.date.between(moment(), moment().add(1, "month"));
    date = moment(date);
    date.hour(Math.floor((Math.random() * 8) + 9));
    date.minute(Math.floor((Math.random() * 4)) * 15)
    date.seconds(0);

    return {
        id: makeid(),
        date
    };
}
function createFakeTimeSlots(n) {

    var nTimeSlots = Math.floor((Math.random() * 40) + 5);
    var timeSlots = Array(nTimeSlots).fill(null).map(n => {
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
            return bluebird.resolve(createFakeTimeSlots()).delay(2000);
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
