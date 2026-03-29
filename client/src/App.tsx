import React, { useState } from "react";
import Navbar from "./components/Navbar";


import { ViewState } from "./components/Navbar";

import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { Home } from "lucide-react";
import Saved from "./pages/Saved";
import Notes from "./pages/Notes";
import Pomodoro from "./pages/Pomodoro";
import Canvas from "./pages/Canvas"
import Stats from "./pages/Stats";
import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";
import Player from "./pages/Player";
import type { Playlist } from "./types/types";


const App: React.FC = () => {
   

  const [currentView, setCurrentView] = useState<ViewState>(ViewState.HOME);
  const [activePlaylist, setActivePlaylist] = useState<Playlist | null>(null);







  const renderView = () => {
    switch (currentView) {
      case ViewState.HOME:
        return <HomePage />;

      case ViewState.LIBRARY:
        return <Saved 
        onSelectPlaylist={
          (playlist)=>{
            
            setActivePlaylist(playlist);
            setCurrentView(ViewState.PLAYER)
          }
        }
        
        />



      case ViewState.NOTES:
        return <Notes />;

      case ViewState.POMODORO:
        return <Pomodoro />;

      case ViewState.WHITEBOARD:
        return <Canvas />;

      case ViewState.STATS:
        return <Stats />;


     case ViewState.PLAYER:
  return <Player playlist={activePlaylist} />;

      default:
        return <Home />;
    }
  };


  return (
    <>
      <SignedOut>


        <LandingPage />
      </SignedOut>
 
      <SignedIn>
        <div className="h-screen flex flex-col bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 transition-colors duration-300 overflow-hidden">
          <Navbar
            currentView={currentView}
            onChangeView={setCurrentView}

          />

          <main className="flex-1 w-full overflow-hidden">

            {renderView()}

          </main>


        </div>
      </SignedIn>
    </>
  );
};

export default App;
