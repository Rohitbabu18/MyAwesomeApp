import {
  RefreshControl,
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, { useCallback, useEffect, useMemo, useState, useRef } from 'react';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { useTheme } from '../../components/ThemeContext';
import { ThemeType } from '../../components/theme';
import Fonts from '../../components/fonts';
import Toast from '../../components/toast/Toast';
import Post from './Post';
import { PostTypes, RenderPostTypes } from './Types';
import { fetchPosts } from '../../services/postService';
import useDebounce from '../../components/debounce';
import Icons from '../../assets/icons';

const Home = ({ navigation }: any) => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyle(theme), [theme]);
  const searchInputRef = useRef<TextInput>(null);

  const [posts, setPosts] = useState<PostTypes[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<PostTypes[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');

  const handleNewsData = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchPosts();
      setPosts(data);
      setFilteredPosts(data);
    } catch (error: any) {
      const message = error?.message || 'Something went wrong...';
      Toast.FailureShowToast(message, theme);
    } finally {
      setLoading(false);
    }
  }, [theme]);

  useEffect(() => {
    handleNewsData();
  }, [handleNewsData]);

  const onRefresh = useCallback(async () => {
    try {
      setRefreshing(true);
      await handleNewsData();
      setSearch('');
    } finally {
      setRefreshing(false);
    }
  }, [handleNewsData]);

  const onPostCallback = useCallback((postData: PostTypes) => {
    navigation.navigate('Details', { post: postData });
  }, [navigation]);

  const renderItem = useCallback(
    ({ item }: RenderPostTypes) => (
      <Post data={item} onPostCallback={onPostCallback} />
    ),
    [onPostCallback]
  );

  const listEmpty = useCallback(
    () => (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No Data Found</Text>
      </View>
    ),
    [styles]
  );

  const onFilter = useDebounce((value: string) => {
    const filtered = posts.filter((item) =>
      item.title.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredPosts(filtered);
  }, 500);

  const searchTextChange = useCallback(
    (value: string) => {
      setSearch(value);
      if (value.trim() === '') {
        setFilteredPosts(posts);
      } else {
        onFilter(value);
      }
    },
    [posts, onFilter]
  );

  const clearSearch = useCallback(() => {
    setSearch('');
    setFilteredPosts(posts);
    searchInputRef.current?.focus();
  }, [posts]);

  const listHeaderComponent = useCallback(
    () => (
      <>
        <Text style={styles.homeFeed}>Home Feed</Text>
        {loading && !refreshing && (
          <View style={styles.activityIndicator}>
            <ActivityIndicator size="large" color={theme.primary} />
          </View>
        )}
      </>
    ),
    [loading, refreshing, styles, theme.primary]
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      {listHeaderComponent()}
      <View style={[styles.searchContainer, { backgroundColor: theme.white }]}>
        <Image source={Icons.search} style={styles.searchImage} tintColor={theme.textGray} />
        <TextInput
          ref={searchInputRef}
          placeholder="Search by title..."
          placeholderTextColor={theme.textGray}
          style={styles.searchInput}
          value={search}
          onChangeText={searchTextChange}
        />
        {search && (
          <TouchableOpacity onPress={clearSearch}>
            <Image source={Icons.close} style={styles.closeImage} tintColor={theme.textGray} />
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={filteredPosts}
        keyExtractor={(item, index) => item.id + '_' + index.toString()}
        renderItem={renderItem}
        removeClippedSubviews={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['blue']}
          />
        }
        ListEmptyComponent={listEmpty}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      />
    </KeyboardAvoidingView>
  );
};

export default Home;

const createStyle = (theme: ThemeType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.white,
    },
    activityIndicator: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: moderateScale(10),
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: moderateScale(50),
    },
    emptyText: {
      textAlign: 'center',
      fontSize: Fonts.fontSize.normalText,
      color: theme.textGray,
    },
    homeFeed: {
      margin: scale(20),
      color: theme.text2,
      fontSize: Fonts.fontSize.bigText,
    },
    searchContainer: {
      marginHorizontal: scale(20),
      marginVertical: verticalScale(10),
      borderRadius: moderateScale(30),
      paddingHorizontal: moderateScale(12),
      paddingVertical: moderateScale(4),
      shadowColor: theme.text,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 3,
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
      gap: scale(5)
    },
    searchInput: {
      fontSize: Fonts.fontSize.normalText,
      color: theme.text,
      flex: 1,
    },
    clearText: {
      fontSize: Fonts.fontSize.mediumText,
      color: theme.blue,
    },
    searchImage: {
      width: scale(18),
      height: scale(18),
      resizeMode: 'contain'
    },
    closeImage: {
      width: scale(14),
      height: scale(14),
      resizeMode: 'contain'
    }
  });