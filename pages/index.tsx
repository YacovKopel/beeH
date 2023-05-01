import Card from "@/components/Card";
import Header from "@/components/Header";
import SideBar from "@/components/SideBar";
import { db } from "@/firebase";
import { useEffect, useState } from "react";
import "firebase/firestore";
import {
  collection,
  query,
  orderBy,
  startAfter,
  limit,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import ToggleButton from "@/components/ToggleButton";

export default function Home() {
  const [questions, setQuestions] = useState([]);
  const [lastVisible, setLastVisible] = useState(null);
  const [collectionName, setCollectionName] = useState("postedQuestions");

  // query function from Firestore to create a query object that sorts the results by timestamp field in descending order and limits the results to 6.
  useEffect(() => {
    const fetchQuestions = async () => {
      const q = query(
        collection(db, collectionName),
        orderBy("timestamp", "desc"),
        limit(6)
      );
      const querySnapshot = await getDocs(q);
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      setQuestions(data);
      // fetches the first page of results using this query object, and stores the last visible document in the state variable lastVisible.
      setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
    };
    fetchQuestions();
  }, [collectionName]);
  // new query object that starts after the last visible document and fetches the next 6 results.
  const handleLoadMore = async () => {
    const q = query(
      collection(db, collectionName),
      orderBy("timestamp", "desc"),
      startAfter(lastVisible),
      limit(6)
    );
    const querySnapshot = await getDocs(q);
    const data = [];
    querySnapshot.forEach((doc) => {
      data.push(doc.data());
    });
    setQuestions([...questions, ...data]);
    setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
  };
  const handleToggle = (fbcollection: string) => {
    setCollectionName(fbcollection);
  };
  const handleRemoveClick = (id: string) => {
    deleteDoc(doc(collection(db, collectionName), id))
      .then(() => {
        window.location.reload();
        console.log("deleted");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };
  return (
    <div className="flex flex-row">
      <div className="w-1/6 bg-gray-200 p-4">
        <SideBar />
      </div>

      <div className="flex-1 bg-white p-4">
        <Header />
        <div className="mb-10">
          <ToggleButton onToggle={handleToggle} />
        </div>
        <div className="grid grid-cols-3 gap-4">
          {questions.map((question) => (
            <Card
              key={question.id}
              question={{
                id: question.id,
                description: question.description,
                answer_url: question.answer_url,
              }}
              onRemoveClick={() => handleRemoveClick(question.id)}
              collectionClicked={collectionName}
            />
          ))}
        </div>
        {lastVisible && (
          <div className="flex justify-center my-4">
            <button
              onClick={handleLoadMore}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

