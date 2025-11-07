import { moderateScale } from "react-native-size-matters"

const fontFamily = {
    light: 'Manrope-Light',
    regular: 'Manrope-Regular',
    medium: 'Manrope-Medium',
    semibold: 'Manrope-SemiBold',
    bold: 'Manrope-Bold',
    black: 'Manrope-ExtraBold',
}
const fontWeight: any = {
    h1: 900,
    h2: 700,
    h3: 600,
    h4: 500,
    h5: 400,
    h6: 300,
}
const fontSize = {
    bigText: moderateScale(18),
    title: moderateScale(16),
    normalText: moderateScale(14),
    mediumText: moderateScale(12),
    smallText: moderateScale(10)
}
const Fonts = { fontWeight, fontFamily, fontSize }
export default Fonts