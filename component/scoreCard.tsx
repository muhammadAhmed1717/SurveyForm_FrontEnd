'use client'
import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react';

export default function ScoreCard({ onScoreChange, showMessage }) {
  const array = ['Comfort', 'Looks', 'Price'];
  const dotArray = [1, 2, 3, 4, 5];
  const [selectedScores, setSelectedScores] = useState([-1,-1,-1]);
  const [isHidden, setIsHidden] = useState(true);

  const handleScoreSelect = (itemIndex, dotIndex) => {
    const updatedScores = [...selectedScores];
    updatedScores[itemIndex] = dotIndex+1;
    setSelectedScores(updatedScores);
    onScoreChange(updatedScores);
  };

  return (
    <>
      {array.map((items, itemIndex) => (
        <div key={itemIndex}>
            <div
                className="bg-white rounded-full flex justify-between p-5 m-7 mx-auto w-[80%] sm:w-1/2 overflow-hidden"
                >
                <div className="w-[30%] text-xl">{items}</div>
                <div className="w-[60%] flex">
                    {dotArray.map((dot, dotIndex) => (
                    <button
                        key={dotIndex}
                        onClick={() => handleScoreSelect(itemIndex, dotIndex)}
                        className={`${
                        dotIndex < selectedScores[itemIndex] ? 'bg-green-700' : 'bg-black'
                        } rounded-full w-5 h-5 m-1`}
                    ></button>
                    ))}
                </div>
            </div>
            {showMessage[itemIndex] && <div className="text-red-700"><p>Please select a score</p></div>}
        </div>
      ))}
    </>
  );
}
