'use client';
import { useFormStatus } from 'react-dom';
// import { useActionState } from 'react'; // in newer react versions

const FormSubmit = () => {
  const status = useFormStatus();
  if (status.pending) {
    return <p>Pending post...</p>;
  }

  return (
    <>
      <button type="reset">Reset</button>
      <button>Create Post</button>
    </>
  )
}

export default FormSubmit;
