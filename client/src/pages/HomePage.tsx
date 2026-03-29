
import { ArrowRight, BarChart2Icon, Notebook, PlaySquareIcon, Search } from "lucide-react"
import type { ReactElement } from "react"



const HomePage = () => {

  return (
    <div className='bg-white dark:bg-black min-h-screen'>
     

      <section className=" px-4">
        <div className="flex flex-col items-center justify-center gap-6 p-6">

          {/* Heading */}
          <h1 className="text-center text-4xl md:text-6xl font-extrabold leading-tight">
            Study without <br />
            <span className="dark:text-zinc-500 text-zinc-400">distractions.</span>
          </h1>

          {/* Description */}
          <p className="mx-auto max-w-2xl text-center dark:text-zinc-300 text-zinc-600 text-lg">
            Convert any YouTube playlist into a focused, ad-free study environment.
            Built-in notes, timer, and analytics included.
          </p>

          {/* Search Box */}
          <div className="mt-4 flex items-center justify-between gap-3 
                    bg-white dark:bg-zinc-900 px-4 py-3 
                    rounded-xl shadow-md w-full max-w-xl">

            <Search className="text-zinc-600 dark:text-zinc-400" />

            <input
              type="text"
              placeholder="Paste YouTube playlist URL..."
              className="flex-1 bg-transparent focus:outline-none 
                   text-zinc-800 dark:text-zinc-200 
                   placeholder:text-zinc-400 dark:placeholder:text-zinc-500"
            />

            <button className="bg-black text-white p-3 rounded-lg dark:bg-zinc-700 hover:bg-zinc-800 transition cursor-pointer">
              <ArrowRight />
            </button>
          </div>

        </div>
        <div className="flex flex-col  md:max-w-3xl md:flex-row gap-3 mx-auto  justify-center mt-12  ">
          <Card logo={<PlaySquareIcon />} title={"Distraction Free"} description={"No siderbar ads,no comments,just content"} />
          <Card logo={<Notebook />} title={"Smart Notes"} description={"Take notes that sync with video timestamps."} />
          <Card logo={<BarChart2Icon/>} title={"Productivity Stats"} description={"Track your focus time and session types."} />

        </div>


        <div>

        </div>
      </section>


    </div>
  )
}

function Card({ logo, title, description }:{logo:ReactElement,title:string,description:string}) {
  return (
    <div className="dark:bg-zinc-900 px-4 py-6 rounded-lg flex  justify-center flex-col gap-1 md:max-w-xl shadow-md">
      <div className="flex items-center justify-center dark:bg-zinc-700 p-1 rounded-lg  w-[30px]">
        {logo}
      </div>
      <h1 className="text-base font-bold">{title}</h1>
      <p className="dark:text-zinc-400 ">{description}</p>
    </div>
  )

}

export default HomePage
