// Firebase
import { db } from "../firebase/config";
import { doc, deleteDoc } from "firebase/firestore";

function Transaction({ transaction, editID, handleEdit, cancelEditing }) {
  const isEditing = transaction.id == editID;

  const deleteDocument = async (id) => {
    await deleteDoc(doc(db, "transactions", id));
  };

  return (
    <li style={{ display: "flex", gap: "20px", alignItems: "center" }}>
      <h3>{transaction.title} :</h3>
      <h3>${transaction.price}</h3>
      {isEditing ? (
        <button onClick={cancelEditing}>Cancel</button>
      ) : (
        <button onClick={() => handleEdit(transaction)}>Edit</button>
      )}
      <button onClick={() => deleteDocument(transaction.id)}>Delete</button>
    </li>
  );
}

export default Transaction;
