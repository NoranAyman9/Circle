import { Trash } from "lucide-react";
import type { PostI } from "../interfaces/postI";
import Comment from "./Comment";
import { useContext, useState, type FormEvent } from "react";
import { authContext } from "../contexts/authContext";
import { Button, Input } from "@heroui/react";
import type {
  CreateCommentResponse,
  DeleteCommentResponse,
  UpdateCommentResponse,
} from "../types/response";
import type { CommentI } from "../interfaces/commentI";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "./LoadingScreen";

export default function Post({
  post,
  deletePost,
  createComment,
  deleteComment,
  updateComment,
  comments,
}: {
  post: PostI | undefined;
  deletePost: (postId: string) => Promise<void>;
  createComment: (
    postId: string,
    formData: FormData,
  ) => Promise<CreateCommentResponse>;
  deleteComment: (
    postId: string,
    commentId: string,
  ) => Promise<DeleteCommentResponse>;
  updateComment: (
    postId: string,
    commentId: string,
    formData: FormData,
  ) => Promise<UpdateCommentResponse>;
  comments?: CommentI[];
}) {
  const { userData } = useContext(authContext);
  const [commentContent, setCommentContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function handleCreateComment(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!post) return;

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.set("content", commentContent);
      await createComment(post._id, formData);
      setCommentContent("");
    } finally {
      setIsLoading(false);
    }
  }

  if (!post) {
    return <LoadingScreen />;
  }

  return (
    <div className="bg-white w-full rounded-md shadow-md h-auto py-3 px-3 my-5">
      {/* Post header */}
      <div className="w-full h-16 flex items-center justify-between ">
        <div className="flex">
          <img
            className=" rounded-full w-10 h-10 mr-3"
            src={post.user.photo}
            alt={post.user.name}
          />
          <div>
            <h3 className="text-md font-semibold ">{post.user.name}</h3>
            <p className="text-xs text-gray-500">{post.createdAt}</p>
          </div>
        </div>
        {post.user._id == userData._id && (
          <Trash
            onClick={() => deletePost(post._id)}
            className="text-red-500 cursor-pointer"
          />
        )}
      </div>

      {/* Post body */}
      {post.body && <p className="mt-4">{post.body}</p>}
      {post.image && (
        <img src={post.image} className="w-full object-cover mt-2" alt="" />
      )}

      {/* post Footer */}
      <div className="w-full h-8 flex items-center px-3 my-3">
        <div className="bg-blue-500 z-10 w-5 h-5 rounded-full flex items-center justify-center ">
          <svg
            className="w-3 h-3 fill-current text-white"
            xmlns="http://www.w3.org/2000/svg"
            width={27}
            height={27}
            viewBox="0 0 24 24"
            fill="none"
            stroke="#b0b0b0"
            strokeWidth={2}
            strokeLinecap="square"
            strokeLinejoin="round"
          >
            <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
          </svg>
        </div>
        <div className="bg-red-500 w-5 h-5 rounded-full flex items-center justify-center -ml-1">
          <svg
            className="w-3 h-3 fill-current stroke-current text-white"
            xmlns="http://www.w3.org/2000/svg"
            width={27}
            height={27}
            viewBox="0 0 24 24"
            fill="none"
            stroke="#b0b0b0"
            strokeWidth={2}
            strokeLinecap="square"
            strokeLinejoin="round"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </div>
        <div className="w-full flex justify-between">
          <p className="ml-3 text-gray-500">{post.likesCount}</p>
          <p className="ml-3 text-gray-500">{post.commentsCount} comment</p>
        </div>
      </div>

      {/* Post actions */}
      <div className="flex justify-around w-full px-5 my-3 border-t pt-4 border-divider ">
        <button className="flex flex-row justify-center items-center space-x-3 cursor-pointer w-fit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={27}
            height={27}
            viewBox="0 0 24 24"
            fill="none"
            stroke="#838383"
            strokeWidth={2}
            strokeLinecap="square"
            strokeLinejoin="round"
          >
            <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
          </svg>
          <span className="font-semibold text-lg text-gray-600">Like</span>
        </button>
        <button
          onClick={() => navigate("/posts/" + post._id)}
          className="flex flex-row justify-center items-center space-x-3 cursor-pointer w-fit"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={27}
            height={27}
            viewBox="0 0 24 24"
            fill="none"
            stroke="#838383"
            strokeWidth={2}
            strokeLinecap="square"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          <span className="font-semibold text-lg text-gray-600">Comment</span>
        </button>
        <button className="flex flex-row justify-center items-center space-x-3 cursor-pointer w-fit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={27}
            height={27}
            viewBox="0 0 24 24"
            fill="none"
            stroke="#838383"
            strokeWidth={2}
            strokeLinecap="square"
            strokeLinejoin="round"
          >
            <circle cx={18} cy={5} r={3} />
            <circle cx={6} cy={12} r={3} />
            <circle cx={18} cy={19} r={3} />
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
          </svg>
          <span className="font-semibold text-lg text-gray-600">Share</span>
        </button>
      </div>

      {/* Create comment */}
      <div>
        <form
          className="flex relative border-t pt-4 border-divider"
          onSubmit={handleCreateComment}
        >
          <Input
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            placeholder="comment...."
          />
          <Button
            isDisabled={commentContent.trim().length < 2}
            type="submit"
            isLoading={isLoading}
            color="primary"
          >
            Comment
          </Button>
        </form>
      </div>

      {/* Comments */}
      {comments
        ? comments.map((comment) => (
            <Comment
              key={comment._id}
              comment={comment}
              deleteComment={deleteComment}
              updateComment={updateComment}
            />
          ))
        : post.topComment && (
            <Comment
              comment={post.topComment}
              deleteComment={deleteComment}
              updateComment={updateComment}
            />
          )}
    </div>
  );
}