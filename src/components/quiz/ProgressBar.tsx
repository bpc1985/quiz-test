import { FC } from "react";

interface ProgressBarProp {
  currentIndex: number;
  totalQuestions: number;
}

const ProgressBar: FC<ProgressBarProp> = ({ currentIndex, totalQuestions }) => {
  const progress =
    (Math.min(currentIndex + 2, totalQuestions) / totalQuestions) * 100;

  return (
    <div className="flex my-12">
      <div className="mt-1 bg-gray-200 h-2 rounded-full overflow-hidden w-5/6">
        <div
          role="progressbar"
          className="h-full bg-gradient-to-r from-primary-purple to-primary-red transition-all duration-300 ease-in-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <div className="text-primary-red font-medium text-right text-sm w-1/6 ">
        {totalQuestions - currentIndex - 2}/{totalQuestions} questions remaining
      </div>
    </div>
  );
};

export default ProgressBar;
