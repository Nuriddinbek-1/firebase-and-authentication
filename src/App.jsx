// React
import { useEffect, useState } from "react";

// Firebase
import { db } from "./firebase/config";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";

// Custom hook
import { useCollection } from "./hooks/useCollection";

// Components
import Transaction from "./components/Transaction";

function App() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");

  const [editID, setEditID] = useState(null);

  const { data: transactions } = useCollection("transactions");

  // Add new doc
  const addNewDoc = (e) => {
    e.preventDefault();
    addDoc(collection(db, "transactions"), {
      title: title,
      price: Number(price),
    })
      .then((res) => console.log(res))
      .catch(() => alert("Oops, something went wrong!!!"));
    setTitle("");
    setPrice("");
    e.target.reset();
  };

  // Edit doc
  const handleEdit = (transaction) => {
    setEditID(transaction.id);
    setTitle(transaction.title);
    setPrice(transaction.price);
  };

  // Cancel editing
  useEffect(() => {
    if (!editID) {
      setTitle("");
      setPrice("");
    }
  }, [editID]);

  return (
    <div>
      <h1>Firebase</h1>
      <form onSubmit={addNewDoc}>
        <label>
          <span>Title</span>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <label>
          <span>Price</span>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </label>
        {editID ? <button>Save Changes</button> : <button>Add</button>}
      </form>
      <ul>
        {transactions &&
          transactions.map((transaction) => {
            return (
              <Transaction
                key={transaction.id}
                transaction={transaction}
                editID={editID}
                handleEdit={handleEdit}
                cancelEditing={() => setEditID(null)}
              />
            );
          })}
      </ul>
    </div>
  );
}

export default App;
