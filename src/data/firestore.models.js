import { collection, doc, getDocs, getDoc, addDoc, setDoc, updateDoc, deleteDoc, query, where } from "firebase/firestore";
import { db } from "./firebase.data.js";

/**
 * Lee todos los documentos de una colección.
 * @param {string} collectionName Nombre de la colección en Firestore.
 * @returns {Promise<Array<Object>>} Lista de documentos con id y datos.
 */
export async function readDocuments(collectionName) {
  const colRef = collection(db, collectionName);
  const snapshot = await getDocs(colRef);
  return snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }));
}

/**
 * Lee un solo documento por id.
 * @param {string} collectionName Nombre de la colección en Firestore.
 * @param {string} id Identificador del documento.
 * @returns {Promise<Object|null>} Documento con id y datos, o null si no existe.
 */
export async function readDocument(collectionName, id) {
  const docRef = doc(db, collectionName, id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return null;
  }

  return { id: docSnap.id, ...docSnap.data() };
}

/**
 * Crea (o sobrescribe) un documento con un id específico.
 * @param {string} collectionName Nombre de la colección en Firestore.
 * @param {string} id Identificador que querés asignarle al documento.
 * @param {Object} data Datos del documento a crear.
 * @returns {Promise<Object>} Documento creado con id y datos.
 */
export async function createDocumentWithId(collectionName, id, data) {
  const docRef = doc(db, collectionName, id);
  await setDoc(docRef, data);
  return { id, ...data };
}

/**
 * Busca documentos que cumplan una condición.
 * @param {string} collectionName Nombre de la colección en Firestore.
 * @param {string} campo Campo por el cual filtrar.
 * @param {string} operador Operador de comparación ("==", ">", "<", etc.).
 * @param {*} valor Valor a comparar.
 * @returns {Promise<Array<Object>>} Documentos que cumplen la condición.
 */
export async function buscarDocumentos(collectionName, campo, operador, valor) {
  const colRef = collection(db, collectionName);
  const q = query(colRef, where(campo, operador, valor));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }));
}








//1
/**
 * Crea un nuevo documento en la colección.
 * @param {string} collectionName Nombre de la colección en Firestore.
 * @param {Object} data Datos del documento a crear.
 * @returns {Promise<Object>} Documento creado con id y datos.
 */
export async function createDocument(collectionName, data) {
  const colRef = collection(db, collectionName);
  const docRef = await addDoc(colRef, data);
  return { id: docRef.id, ...data };
}

/**
 * Actualiza un documento existente por id.
 * @param {string} collectionName Nombre de la colección en Firestore.
 * @param {string} id Identificador del documento.
 * @param {Object} data Datos a actualizar.
 * @returns {Promise<Object>} Documento actualizado con id y datos.
 */
export async function updateDocument(collectionName, id, data) {
  const docRef = doc(db, collectionName, id);
  await updateDoc(docRef, data);
  return { id, ...data };
}

/**
 * Elimina un documento por id.
 * @param {string} collectionName Nombre de la colección en Firestore.
 * @param {string} id Identificador del documento.
 * @returns {Promise<{id: string}>} Id del documento eliminado.
 */
export async function deleteDocument(collectionName, id) {
  const docRef = doc(db, collectionName, id);
  await deleteDoc(docRef);
  return { id };
}