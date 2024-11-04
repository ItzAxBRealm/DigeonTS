/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_URL: string;
    readonly VITE_APPWRITE_POSTS_COLLECTION_ID: string;
    readonly VITE_APPWRITE_STORAGE_ID: string;
    readonly VITE_APPWRITE_DATABASE_ID: string;
    readonly VITE_APPWRITE_PROJECT_ID: string;
    readonly VITE_APPWRITE_SAVES_COLLECTION_ID: string;
    readonly VITE_APPWRITE_USER_COLLECTION_ID: string;
// Add other environment variables here...
}
  
interface ImportMeta {
    readonly env: ImportMetaEnv;
}