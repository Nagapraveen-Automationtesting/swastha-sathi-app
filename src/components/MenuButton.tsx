import React, { useState } from 'react';
import { Alert, View } from 'react-native';
import { Menu, Divider, IconButton } from 'react-native-paper';
import * as DocumentPicker from 'expo-document-picker';

export default function MenuButton() {
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

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

    const formData = new FormData();
    formData.append('report', {
      uri: file.uri,
      name: file.name,
      type: file.mimeType || 'application/octet-stream',
    } as any);

    const response = await fetch('http://10.0.2.2:8001/upload/upload-report', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
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
