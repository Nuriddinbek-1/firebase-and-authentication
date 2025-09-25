// React
import { useState } from "react";

// Firebase
import { collection, addDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "./firebase/config";

// Custom hook
import { useCollection } from "./hooks/useCollection";

function App() {
  const [title, setTitle] = useState(null);
  const [price, setPrice] = useState(null);

  const { data: transactions } = useCollection("transactions");

  const addNewDoc = (e) => {
    e.preventDefault();
    addDoc(collection(db, "transactions"), {
      title: title,
      price: Number(price),
    })
      .then((res) => console.log(res))
      .catch(() => alert("Oops, something went wrong!!!"));
    setTitle(null);
    setPrice(null);
    e.target.reset();
  };

  const deleteDocument = async (id) => {
    await deleteDoc(doc(db, "transactions", id));
  };

  return (
    <div>
      <h1>Firebase</h1>
      <form onSubmit={addNewDoc}>
        <label>
          <span>Title</span>
          <input
            type="text"
            name=""
            id=""
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <label>
          <span>Price</span>
          <input
            type="number"
            name=""
            id=""
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </label>
        <button>Add</button>
      </form>
      <ul>
        {transactions &&
          transactions.map((item) => {
            return (
              <li
                key={item.id}
                style={{ display: "flex", gap: "20px", alignItems: "center" }}>
                <h3>{item.title} :</h3>
                <h3>${item.price}</h3>
                <button onClick={() => deleteDocument(item.id)}>delete</button>
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default App;
