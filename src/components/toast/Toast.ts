import Toast from 'react-native-simple-toast';
import { ThemeType } from '../theme';
import { Platform, ToastAndroid } from 'react-native';

function successShowToast(message: string, theme: ThemeType) {
    if (Platform.OS === 'android') {
        ToastAndroid.showWithGravity(
            message,
            ToastAndroid.SHORT,
            ToastAndroid.TOP
        );
        return;
    }
    return Toast.show(message, Toast.SHORT, {
        backgroundColor: theme.primary,
    });
}

function WarningShowToast(message: string, theme: ThemeType) {
    if (Platform.OS === 'android') {
        ToastAndroid.showWithGravity(
            message,
            ToastAndroid.SHORT,
            ToastAndroid.TOP
        );
        return;
    }
    return Toast.show(message, Toast.SHORT, {
        backgroundColor: theme.yellow,
    });

}

function FailureShowToast(message: string, theme: ThemeType) {
    if (Platform.OS === 'android') {
        ToastAndroid.showWithGravity(
            message,
            ToastAndroid.SHORT,
            ToastAndroid.TOP
        );
        return;
    }
    return Toast.show(message, Toast.SHORT, {
        backgroundColor: theme.red,
    });
}
export default {
    successShowToast,
    WarningShowToast,
    FailureShowToast,
};
