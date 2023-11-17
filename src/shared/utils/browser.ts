import {Linking} from 'react-native';

export const openLink = (url: string) => {
  Linking.openURL(url).catch((err: any) =>
    console.error('An error occurred', err),
  );
};
