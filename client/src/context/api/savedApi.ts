import axios from 'axios'

export const getLinks=async()=>{
    const res=await axios.get("http://localhost:5000/api/v1/list/getLink",{withCredentials:true})
    return res.data.urls??[]
}

export const postLink = async (link: string) => {
  const res = await axios.post(
    "http://localhost:5000/api/v1/list/postLink",
    { link },
    { withCredentials: true }
  );
  return res.data;
};