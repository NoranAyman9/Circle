import { Edit, Trash } from "lucide-react";
import type { CommentI } from "../interfaces/commentI";
import { useContext, useState, type FormEvent } from "react";
import { authContext } from "../contexts/authContext";
import { Button, Input } from "@heroui/react";
import type {
  DeleteCommentResponse,
  UpdateCommentResponse,
} from "../types/response";

export default function Comment({
  comment,
  deleteComment,
  updateComment,
}: {
  comment: CommentI;
  deleteComment: (
    postId: string,
    commentId: string,
  ) => Promise<DeleteCommentResponse>;
  updateComment: (
    postId: string,
    commentId: string,
    formData: FormData,
  ) => Promise<UpdateCommentResponse>;
}) {
  const { userData } = useContext(authContext);
  const [editMode, setEditMode] = useState(false);
  const [commentContent, setCommentContent] = useState(comment.content);
  const [isLoading, setIsLoading] = useState(false);

  async function editComment(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.set("content", commentContent);
      await updateComment(comment.post, comment._id, formData);
      setEditMode(false);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex justify-around w-full px-5 my-3 border-t pt-4 border-divider ">
      <div className="w-full">
        <div className="flex items-center justify-between">
          <div className="w-full h-16 flex items-center justify-between ">
            <div className="flex">
              <img
                className=" rounded-full w-10 h-10 mr-3"
                src={comment.commentCreator.photo}
                alt={comment.commentCreator.name}
              />
              <div>
                <h3 className="text-md font-semibold ">
                  {comment.commentCreator.name}
                </h3>
                <p className="text-xs text-gray-500">{comment.createdAt}</p>
              </div>
            </div>
          </div>

          {comment.commentCreator._id == userData._id && (
            <>
              <Trash
                className="text-red-500 cursor-pointer"
                onClick={() => deleteComment(comment.post, comment._id)}
              />
              <Edit
                className="text-yellow-500 cursor-pointer"
                onClick={() => setEditMode(true)}
              />
            </>
          )}
        </div>
        <div className="ps-12 pt-4">
          {!editMode ? (
            <p>{comment.content}</p>
          ) : (
            <form onSubmit={editComment}>
              <Input
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
                className="w-full"
                placeholder="comment...."
                variant="bordered"
              />
              <div className="mt-2 flex justify-end gap-2">
                <Button
                  onPress={() => {
                    setEditMode(false);
                    setCommentContent(comment.content);
                  }}
                  color="default"
                >
                  Cancel
                </Button>
                <Button isLoading={isLoading} type="submit" color="primary">
                  Edit
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}