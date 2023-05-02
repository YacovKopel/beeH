"use client";

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "@/firebase";
import "firebase/database";
import { TrashIcon } from "@heroicons/react/24/outline";
import { AudioRecorder } from "react-audio-voice-recorder";
import { useState } from "react";
import { collection, deleteDoc, doc, addDoc } from "firebase/firestore";

type Props = {
  question: { id: string; description: string; answer_url: string };
  collectionClicked: string;
  onRemoveClick: (id: string) => void;
};
function Card({ question, onRemoveClick, collectionClicked }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const postedQuestions = collection(db, "postedQuestions");
  const questions = collection(db, "questions");

  const handleRemoveClick = () => {
    deleteDoc(
      doc(
        collectionClicked === "postedQuestions" ? postedQuestions : questions,
        question.id
      )
    )
      .then(() => {
        onRemoveClick(question.id);
        window.location.reload();
        console.log("deleted");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };

  const handleAnswerClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = async (audioBlob: Blob) => {
    try {
      // Save the recording to Firebase Storage
      const recordingRef = ref(storage, `${question.id}.webm`);
      const recordingSnapshot = await uploadBytes(recordingRef, audioBlob);
      const answerUrl = await getDownloadURL(recordingSnapshot.ref);
      console.log(answerUrl);

      // Add the question to the 'questions' collection
      const questionData = { ...question, answer_url: answerUrl };
      const newQuestionRef = await addDoc(questions, questionData);
      console.log("Added new question: ", newQuestionRef.id);

      // Remove the question from the 'postedQuestions' collection
      await deleteDoc(doc(postedQuestions, question.id));

      setIsModalOpen(false);
      // window.location.reload();
      console.log("deleted");
    } catch (error) {
      console.error("Error saving answer: ", error);
    }
  };

  const handlePlayClick = () => {
    const audio = new Audio(question.answer_url);
    audio.addEventListener("loadedmetadata", () => {
      audio.play().catch((error) => {
        console.error("Error playing audio: ", error);
      });
    });
    audio.addEventListener("error", (error) => {
      console.error("Error loading audio: ", error);
    });
  };

  return (
    <div className="flex justify-between items-center rounded-md p-4 mb-4 bg-gray-200 shadow-md">
      <div className="flex flex-col h-full text-clip overflow-hidden justify-evenly">
        <h2 className="text-xl font-semibold mb-2">Question</h2>
        <p className="mb-10 line-clamp-4">{question.description}</p>

        <div className="flex items-center justify-between">
          <TrashIcon
            className="h-6 w-6 text-gray-600 cursor-pointer hover:text-red-500"
            onClick={handleRemoveClick}
          />
          {collectionClicked === "postedQuestions" ? (
            <button
              className="bg-blue-500 rounded hover:bg-blue-600 text-white font-semibold py-2 px-4 mr-4"
              onClick={handleAnswerClick}
            >
              Answer
            </button>
          ) : (
            <button
              className="bg-blue-500 rounded hover:bg-blue-600 text-white font-semibold py-2 px-4 mr-4"
              onClick={handlePlayClick}
            >
              Play
            </button>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-center">
          <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
          <div className="bg-white rounded-md p-4 z-10 max-w-md">
            <h3 className="text-lg font-semibold mb-2">Question</h3>
            <p className="mb-10">{question.description}</p>

            <div className="flex justify-between">
              <TrashIcon
                className="h-6 w-6 text-gray-600 cursor-pointer hover:text-red-500"
                onClick={handleRemoveClick}
              />
              <AudioRecorder />
              <button
                className="bg-blue-500 rounded hover:bg-blue-600 text-white font-semibold py-2 px-4"
                onClick={handleModalClose}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Card;
