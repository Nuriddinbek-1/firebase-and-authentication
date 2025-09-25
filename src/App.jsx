// React
import { useState } from "react";

// Firebase
import { db } from "./firebase/config";
import { collection, addDoc } from "firebase/firestore";

// Custom hook
import { useCollection } from "./hooks/useCollection";

// Components
import Transaction from "./components/Transaction";

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
          transactions.map((transaction) => {
            return (
              <Transaction key={transactions.id} transaction={transaction} />
            );
          })}
      </ul>
    </div>
  );
}

export default App;
