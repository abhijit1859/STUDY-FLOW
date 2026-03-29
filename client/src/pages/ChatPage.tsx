import { Search, Send, Upload } from "lucide-react"
import { useRef, useState, type ReactElement } from "react"

const ChatPage = () => {
  const [pdfUrl,setPdfUrl]=useState(null)
  const fileRef=useRef(null)
  const handleClick=()=>{
    fileRef.current?.click()
  }

  const handleFileChange=(e:ReactElement)=>{
    const file=e.target.files[0];
    if(file&&file.type==="application/pdf"){
      const url=URL.createObjectURL(file)
      setPdfUrl(url)
    }
  }
  return (
    <section className="flex w-full h-full flex-col md:flex-row overflow-hidden">

   
   <div className="w-full md:w-[40%] h-screen flex items-center justify-center border-b md:border-b-0 md:border-r border-neutral-700">

    {!pdfUrl?( <div className="flex flex-col items-center justify-center gap-2 bg-neutral-200 hover:bg-neutral-300 transition-colors px-6 py-4 rounded-xl cursor-pointer"
        onClick={handleClick}
        >
          <Upload className="w-6 h-6 text-black" />
          <span className="text-sm font-medium text-black">Upload PDF</span>

          <input ref={fileRef} type="file" 
          accept="application/pdf"
          className="hidden"
          onChange={handleFileChange}
          />
        </div>):(
          <iframe
          src={pdfUrl}
          className="w-full h-full"
          />
        )}
       

      </div>

      


      
      <div className="w-full md:w-[60%] h-full flex flex-col overflow-hidden">
 
        <div className="flex-1 overflow-y-auto p-6">
         
        </div>
 
        <div className="p-4 border-t border-neutral-800">
          <div className="border border-neutral-500 rounded-full px-4 py-3 flex items-center gap-3">
            <Search className="text-neutral-400" size={18} />

            <input
              type="text"
              placeholder="Ask about the PDF"
              className="flex-1 bg-transparent outline-none text-sm text-neutral-200 placeholder-neutral-500"
            />

            <button className="bg-black rounded-full flex items-center justify-center p-2">
              <Send className="text-white" size={16} />
            </button>
          </div>
        </div>

      </div>
    </section>
  )
}

export default ChatPage
