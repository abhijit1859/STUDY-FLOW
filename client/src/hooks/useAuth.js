import {useUser} from "@clerk/clerk-react"

export function useAuth(){
    const {isSignedIn,isLoaded,user}=useUser()
    return {
        user:isSignedIn?user:null,
        loading:!isLoaded
    }
}