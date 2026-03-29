import { useClerk, useUser } from "@clerk/clerk-react";
import {
  BarChart2,
  LayoutGrid,
  Library,
  LogOut,
  Notebook,
  PenTool,
  Play,
  Sun,
  Moon,
  Timer,
} from "lucide-react";
import { useState } from "react";
import { useTheme } from "../context/ThemeContext.jsx";

export enum ViewState {
  HOME = "HOME",
  PLAYER = "PLAYER",
  LIBRARY = "LIBRARY",
  NOTES = "NOTES",
  POMODORO = "POMODORO",
  WHITEBOARD = "WHITEBOARD",
  STATS = "STATS",
  
}

export interface NavItem {
  id: ViewState;
  label: string;
  icon: React.ReactNode;
}

const NAV_ITEMS: NavItem[] = [
  { id: ViewState.HOME, label: "Home", icon: <LayoutGrid size={16} /> },
  { id: ViewState.LIBRARY, label: "Saved", icon: <Library size={16} /> },
  { id: ViewState.NOTES, label: "Notes", icon: <Notebook size={16} /> },
  { id: ViewState.POMODORO, label: "Focus", icon: <Timer size={16} /> },
  { id: ViewState.WHITEBOARD, label: "Canvas", icon: <PenTool size={16} /> },
  // { id: ViewState.STATS, label: "Stats", icon: <BarChart2 size={16} /> },
];

const Navbar = ({ currentView, onChangeView }) => {
  const { theme, toggleTheme } = useTheme();
  const { signOut } = useClerk();
  const { user } = useUser();
  const [open, setOpen] = useState(false);

  return (
    <nav
      className="
        sticky top-0 z-50 flex items-center justify-between
        px-6 py-3 backdrop-blur-xl border-b transition-colors duration-300
        bg-white dark:bg-black border-zinc-200 dark:border-white/10
      "
    >
      {/* LOGO */}
      <div className="flex items-center group gap-2">
        <div className="bg-black dark:bg-white w-8 h-8 rounded-md flex items-center justify-center shadow-lg 
                        group-hover:rotate-12 transition-transform duration-300">
          <Play size={20} className="bg-black text-white dark:bg-white dark:text-black" />
        </div>
        <span className="text-black dark:text-white text-lg font-bold">StudyFlow</span>
      </div>

      {/* NAV ITEMS */}
      <div
        className="
          flex items-center bg-zinc-100 dark:bg-zinc-900/50 px-2 py-1 
          rounded-full border border-zinc-200 dark:border-white/5 gap-1
        "
      >
        {NAV_ITEMS.map((item) => {
          const isActive = currentView === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onChangeView(item.id)}
              className={`
                flex items-center gap-2 text-xs px-3 py-1 rounded-full transition-all
                ${isActive
                  ? "bg-black text-white dark:bg-white dark:text-black shadow-md"
                  : "text-black dark:text-white opacity-60 hover:opacity-100"
                }
              `}
            >
              {item.icon}
              {item.label}
            </button>
          );
        })}
      </div>

    
      <div className="flex items-center gap-3">

       
        <button
          onClick={toggleTheme}
          className="text-black dark:text-zinc-300 p-2 rounded-full 
                     hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
        >
          {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
        </button>
 
        <div className="relative">
          <div
            onClick={() => setOpen(!open)}
            className="h-8 w-8 rounded-full overflow-hidden cursor-pointer"
          >
            <img
              src={user?.imageUrl}
              alt="profile"
              className="h-full w-full object-cover"
            />
          </div>

          {open && (
            <div
              className="absolute right-0 mt-3 w-65 bg-white dark:bg-zinc-900 
                         border border-zinc-200 dark:border-zinc-700 
                         rounded-md shadow-xl px-4 py-3 gap-3 animate-in fade-in"
            >
             
              <div className="flex items-center gap-3">
                <img className="h-10 w-10 rounded-full" src={user?.imageUrl} alt="" />
                <div className="text-black dark:text-white">
                  <h1 className="font-bold">{user?.fullName}</h1>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    {user?.primaryEmailAddress?.emailAddress}
                  </p>
                </div>
              </div>

            
              <button
                onClick={() => signOut()}
                className="mt-3 flex items-center justify-center w-full 
                           bg-black dark:bg-white text-white dark:text-black
                           px-4 py-2 rounded-full gap-2 hover:gap-3 
                           transition-all duration-300"
              >
                <LogOut size={18} />
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

 
