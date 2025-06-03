import React, { useState } from 'react';
import { Alert, View } from 'react-native';
import { Menu, Divider, IconButton } from 'react-native-paper';
import * as DocumentPicker from 'expo-document-picker';
import { BASE_URL } from '../assets/Constants';

export default function MenuButton() {
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const uploadToGCP = async (file: any): Promise<string | null> => {
  try {
    // 1. Request a signed URL from your backend (include filename)
    const getSignedUrlRes = await fetch(`${BASE_URL}/upload/get-signed-url`, {
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

    const response = await fetch(`${BASE_URL}/upload/upload-report`, {
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
