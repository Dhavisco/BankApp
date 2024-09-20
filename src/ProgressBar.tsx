import React from 'react';

interface ProgressBarProps {
  step: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ step }) => {
  return (
    <div className="flex justify-between mb-6">
      <span className={`font-bold ${step === 1 ? 'text-blue-500' : 'text-gray-500'}`}>1</span>
      <span className={`font-bold ${step === 2 ? 'text-blue-500' : 'text-gray-500'}`}>2</span>
      <span className={`font-bold ${step === 3 ? 'text-blue-500' : 'text-gray-500'}`}>3</span>
    </div>
  );
};

export default ProgressBar;
