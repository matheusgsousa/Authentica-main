import { db } from "../services/FirebaseConfig";

import {
    collection,
    getDocs,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
} from "firebase/firestore";

const senhaCollectionRef = collection(db, "senhas");
class SenhaDataService {
    addSenhas = (newSenha) => {
        return addDoc(senhaCollectionRef, newSenha);
    };

    updateSenha = (id, updatedSenha) => {
        const senhaDoc = doc(db, "senhas", id);
        return updateDoc(senhaDoc, updatedSenha);
    };

    deleteSenha = (id) => {
        const senhaDoc = doc(db, "senhas", id);
        return deleteDoc(senhaDoc);
    };

    getAllSenhas = () => {
        return getDocs(senhaCollectionRef);
    };

    getSenha = (id) => {
        const senhaDoc = doc(db, "senhas", id);
        return getDoc(senhaDoc);
    };
}

export default new SenhaDataService();