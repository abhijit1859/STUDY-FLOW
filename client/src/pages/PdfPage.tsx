import { FileText, NotepadTextDashed, StickyNote, Upload } from "lucide-react"
import Notes from "./Notes"


const PdfPage = () => {
    return (
        <section>
            <div className="flex flex-col items-center justify-center mt-8 gap-3">
                <div className="p-6 bg-neutral-200 rounded-md"><FileText size={40} /></div>
                <h1 className="text-4xl font-bold">Talk with Any Pdf</h1>
                <p className="max-w-xl text-lg font-neutral-600 text-center">Upload your lecture notes, textbooks, or research papers.
                    Our AI will study them instantly so you can ask questions.</p>

                <div className="  rounded-lg  border-2 border-neutral-400 border-dashed flex flex-col items-center justify-center p-12 md:w-120 mt-12 hover:border-zinc-500 group cursor-pointer">
                <Upload className="text-neutral-400 group-hover:text-zinc-900"/>
                <p className="font-bold">Click To Upload Pdf</p>
                </div>




            </div>
        </section>
    )
}

export default PdfPage