"use client"

import React, { useState, FormEvent } from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { SolveRequest } from '@/lib/types';



const InputPanel = ({ toggleComponent, setSharedData }: { toggleComponent: () => void, setSharedData: React.Dispatch<React.SetStateAction<SolveRequest | null>> }) => {
  const [inputText, setInputText] = useState('');


  const handleMessageSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputText.trim() !== '') {
      setSharedData({ description: inputText });
      toggleComponent();
    }
  };

  return (
    <>
      <form onSubmit={handleMessageSubmit} className="flex w-full py-2 px-2 bg-systemGray-5 border-solid border border-systemGray-2 rounded-lg">
        <textarea
          rows={5}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type a coding problem description..."
          className="w-full py-2 px-4 rounded-lg focus:outline-none bg-systemGray-6"
        />
        <button
          type="submit"
          className="inline-flex items-baseline bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 font-medium text-white py-3 px-3 rounded-lg ml-2 h-10 self-end"
        >
          <PaperAirplaneIcon className="h-4 w-4" />
        </button>
      </form>
    </>
  );
};

export default InputPanel;
