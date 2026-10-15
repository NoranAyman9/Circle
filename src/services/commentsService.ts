import axios from "axios";
import type {
  CreateCommentResponse,
  DeleteCommentResponse,
  GetPostCommentsResponse,
  UpdateCommentResponse,
} from "../types/response";

const BASE_URL = "https://route-posts.routemisr.com/posts";

function authHeaders() {
  return { token: localStorage.getItem("token") };
}

class CommentsServices {
  async createComment(
    postId: string,
    formData: FormData,
  ): Promise<CreateCommentResponse> {
    const { data } = await axios.post(
      `${BASE_URL}/${postId}/comments`,
      formData,
      { headers: authHeaders() },
    );
    return data;
  }

  async updateComment(
    postId: string,
    commentId: string,
    formData: FormData,
  ): Promise<UpdateCommentResponse> {
    const { data } = await axios.put(
      `${BASE_URL}/${postId}/comments/${commentId}`,
      formData,
      { headers: authHeaders() },
    );
    return data;
  }

  async deleteComment(
    postId: string,
    commentId: string,
  ): Promise<DeleteCommentResponse> {
    const { data } = await axios.delete(
      `${BASE_URL}/${postId}/comments/${commentId}`,
      { headers: authHeaders() },
    );
    return data;
  }

  async getPostComments(postId: string): Promise<GetPostCommentsResponse> {
    const { data } = await axios.get(`${BASE_URL}/${postId}/comments`, {
      headers: authHeaders(),
    });
    return data;
  }
}

const commentsServices = new CommentsServices();
export default commentsServices;