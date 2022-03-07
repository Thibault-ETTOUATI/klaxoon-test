export enum MediaType {
    PHOTO = 'photo',
    VIDEO = 'video',
}

export type Bookmark = {
    id: number
    author_name: string
    title: string
    type: MediaType
    url: string
    duration?: number
    height?: number
    width?: number
    thumbnail_url?: string
    thumbnail_url_with_play_button?: string
    upload_date?: string
    upload_date_on_app?: number
    error?: string
};

