import React, {useState} from 'react';
import {ImageBackground, StyleSheet, TouchableOpacity} from 'react-native';
import ImageUploadIcon from '../../../assets/icons/Upload.svg';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ChooseMediaModal from './Modal';
import TrashIcon from '../../../assets/icons/trash.svg';
import EditIcon from '../../../assets/icons/edit.svg';
import ConfirmationModal from '../Modals/ConfirmationModal';
import {HStack, Text, VStack, View} from 'native-base';
import {ColorPalette} from '../../utils/colors';

interface Props {
  onChange?: (imageUri: string) => void;
  onDelete?: () => void;
}

const ImageUploader = (props: Props) => {
  const {onChange, onDelete} = props;
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [showConfirmationModal, setShowConfirmationMaodal] =
    useState<boolean>(false);

  const handleImageSelection = async (options: any) => {
    try {
      const result = await options();
      if (result?.assets && result.assets.length > 0 && result.assets[0]?.uri) {
        setImageUri(result.assets[0].uri);
        if (onChange) {
          onChange(result.assets[0].uri);
        }
      }
    } catch (error) {
      console.error('Error selecting image:', error);
    } finally {
      setOpenModal(false);
    }
  };

  const handleCamera = () => {
    handleImageSelection(() =>
      launchCamera({mediaType: 'photo', cameraType: 'back'}),
    );
  };

  const handleGallery = () => {
    handleImageSelection(() =>
      launchImageLibrary({mediaType: 'photo', selectionLimit: 1}),
    );
  };

  const handleDeleteImage = () => {
    setImageUri(null);
    setShowConfirmationMaodal(false);
    if (onDelete) {
      onDelete();
    }
  };

  return (
    <VStack style={styles.container}>
      <HStack style={styles.toolbar}>
        <HStack alignItems="center">
          <ImageUploadIcon />
          <TouchableOpacity onPress={() => setOpenModal(true)}>
            <View ml={16}>
              <Text fontSize={14} fontWeight="700" color={ColorPalette.primary}>
                Take / Upload
              </Text>
              <Text fontSize={14}>Picture of animal</Text>
            </View>
          </TouchableOpacity>
        </HStack>

        {imageUri && (
          <HStack justifyContent="space-evenly" w={80}>
            <TouchableOpacity onPress={() => setOpenModal(true)}>
              <EditIcon />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowConfirmationMaodal(true)}>
              <TrashIcon />
            </TouchableOpacity>
          </HStack>
        )}
      </HStack>

      {imageUri && (
        <ImageBackground
          source={{uri: imageUri}}
          style={styles.image}
          resizeMode="cover"
        />
      )}
      <ChooseMediaModal
        isVisible={openModal}
        onCamera={handleCamera}
        onGallery={handleGallery}
        onClose={() => setOpenModal(false)}
      />
      <ConfirmationModal
        isVisible={showConfirmationModal}
        onCancel={() => setShowConfirmationMaodal(false)}
        onConfirm={handleDeleteImage}
        message="Do you want to delete this image?"
      />
    </VStack>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: ColorPalette.white,
    minHeight: 100,
    borderRadius: 8,
    padding: 16,
  },
  toolbar: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 10,
  },
  image: {
    height: 150,
    width: 300,
    overflow: 'hidden',
    borderRadius: 8,
  },
});

export default ImageUploader;
