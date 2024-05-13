"use client"

import React, { useState, useEffect, useRef } from 'react';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { solve } from '@/lib/api'
import { SolveRequest, SolveResult } from '@/lib/types'
import { useOnMountUnsafe } from '@/lib/utilities'
import Loading from '../components/ui/loading';
import ResultText from '../components/result-text';


const ResultPanel = ({ toggleComponent, sharedData }: { toggleComponent: () => void, sharedData: null | SolveRequest }) => {

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [returnedResult, setReturnedResult] = useState<null | SolveResult>(null);
  const messagesEndRef = useRef<null | HTMLDivElement>(null)

  useOnMountUnsafe(() => {
    if (sharedData) {
      setIsLoading(true);
      solve(sharedData)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(response);
        })
        .then((json: SolveResult) => {
          setReturnedResult(json);
        })
        .catch((response) => {
          console.log(response.status, response.statusText);
        })
        .finally(() => setIsLoading(false))
    }
  });


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(() => {
    scrollToBottom();
  }, [returnedResult]);

  return (
    <>
      <div className="w-full grow rounded-lg border my-10 p-3 overflow-y-auto h-10 border-systemGray-2">
        <h2 className="text-4xl font-bold dark:text-white mb-3">Code Description</h2>
        <div className="whitespace-pre-wrap mb-3 bg-systemGray-6 p-2">
          {sharedData?.description}
        </div>
        <h2 className="mb-3 text-4xl font-bold dark:text-white">Result{isLoading || !returnedResult ? '' : returnedResult!.success_found ? ': Solved' : ': Couldn\'t Find'}</h2>
        {isLoading || !returnedResult ? '' : returnedResult!.success_found ? '' : <h3 className="text-2xl font-bold dark:text-white">Here are some trials...</h3>}

        {isLoading ? <Loading /> : !returnedResult ? 'Unexpected error occured.' : <ResultText returnedResult={returnedResult} />}
        <div ref={messagesEndRef} />
      </div>
      <button type="button" onClick={toggleComponent} className="inline-flex items-baseline text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-10 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        <span>Retry</span>
        <ArrowPathIcon className="self-center h-5 w-5 ml-1" />
      </button>

    </>

  );
};

export default ResultPanel;
