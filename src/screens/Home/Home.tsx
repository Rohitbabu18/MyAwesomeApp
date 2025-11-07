import {
  RefreshControl,
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { moderateScale, scale } from 'react-native-size-matters';
import apiClient from '../../services';
import apiURLs from '../../services/apiURLs';
import apiStatus from '../../services/apiStatus';
import { PostTypes, RenderPostTypes } from './Types';
import Post from './Post';
import { useTheme } from '../../components/ThemeContext';
import { ThemeType } from '../../components/theme';
import Toast from '../../components/toast/Toast';
import Fonts from '../../components/fonts';
import { fetchPosts } from '../../services/postService';

const Home = ({ navigation }: any) => {
  const { theme } = useTheme()
  const styles = useMemo(() => createStyle(theme), [theme])

  const [post, setPost] = useState<PostTypes[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const handleNewsData = useCallback(async () => {
    try {
      setLoading(true)
      const data = await fetchPosts();
      setPost(data);
    } catch (error: any) {
      const message = error?.message || "Something went wrong...";
      Toast.FailureShowToast(message, theme)
    }
    finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    handleNewsData();
  }, [handleNewsData]);


  const onRefresh = useCallback(async () => {
    try {
      setRefreshing(true);
      await handleNewsData();
    } finally {
      setRefreshing(false);
    }
  }, []);

  const onPostCallback = useCallback((postData: PostTypes) => {
    navigation.navigate("Details", { post: postData })
  }, [])

  const renderItem = useCallback(({ item, index }: RenderPostTypes) => {
    return <Post data={item} onPostCallback={onPostCallback} />
  }, [])

  const listEmpty = useCallback(() => {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No Data Found</Text>
      </View>
    )
  }, [])

  const listHeaderComponent = useCallback(() => {
    return (
      <View>
        <Text style={styles.homeFeed}>Home Feed</Text>
        {loading && !refreshing && <View style={styles.activityIndicator}>
          <ActivityIndicator size="large" color={theme.primary} />
        </View>}
      </View>
    )
  }, [loading, refreshing])

  return (
    <View style={styles.container}>
      <FlatList
        data={post}
        keyExtractor={(item, index) => item.id + "_" + index.toString()}
        renderItem={renderItem}
        removeClippedSubviews={false}
        ListHeaderComponent={listHeaderComponent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['blue']}
          />
        }
        ListEmptyComponent={listEmpty}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Home;

const createStyle = (theme: ThemeType) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.white,
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: Fonts.fontSize.normalText,
    color: theme.textGray,
  },
  homeFeed: {
    margin: scale(20),
    color: theme.text2,
    fontSize: Fonts.fontSize.bigText
  }
});
