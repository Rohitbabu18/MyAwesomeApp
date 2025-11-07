import apiClient from './index';
import apiURLs from './apiURLs';
import apiStatus from './apiStatus';

export const fetchPosts = async () => {
    const { status, data } = await apiClient.get(apiURLs.getPost);
    if (status === apiStatus.success) return data;
    throw new Error('Failed to fetch posts');
};
