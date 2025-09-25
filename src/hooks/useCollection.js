// React
import { useEffect, useState } from "react";

// Firebase
import { onSnapshot, collection } from "firebase/firestore";
import { db } from "../firebase/config";

export const useCollection = (dataInfo) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, dataInfo), (response) => {
      const data = [];
      response.forEach((doc) => data.push({ id: doc.id, ...doc.data() }));
      setData(data);
    });
    return () => unsubscribe();
  }, []);
  return { data };
};
