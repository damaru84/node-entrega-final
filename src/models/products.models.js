import { collection, doc, getDocs, getDoc, addDoc, setDoc, updateDoc, deleteDoc, query, where } from "firebase/firestore";
import { db } from "../data/firebase.data.js";
//import {app} from "../data/firebase.data.js"
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
 * Crea un documento nuevo en la colección.
 * Firestore genera el id automáticamente.
 * @param {string} collectionName Nombre de la colección en Firestore.
 * @param {Object} data Objeto con los campos del documento.
 * @returns {Promise<string>} Id del documento creado.
 */
export async function createDocument(collectionName, data) {
  console.log("Data a guardar:");
  console.dir(data, { depth: null });
  const colRef = collection(db, collectionName);
  console.log("colección: ", colRef)
  const docRef = await addDoc(colRef, data);
  //const colRef = collection(db, collectionName);
  /*console.log("Coleccion obtenida")
  console.log(typeof data)
  const docRef = await addDoc(colRef, {
    nombre: data.nombre,
    categoria: data.categoria,
    precio: data.precio
  });
  console.log("Producto creado")*/
  return docRef.id;
}

/**
 * Crea o reemplaza un documento con un id específico.
 * Use setDoc cuando desee controlar el id del documento.
 * @param {string} collectionName Nombre de la colección en Firestore.
 * @param {string} id Identificador para el documento.
 * @param {Object} data Objeto con los campos del documento.
 * @returns {Promise<void>}
 */
export async function setDocument(collectionName, id, data) {
  const docRef = doc(db, collectionName, id);
  await setDoc(docRef, data);
}

/**
 * Actualiza campos de un documento existente.
 * @param {string} collectionName Nombre de la colección en Firestore.
 * @param {string} id Identificador del documento.
 * @param {Object} data Campos a actualizar.
 * @returns {Promise<void>}
 */
export async function updateDocument(collectionName, id, data) {
  const docRef = doc(db, collectionName, id);
  return await updateDoc(docRef, data);
}

/**
 * Elimina un documento por id.
 * @param {string} collectionName Nombre de la colección en Firestore.
 * @param {string} id Identificador del documento.
 * @returns {Promise<void>}
 */
export async function deleteDocument(collectionName, id) {
  console.log("Capa de modelos")
  const docRef = doc(db, collectionName, id);
  return await deleteDoc(docRef);
}

/**
 * Ejemplo de consulta simple con filtros.
 * Busca documentos donde el campo status sea "activo".
 * @param {string} collectionName Nombre de la colección en Firestore.
 * @returns {Promise<Array<Object>>}
 */
export async function queryDocumentsByStatus(collectionName) {
  const colRef = collection(db, collectionName);
  const q = query(colRef, where("status", "==", "activo"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }));
}




/*
EJEMPLOS DE COMO SE UTILIZA CADA UNO, LLAMANDOLOS DE LA CAPA DE SERVICIOS

import {
  readDocuments,
  readDocument,
  createDocument,
  setDocument,
  updateDocument,
  deleteDocument,
  queryDocumentsByStatus,
} from "../data/firestore.models.js";

// --- readDocuments ---
// Trae todos los productos de la colección "productos"
const todosLosProductos = await readDocuments("productos");
console.log(todosLosProductos);
// [{ id: "abc123", nombre: "Notebook", precio: 500000 }, { id: "xyz789", ... }]

// --- readDocument ---
// Trae un producto puntual por su id
const producto = await readDocument("productos", "abc123");
console.log(producto);
// { id: "abc123", nombre: "Notebook", precio: 500000 } o null si no existe

// --- createDocument ---
// Crea un producto nuevo, Firestore le pone el id automáticamente
const nuevoId = await createDocument("productos", {
  nombre: "Mouse inalámbrico",
  categoria: "accesorios",
  precio: 8000,
});
console.log(nuevoId); // "k3j9d0sLp2..." (id autogenerado)

// --- setDocument ---
// Crea (o sobrescribe) un producto con un id elegido por vos
// Útil por ejemplo si el id es el código de barras o SKU del producto
await setDocument("productos", "SKU-001", {
  nombre: "Teclado mecánico",
  categoria: "accesorios",
  precio: 25000,
});
// No devuelve nada, pero ya podés hacer readDocument("productos", "SKU-001")

// --- updateDocument ---
// Actualiza solo los campos que le pases (no pisa todo el documento)
await updateDocument("productos", "abc123", {
  precio: 480000, // le bajás el precio, el resto de los campos queda igual
});

// --- deleteDocument ---
// Borra el producto por id
await deleteDocument("productos", "SKU-001");

// --- queryDocumentsByStatus ---
// Trae solo los productos con status "activo"
const productosActivos = await queryDocumentsByStatus("productos");
console.log(productosActivos);
// [{ id: "abc123", nombre: "Notebook", status: "activo", ... }]
*/