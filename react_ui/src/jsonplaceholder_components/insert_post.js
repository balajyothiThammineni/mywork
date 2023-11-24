import { useState } from "react";

function InsertPost() {
  const [title, setTitle] = useState('');
  const [pbody, setPBody] = useState('');
  const [msg, setMsg] = useState('');

  const addPost = () => {
    let post = {
      'title': title,
      'body': pbody,
      'userId': 102
    };

    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify(post)
    });

    setMsg('post inserted');
    return;
  };

  return (
    <div>
      {msg !== '' ? msg : ''}<br />
      <label>Enter the post title:</label>
      <input type="text" onChange={(e) => setTitle(e.target.value)} />
      <br /><br />
      <label>Enter the post body:</label>
      <input type="text" onChange={(e) => setPBody(e.target.value)} />
      <br /><br />
      <button onClick={() => addPost()}>Insert Post</button>
    </div>
  );
}

export default InsertPost;
