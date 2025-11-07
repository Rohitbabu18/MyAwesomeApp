import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo, useCallback, useMemo } from 'react'
import { PostProps } from './Types'
import Fonts from '../../components/fonts'
import { scale, verticalScale } from 'react-native-size-matters';
import { useTheme } from '../../components/ThemeContext';
import { ThemeType } from '../../components/theme';

const Post = ({ data, isDetails, onPostCallback }: PostProps) => {
    const { theme } = useTheme()
    const styles = useMemo(() => createStyle(theme), [theme])

    const onPostPress = useCallback(() => {
        onPostCallback?.(data);
    }, [onPostCallback, data]);

    return (
        <TouchableOpacity activeOpacity={0.8} onPress={onPostPress} style={[styles.postContainer, { backgroundColor: theme.white }]}>
            <Text numberOfLines={isDetails ? undefined : 1} style={styles.title}>{data.title}</Text>
            <Text numberOfLines={isDetails ? undefined : 2} style={styles.description}>{data.body}</Text>
        </TouchableOpacity>
    )
}

export default memo(Post)

const createStyle = (theme: ThemeType) => StyleSheet.create({
    postContainer: {
        marginHorizontal: scale(20),
        marginVertical: verticalScale(5),
        padding: scale(12),
        borderRadius: scale(8),
        backgroundColor: theme.white,
        shadowColor: theme.text,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    title: {
        fontSize: Fonts.fontSize.title,
        color: theme.text,
        marginBottom: verticalScale(5),
    },
    description: {
        fontSize: Fonts.fontSize.normalText,
        color: theme.textGray
    },
})