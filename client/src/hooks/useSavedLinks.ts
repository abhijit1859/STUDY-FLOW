import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getLinks, postLink } from "../context/api/savedApi"
import toast from "react-hot-toast"
import axios from "axios"
 
export const useSavedLinks = () => {
    return useQuery({
        queryKey: ["saved-links"],
        queryFn: getLinks
    })
}


export const useAddLink = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: postLink,
        onSuccess: (data) => {
            toast(data.message)
            queryClient.invalidateQueries({
                queryKey: ["saved-links"]
            })
        },
        onError: () => {
            toast("error")
        }
    })
}


export const usePlaylistVideos = (playlistId?: string) => {
    return useQuery({
        queryKey: ["playlist-videos", playlistId],
        queryFn: async () => {
            const res = await axios.get(
                `http://localhost:5000/api/v1/list/${playlistId}/videos`,
                { withCredentials: true }
            );
            return res.data.videos;
        },
        enabled: !!playlistId,
    });
};

export const useDeletePlayList = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (playlistId: string) => {
      const res = await axios.delete(
        `http://localhost:5000/api/v1/list/${playlistId}`,
        { withCredentials: true }
      );
      return res.data;
    },
    onSuccess: (data) => {
      toast(data.message);
      queryClient.invalidateQueries({
        queryKey: ["saved-links"],
      });
    },
  });
};
