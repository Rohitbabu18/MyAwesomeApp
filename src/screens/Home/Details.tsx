import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { useCallback, useMemo } from 'react'
import Post from './Post'
import { moderateScale, scale } from 'react-native-size-matters'
import Icons from '../../assets/icons'
import { ThemeType } from '../../components/theme'
import Fonts from '../../components/fonts'
import { useTheme } from '../../components/ThemeContext'

const Details = ({ navigation, route }: any) => {
  const { post } = route.params
  const { theme } = useTheme()

  const handleBack = useCallback(() => {
    navigation.goBack()
  }, [])

  const styles = useMemo(() => createStyles(theme), [theme])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Image source={Icons.back} style={styles.backImage} />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
      </View>
      <Post data={post} isDetails={true} />
    </View>
  )
}

export default Details

const createStyles = (theme: ThemeType) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.white
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: moderateScale(10),
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    fontSize: Fonts.fontSize.title,
    marginLeft: moderateScale(6),
    color: theme.text,
  },
  backImage: {
    width: scale(18),
    height: scale(18),
  }
})
