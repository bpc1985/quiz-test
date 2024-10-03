import { FC } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import TalentAdoreLogo from "@/assets/TalentAdoreLogo.svg?react";
import UserIcon from "@/assets/user-01.svg?react";

const Header: FC = () => {
  return (
    <header className="p-2 w-full bg-white drop-shadow-1">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold">
            <TalentAdoreLogo
              data-testid="talent-adore-svg-logo"
              color="#6c737f"
              width={120}
            />
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-icon-bg border-icon-border">
            <UserIcon
              data-testid="user-svg-icon"
              color="#6c737f"
              width={28}
              height={28}
            />
          </span>
          <span className="text-black text-right">Quiz Taker</span>
          <ChevronDown />
        </div>
      </div>
    </header>
  );
};

export default Header;
