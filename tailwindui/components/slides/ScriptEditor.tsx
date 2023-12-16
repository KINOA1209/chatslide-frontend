import React, { useState } from 'react';


interface TranscriptEditorProps {
  transcriptList: string[];
  setTranscriptList: (transcriptList: string[]) => void;
  currentSlideIndex: number;
}

const ScriptEditor: React.FC<TranscriptEditorProps> = ({ transcriptList, setTranscriptList, currentSlideIndex }) => {

  const updateTranscriptList = (newValue: string, index: number) => {
    console.log(newValue)
    let newTranscriptList = [...transcriptList];
    newTranscriptList[index] = newValue;
    setTranscriptList(newTranscriptList);
  };

  return (
    <div
      className={`w-screen max-w-[960px] h-[200px] bg-zinc-100 rounded shadow flex flex-col overflow-y-auto my-4 ml-2`}
    >
      <div className='px-4 py-2 h-8 bg-zinc-100 flex flex-row justify-between items-center sticky top-0 border-b-2 border-gray-300'>
        <div className='text-neutral-900 text-s font-creato-medium'>
          Script
        </div>
        <div
          className='cursor-pointer'
        >
        </div>
      </div>
      <textarea
        className='grow px-4 py-2 w-full h-full border-none text-gray-700 bg-zinc-100 text-xs font-normal font-creato-medium leading-[1.125rem] tracking-[0.015rem]'
        value={transcriptList[currentSlideIndex]}
        onChange={(e) => updateTranscriptList(e.target.value, currentSlideIndex)}
      >
        {transcriptList[currentSlideIndex]}
      </textarea>
    </div>
  );
};

export default ScriptEditor;
