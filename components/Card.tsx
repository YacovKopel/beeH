'use client'
import firebase from 'firebase/app';
import { db } from '@/firebase';
import 'firebase/database';
import { TrashIcon } from '@heroicons/react/24/outline';
import { AudioRecorder } from 'react-audio-voice-recorder';
import { useEffect, useState } from 'react';
import { getDocs, collection, orderBy, query } from 'firebase/firestore';

type Props= {
    question: { id: string; description: string };
    onRemoveClick: () => void;
}
function Card ({question, onRemoveClick }:Props){
  const [isModalOpen, setIsModalOpen] = useState(false)

const postedQuestions = collection(db, 'postedQuestions');

const getQuestions = () => {
    getDocs(postedQuestions)
        .then((data) => {
            console.log(data.docs.map((item) => {
                return { ...item.data(), id: item.id }
            }));
        })
}
useEffect(() => {
    getQuestions();
}, [])


  const handleAnswerClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleRemoveClick = () => {
    onRemoveClick();
  };

  return (
    <div className="flex justify-between items-center rounded-md p-4 mb-4 bg-gray-200 shadow-md">
      <div className='flex flex-col h-full text-clip overflow-hidden'>
        <h2 className="text-xl font-semibold mb-2">Question</h2>
            <p className="mb-10 truncate">{question.description}</p>
      
      <div className="flex items-center justify-between">
      <TrashIcon
          className="h-6 w-6 text-gray-600 cursor-pointer hover:text-red-500"
          onClick={handleRemoveClick}
        />
        <button className="bg-blue-500 rounded hover:bg-blue-600 text-white font-semibold py-2 px-4 mr-4" onClick={handleAnswerClick}>
          Answer
        </button>
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
              <AudioRecorder/>
              <button className="bg-blue-500 rounded hover:bg-blue-600 text-white font-semibold py-2 px-4" onClick={handleModalClose}>
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
