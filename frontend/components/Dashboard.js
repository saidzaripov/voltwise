import { useState } from 'react';

export default function Dashboard({ user }) {
  const [uploadResult, setUploadResult] = useState('');

  const handleUpload = async (e) => {
    const formData = new FormData();
    formData.append('energyBill', e.target.files[0]);

    const res = await fetch('https://<YOUR_RAILWAY_BACKEND_URL>/api/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    if (data.success) setUploadResult(data.data);
    else alert('Failed to process file');
  };

  return (
    <div>
      <h1>Welcome, {user.displayName}</h1>
      <input type="file" onChange={handleUpload} />
      <pre>{uploadResult}</pre>
    </div>
  );
}