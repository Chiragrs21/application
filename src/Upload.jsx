import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function SuccessPage() {
  const history = useHistory();

  const handleButtonClick = () => {
    history.push('/application');
  };

  const [files, setFiles] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleFileInputChange = (event) => {
    setFiles(event.target.files);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    try {
      const response = await fetch("/send-email", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      setMessage(data.message);
      setError("");
    } catch (err) {
      setMessage("");
      setError("Failed to send email. Please try again later.");
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Success!</h1>
      <h2>File Upload Form</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" name="files" onChange={handleFileInputChange} multiple />
        <br />
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p>Your form has been submitted.</p>
      <button onClick={handleButtonClick}>Go back to home page</button>
    </div>
  );
}

export default SuccessPage;
