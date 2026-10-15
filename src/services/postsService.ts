import axios from "axios";
import type { GetPostResponse, GetPostsResponse } from "../types/response";



class PostsService {


    async getAllPosts(): Promise<GetPostsResponse> {
        const { data } = await axios.get("https://route-posts.routemisr.com/posts", {
            headers: {
                token: localStorage.getItem("token")
            }
        })

        return data;
    }

    async createPost(formData: FormData) {
        const { data } = await axios.post("https://route-posts.routemisr.com/posts", formData, {
            headers: {
                token: localStorage.getItem("token")
            }
        })

        console.log(data);


        return data;
    }

    async deletePost(postId: string) {
        const { data } = await axios.delete("https://route-posts.routemisr.com/posts/" + postId, {
            headers: {
                token: localStorage.getItem("token")
            }
        })

        console.log(data);

        return data;
    }

    async getPostDetails(postId: string): Promise<GetPostResponse> {
        const { data } = await axios.get("https://route-posts.routemisr.com/posts/" + postId, {
            headers: {
                token: localStorage.getItem("token")
            }
        })

        return data;
    }

}



const postsService = new PostsService()
export default postsService;