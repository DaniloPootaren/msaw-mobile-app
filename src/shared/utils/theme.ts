import {extendTheme} from 'native-base';
import {ColorPalette} from './colors';

const msawTheme = extendTheme({
  components: {
    colors: {},
    Input: {
      baseStyle: {
        style: {
          fontSize: 14,
          fontWeight: '400',
          borderColor: ColorPalette.primary,
        },
      },
    },
  },
});
export default msawTheme;
