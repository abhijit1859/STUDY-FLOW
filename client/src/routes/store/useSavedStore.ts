import {create} from "zustand"


type SavedStore={
    link:string;
    setLink:(value:string)=>void
}
export const useSavedStore=create<SavedStore>((set)=>({
    link:"",
    setLink:(value)=>set({link:value})
}))