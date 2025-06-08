import React, { useState } from 'react';
import { Alert, View } from 'react-native';
import { Menu, Divider, IconButton } from 'react-native-paper';
import * as DocumentPicker from 'expo-document-picker';
import { BASE_URL, FILE_UPLOAD_GCP_URL, FILE_UPLOAD_URL } from '../assets/Constants';

export default function MenuButton() {
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

const uploadToGCP = async (file: any): Promise<string | null> => {
  try {
    const mimeType = file.mimeType || 'application/pdf'; // fallback just in case

    // 1. Request signed URL
    const getSignedUrlRes = await fetch(`${FILE_UPLOAD_GCP_URL}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fileName: file.name, fileType: mimeType }),
    });

    const { signedUrl, publicUrl } = await getSignedUrlRes.json();
    console.log("Signed URL:", signedUrl);

    // 2. Convert file URI to blob (works in React Native)
    // const blob = await fetch(file.uri).then(res => res.blob());
    const fileRes = await fetch(file.uri);
    const fileBlob = await fileRes.blob();


    // 3. Upload with exact Content-Type used in signing
    const uploadRes = await fetch(signedUrl, {
      method: 'PUT',

      body: fileBlob,
    });

    const uploadText = await uploadRes.text();
    console.log("Upload response:", uploadText);


    if (!uploadRes.ok) {
      const errText = await uploadRes.text();
      console.error("Upload failed:", errText);
      throw new Error(`Upload failed with status: ${uploadRes.status}`);
    }

    return publicUrl;
  } catch (err) {
    console.error('GCP Upload Error:', err);
    Alert.alert('Error', 'File upload to GCP failed.');
    return null;
  }
};



// import * as DocumentPicker from 'expo-document-picker';
// import { Alert } from 'react-native';

const handleUploadReport = async () => {
  closeMenu(); // close the menu first before opening picker

  try {
    const result = await DocumentPicker.getDocumentAsync({
      type: ['application/pdf', 'image/*'],
      copyToCacheDirectory: true,
      multiple: false,
    });

    if (result.canceled) return;

    const file = result.assets?.[0];
    if (!file) {
      Alert.alert('Error', 'No file selected.');
      return;
    }

    // const formData = new FormData();
    // formData.append('report', {
    //   uri: file.uri,
    //   name: file.name,
    //   type: file.mimeType || 'application/octet-stream',
    // } as any);

    const gcpUrl = await uploadToGCP(file);
    if (!gcpUrl) return;

    const response = await fetch(`${FILE_UPLOAD_URL}`, {
      method: 'POST',
      headers: {
        // 'Content-Type': 'multipart/form-data',
        'Content-Type': 'application/json'
      },
      // body: formData, 
       body: JSON.stringify({ filePath: gcpUrl }),
    });

    const data = await response.json();
    Alert.alert('Vitals Extracted', JSON.stringify(data.vitals, null, 2));
  } catch (err) {
    console.error('Upload failed:', err);
    Alert.alert('Error', 'Failed to upload the report.');
  }
};




  return (
    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
      <Menu
        visible={visible}
        
        onDismiss={closeMenu}
        anchor={
          <IconButton icon="dots-horizontal" size={24} onPress={handleUploadReport} />
        }
      >
        <Menu.Item onPress={handleUploadReport} title="Upload Report" />
       
      </Menu>
    </View>
  );
}
