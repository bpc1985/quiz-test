import { FC } from "react";
import PuzzleIcon from "@/assets/puzzle-piece-02.svg?react";

interface TitleProp {
  name: string;
}

const Title: FC<TitleProp> = ({ name }) => {
  return (
    <div className="flex items-center gap-4">
      <span className="flex items-center justify-center h-16 w-16 rounded-full bg-icon-bg border-icon-border">
        <PuzzleIcon color="#6c737f" width={36} />
      </span>
      <h2 className="text-black text-2xl font-bold mt-2 mb-4">{name}</h2>
    </div>
  );
};

export default Title;
