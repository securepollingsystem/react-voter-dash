import JSEncrypt from "jsencrypt";
import BlindSignature from "blind-signatures";
import moment from "moment";

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

export function test() {

}
