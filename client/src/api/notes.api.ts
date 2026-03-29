import axios from "axios"
import toast from "react-hot-toast";

type NoteProps = {
    title: string,
    content: string,
    id?: string
}

export const getNotes = async () => {
    
    const res = await axios.get("http://localhost:5000/api/v1/notes/", {
        withCredentials: true,
    });
    const data = res.data
    return data
}

export const getNote = async (id: string) => {
    const res = await axios.get(`http://localhost:5000/api/v1/notes/${id}`)
    return res.data;

}

export const createNote = async ({ title, content }: NoteProps) => {
    const res = await axios.post("http://localhost:5000/api/v1/notes/",
        { title: title, content: content },
        { withCredentials: true })

    return res.data;
}

export const updateNote = async ({ title, content, id }: NoteProps) => {
    const res = await axios.put(`http://localhost:5000/api/v1/notes/${id}`,
        { title, content }, { withCredentials: true }
    )

    return res.data
}

export const deleteNote = async (id: string) => {
    console.log("intitaed")
    const res = await axios.delete(`http://localhost:5000/api/v1/notes/${id}`,
        { withCredentials: true }
    )
    console.log(res.data)

    return res.data
}

export const genPdf = async (videoId: string) => {

    const res = await axios.get(`http://localhost:5000/api/v1/list/${videoId}`, {
        withCredentials: true,
        responseType: "blob",
    })
    toast(res.data)
    console.log(res.data)
    const fileURL = window.URL.createObjectURL(new Blob([res.data]));
    console.log(fileURL)
    return fileURL
 
}