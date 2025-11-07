export interface PostTypes {
    id: number,
    userId: number,
    title: string,
    body: string
}

export interface RenderPostTypes {
    item: PostTypes,
    index: number
}

export interface PostProps {
    data: PostTypes,
    isDetails?: boolean,
    onPostCallback?: (value: PostTypes) => void
}