import { useQuery } from "@tanstack/react-query";
import postsService from "../services/postsService";

export default function useFetch() {
  const { data: posts = [] } = useQuery({
    queryKey: ["posts"],
    queryFn: postsService.getAllPosts,
    select: (data) => data.data.posts,
  });

  return posts;
}