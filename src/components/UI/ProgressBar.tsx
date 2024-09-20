import React from 'react';

interface ProgressBarProps {
  step: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ step }) => {
  const getStepClass = (currentStep: number) => {
    if (currentStep <= step) {
      return 'bg-blue-500 text-white';
    }
    return 'bg-gray-300 text-gray-500';
  };

  return (
    <div className="flex items-center justify-between mb-4">
      {/* Step 1 */}
      <div className="flex items-center">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getStepClass(1)}`}>
          1
        </div>
        <span className="ml-2 text-xs font-medium">Personal Info</span>
      </div>

      {/* Progress Line 1 */}
      <div className={`flex-1 h-1 mx-4 ${step >= 2 ? 'bg-blue-500' : 'bg-gray-300'}`} />

      {/* Step 2 */}
      <div className="flex items-center">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getStepClass(2)}`}>
          2
        </div>
        <span className="ml-2 text-xs font-medium">Account Info</span>
      </div>

      {/* Progress Line 2 */}
      <div className={`flex-1 h-1 mx-4 ${step >= 3 ? 'bg-blue-500' : 'bg-gray-300'}`} />

      {/* Step 3 */}
      <div className="flex items-center">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getStepClass(3)}`}>
          3
        </div>
        <span className="ml-2 text-xs font-medium">Contact Info</span>
      </div>
    </div>
  );
};

export default ProgressBar;