import {firebase} from "../../../services";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

class FirebaseAdapter {
    constructor(loader) {
        this.loader = loader;
    }
    // Starts the upload process.
    upload() {
        return this.loader.file.then(
            file =>
            new Promise((resolve, reject) => {
                let storage = getStorage();
                uploadBytes(
                    ref(storage, `News/${file.name}`),
                    file
                )
                    .then((snapshot) => {
                        return getDownloadURL(snapshot.ref);
                    })
                    .then((downloadURL) => {
                        resolve({
                            default: downloadURL,
                        });
                    }).catch((error) => {
                        reject(error.message);
                    })
            })
        );
    }
}
export default FirebaseAdapter;