import Card from "@/components/Card";
import Header from "@/components/Header";
import SideBar from "@/components/SideBar";
import { db } from "@/firebase";
import { useEffect, useState } from "react";
import "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";

export default function Home() {
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    const fetchQuestions = async () => {
      const querySnapshot = await getDocs(collection(db, "postedQuestions"));
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      setQuestions(data);
    };
    fetchQuestions();
  }, []);


  return (
    <div className="flex flex-row">
      <div className="w-1/6 bg-gray-200 p-4">
        {/* HEADER */}
        {/* Sidebar */}
        {/* toggle */}
        {/* cards */}
        <SideBar />
      </div>
      <div className="flex-1 bg-white p-4">
        <Header />
        <div className="grid grid-cols-3 gap-4">
        {questions.map((question) => (
    <Card
      key={question.id}
      question={{ id: question.id, description: question.description }}
      onRemoveClick={() => {}}
    />
  ))}
        </div>
      </div>
    </div>
  );
}
