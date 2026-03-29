
import {  useClerk } from "@clerk/clerk-react"
import { ArrowRight, Brain, Layers, Monitor, Play, Zap } from "lucide-react"
const LandingPage = () => {
  const {openSignIn}=useClerk()
  return (
    <>
      <div className="bg-black text-zinc-900 min-h-screen overflow-x-hidden">
        <nav className="flex items-center justify-between text-white p-5 bg-black border-b border-white/15">

          <div className="flex items-center justify-center gap-2 group">
            <div className="bg-white w-8 h-8 rounded-md flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-300">
              <Play size={20} fill="current-color" />

            </div>
            <span className="text-lg font-bold tracking-tight">StudyFlow</span>
          </div>

          <button
          onClick={()=>openSignIn()}
          className="font-semibold bg-white text-black px-4 py-2 rounded-full hover:scale-95 transition-all duration-300 cursor-pointer  ">Get Started</button>
         
         
        </nav>

        <section className="relative pt-13 flex flex-col items-center text-center overflow-hidden pb-20">

          <h1 className="text-5xl text-white font-bold tracking-tighter leadind-[1.1] mb-8">Study Without <br className="hidden md:block" />
            <span
              className="text-transparent bg-clip-text bg-gradent-to-r from-zinc-500 to bg-zinc-700"
            >Distractions.</span></h1>

          <p className="text-lg md:text-2xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed font-light ">The premium workspace for Youtube learners. Notes, Pomodoro, and AI tools in one cinematic interface</p>

          <div>
            <button

            onClick={()=>openSignIn()}
              className="bg-white h-14 px-8 flex items-center justify-center rounded-full 
    font-semibold text-lg shadow-xl hover:shadow-white/10 
    transition-all duration-300 gap-2
     hover:gap-3 cursor-pointer"
            >
              Get Started <ArrowRight size={18} />
            </button>
          </div>


        </section>

        <section className="flex flex-col items-center overflow-hidden mb-18 ">
          <div className="mb-16 text-center">
            <h1 className="text-white  text-3xl mb-6 font-bold ">Everything you need to <br /> enter flow state.</h1>
            <p className="text-zinc-400 text-lg mx-w-2xl mx-auto">We striped away the noise to give you the ultimate learning environment</p>

          </div>


          <div className="flex flex-col gap-3 md:grid md:grid-cols-3 grid-row-2 md:gap-6 h-[600px]">
            <div className="col-span-2 bg-black border border-white/10 rounded-3xl p-12 flex flex-col justify-between group hover:border-white/20 transition-colors relative overflow-hidden">
              <div className="flex md:flex-col relative z-10 ">
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-black mb-6">
                  <Monitor size={24} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Distraction-Free Player
                </h3>
                <p className="text-zinc-400 max-w-md">
                  Automatically removes sidebar recommendations,comments and ads. Just you and the content
                </p>
              </div>


            </div>

            <div className="row-span-2 bg-white text-black p-12 flex-col relative overflow-hidden rounded-3xl">
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-black flex items-center justify-center mb-6 text-white">
                  <Zap size={24} />
                </div>
                <h3 className="text-2xl font-bold mb-2">Deep Focus Tools</h3>
                <p className="text-zinc-600 mb-8">Built-in pomodoro timer,notepad and whiteboard</p>

                <div className="bg-black/5 rounded-2xl p-6  backdrop-blur-sm border border-black/10">
                  <div className="text-4xl font-mono font-bold tracking-widest text-center mb-2">
                    25:00
                  </div>
                </div>
              </div>

            </div>

            <div className="bg-black border border-white/10 rounded-3xl p-8 flex flex-col justify-center group hover:border-white/20 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center text-white mb-4">
                <Brain size={20} />

              </div>
              <h3 className="text-xl font-bold text-white mb-1 ">AI Classification</h3>
              <p className="text-sm text-zinc-400">Detects study vs entertainment videos.</p>



            </div>

            <div className="bg-black border border-white/10 rounded-3xl flex flex-col justify-center p-8 group hover:border-white/20 transition-colors ">

              <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center  text-white mb-4">
                <Layers size={20} />
              </div>
              <h3 className="text-xl font-bold    text-white mb-1">Smart Library</h3>
              <p className="text-sm  0  text-zinc-400">Organize playlists and notes effortlessly.</p>
            </div>
          </div>
        </section>




      </div>
    </>
  )
}

export default LandingPage
