"use client"

import React, { useState } from 'react';
import InputPanel from './input-panel';
import ResultPanel from '../components/result-panel';
import { SolveRequest } from '@/lib/types';

const Panel = () => {
  const [showTextPanel, setShowTextPanel] = useState<boolean>(true);
  const [sharedData, setSharedData] = useState<null | SolveRequest>(null);

  const toggleComponent = () => {
    setShowTextPanel(!showTextPanel);
  };
  return (
    <div className="grow flex flex-col items-center justify-center max-w-3xl w-full m-auto overflow-hidden">
      {showTextPanel ? (
        <InputPanel toggleComponent={toggleComponent} setSharedData={setSharedData} />
      ) : (
          <ResultPanel toggleComponent={toggleComponent} sharedData={sharedData} />
        )}
    </div>
  );
};

export default Panel;