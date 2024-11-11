import PostForm from '@/components/post-form';
import { createPost } from '@/actions/posts';

const NewPostPage = () => {
  return <PostForm action={createPost} />
}

export default NewPostPage;