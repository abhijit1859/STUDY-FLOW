import { createNote, deleteNote, genPdf, getNotes, updateNote } from "@/api/notes.api"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useNotes=()=>{
    return  useQuery({
        queryKey:["notes"],
        queryFn:getNotes
    })
}

export const useCreateNote=()=>{
    const queryClient=useQueryClient()

    return useMutation({
        mutationFn:createNote,
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:["notes"]})
        }
    })
}

export const useUpdateNote=()=>{
    const queryClient=useQueryClient()

    return useMutation({
        mutationFn:updateNote,
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:["notes"]})
        }
    })
}

export const useDeleteNote=()=>{
    const queryClient=useQueryClient()

    return useMutation({
        mutationFn:deleteNote,
        
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:["notes"]})
        }
    })
}

export const useGenPdf=()=>{
    return useMutation({
        mutationFn:genPdf
    })
}