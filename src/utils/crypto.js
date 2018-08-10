import JSEncrypt from "jsencrypt";
import BlindSignature from "blind-signatures";


let DEFAULT_KEY_SIZE=2048;

export function createRSAKeys() {

    var jsencrypt = new JSEncrypt({"default_key_size": DEFAULT_KEY_SIZE})
    var keys = {
        public: jsencrypt.getPublicKey(),
        private: jsencrypt.getPrivateKey()
    };
    return keys;

}

export function blindPublicKey(publicKey) {

    var jsencrypt = new JSEncrypt();
    jsencrypt.setPublicKey(publicKey);

    var message = publicKey;
    var N = jsencrypt.key.n.toString();
    var E = jsencrypt.key.e.toString();

    var blindData = {
        message: message,
        N: N,
        E: E
    };
    console.log("blindData", blindData);
    return BlindSignature.blind(blindData);

}

export function unblindPublicKey(blindedKey, r, N) {

    var unblindedKey;

    var N = N;
    var r = r;

    var unblindData = {
        signed: blindedKey,
        N: N,
        r: r,
    };

    const unblinded = BlindSignature.unblind(unblindData);

    return unblinded;

}


