import { Pause, Play, RefreshCcw } from "lucide-react";
import { useEffect, useState } from "react";


const FOCUS_TIME = 25 * 60
const BREAK_TIME = 5 * 60

const Pomodoro = () => {
  const [time, setTime] = useState<number>(FOCUS_TIME)
  const [isRunning, setIsRunning] = useState<boolean>(false)
  const [isFocus, setIsFocus] = useState<boolean>(true)

  const switchMode = (): void => {
    setIsRunning(false)
    setIsFocus((prev: boolean) => !prev)
    setTime(isFocus ? BREAK_TIME : FOCUS_TIME)

  }

  useEffect((): (() => void) | void => {
    if (!isRunning) return;

    const interval: number = window.setInterval(() => {
      setTime((prev: number) => {
        if (prev <= 1) {
          clearInterval(interval);
          switchMode();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);



  const resetTimer = (): void => {
    setIsRunning(false)
    setTime(isFocus ? FOCUS_TIME : BREAK_TIME)
  }

  const minutes: string = String(Math.floor(time / 60)).padStart(2, "0");
  const seconds: string = String(time % 60).padStart(2, "0");

  return (

    <section className="flex flex-col gap-10 items-center justify-center p-4">

      {/* TIMER CIRCLE */}
      <div className="h-80 w-80 rounded-full flex items-center justify-center border-4 border-zinc-400 dark:border-zinc-600">

        {/* INNER CIRCLE */}
        <div className="h-64 w-64 rounded-full flex items-center justify-center border-2 border-zinc-300 dark:border-zinc-700">
          <h1 className="text-4xl font-bold text-zinc-900 dark:text-white">
            {minutes}:{seconds}
          </h1>
        </div>

      </div>

      {/* BUTTONS */}
      <div className="flex gap-6">
        <button
        onClick={()=>setIsRunning((prev)=>!prev)}
        className="dark:bg-white dark:text-black bg-black text-white p-3 rounded-lg transition hover:opacity-80">
          {isRunning ? <Pause size={22} /> : <Play size={22} />}
        </button>

        <button onClick={resetTimer} className="dark:bg-white dark:text-black bg-black text-white p-3 rounded-lg transition hover:opacity-80">
          <RefreshCcw size={22} />
        </button>
      </div>


      <p className="text-zinc-500 dark:text-zinc-400 text-sm">
        {isFocus ? "Focus Mode" : "Break Mode"}
      </p>

    </section>
  );
};

export default Pomodoro;
