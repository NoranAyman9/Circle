import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import postsService from "../services/postsService";
import Post from "../components/Post";
import commentsServices from "../services/commentsService";
import LoadingScreen from "../components/LoadingScreen";

export default function PostDetails() {
  const { postId = "" } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const postQuery = useQuery({
    queryKey: ["post", postId],
    queryFn: () => postsService.getPostDetails(postId),
    select: (res) => res.data.post,
    enabled: !!postId,
    retry: false, 
  });

  const commentsQuery = useQuery({
    queryKey: ["post", postId, "comments"],
    queryFn: () => commentsServices.getPostComments(postId),
    select: (res) => res.data.comments,
    enabled: !!postId,
  });

  // بيحدّث تفاصيل البوست + تعليقاته + الفيد الرئيسي
  async function refresh() {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ["post", postId] }),
      queryClient.invalidateQueries({ queryKey: ["posts"] }),
    ]);
  }

  async function deletePost(id: string) {
    await postsService.deletePost(id);
    queryClient.removeQueries({ queryKey: ["post", id] });
    await queryClient.invalidateQueries({ queryKey: ["posts"] });
    navigate("/", { replace: true });
  }

  async function createComment(id: string, formData: FormData) {
    const response = await commentsServices.createComment(id, formData);
    await refresh();
    return response;
  }

  async function deleteComment(id: string, commentId: string) {
    const response = await commentsServices.deleteComment(id, commentId);
    await refresh();
    return response;
  }

  async function updateComment(
    id: string,
    commentId: string,
    formData: FormData,
  ) {
    const response = await commentsServices.updateComment(
      id,
      commentId,
      formData,
    );
    await refresh();
    return response;
  }

  if (postQuery.isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="max-w-3xl my-10 mx-auto">
      {postQuery.isError ? (
        <h2>Post Not Found</h2>
      ) : (
        <Post
          post={postQuery.data}
          deletePost={deletePost}
          createComment={createComment}
          deleteComment={deleteComment}
          updateComment={updateComment}
          comments={commentsQuery.data}
        />
      )}
    </div>
  );
}