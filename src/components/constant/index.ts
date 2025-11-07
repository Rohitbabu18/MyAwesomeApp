import { Dimensions, Platform } from "react-native";
import { MMKV } from "react-native-mmkv";
import { MMKVInterface } from "react-native-mmkv/lib/typescript/src/Types";
const { height, width } = Dimensions.get('window');

export interface ConstantProps {
  isAndroid: boolean,
  store: MMKVInterface,
  fullWidth: number,
  fullHeight: number
}

const Constant: ConstantProps = {
  isAndroid: Platform.OS == 'android',
  store: new MMKV(),
  fullWidth: width,
  fullHeight: height,

}

export default Constant;
