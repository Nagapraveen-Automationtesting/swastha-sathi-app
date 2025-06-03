import { Alert } from "react-native";

const uploadToGCP = async (file: any): Promise<string | null> => {
  try {
    // 1. Request a signed URL from your backend (include filename)
    const getSignedUrlRes = await fetch(`http://10.0.2.2:8001/upload/get-signed-url`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fileName: file.name, fileType: file.mimeType }),
    });

    const { signedUrl, publicUrl } = await getSignedUrlRes.json();

    // 2. Upload the file to GCP using the signed URL
    const uploadRes = await fetch(signedUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': file.mimeType || 'application/octet-stream',
      },
      body: await fetch(file.uri).then(res => res.blob()),
    });

    if (!uploadRes.ok) throw new Error('Upload to GCP failed');

    return publicUrl; // GCS file path (e.g., gs:// or https://storage.googleapis.com/...)
  } catch (err) {
    console.error('GCP Upload Error:', err);
    Alert.alert('Error', 'File upload to GCP failed.');
    return null;
  }
};
