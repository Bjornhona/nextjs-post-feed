'use server';
import { uploadImage } from '@/lib/cloudinary';
import { storePost, updatePostLikeStatus } from '@/lib/posts';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const createPost = async (prevState, formData) => {
  const title = formData.get('title');
  const image = formData.get('image');
  const content = formData.get('content');

  let errors = [];
  if (!title || title.trim().length === 0) {
    errors.push('title is required');
  }
  if (!content || content.trim().length === 0) {
    errors.push('content is required');
  }
  if (!image || image.size === 0) {
    errors.push('image is required');
  }
  if (errors.length > 0) {
    return { errors };
  }

  let imageUrl;
  try {
    imageUrl = await uploadImage(image);
  } catch (error) {
    throw new Error(
      'Image upload failed, post was not created. Please try again later.'
    )
  }

  await storePost({
    imageUrl: imageUrl,
    title,
    content,
    userId: 1
  })

  revalidatePath('/', 'layout');
  redirect('/feed');
}

export const togglePostLikeStatus = async (postId) => {
  await updatePostLikeStatus(postId, 2);
  // will pick up all the data in the app, updates the state of the page, see documentation
  revalidatePath('/', 'layout');
}