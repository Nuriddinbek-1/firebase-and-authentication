// Firebase
import { db } from "../firebase/config";
import { doc, deleteDoc } from "firebase/firestore";

function Transaction({ transaction }) {
  const deleteDocument = async (id) => {
    await deleteDoc(doc(db, "transactions", id));
  };
  return (
    <li style={{ display: "flex", gap: "20px", alignItems: "center" }}>
      <h3>{transaction.title} :</h3>
      <h3>${transaction.price}</h3>
      <button onClick={() => deleteDocument(transaction.id)}>delete</button>
    </li>
  );
}

export default Transaction;
