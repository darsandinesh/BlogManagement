interface BlogUser {
    name: string;
    profileImage: string;
}

export interface Blog {
    title: string;
    image: string;
    description: string;
    user: BlogUser;
    category: string;
}

export interface BlogCards {
    blogs: Blog[];
}

export interface EditBlog {
    id: string;
    title: string;
    description: string;
    category: string;
    images: string[];
}

interface BlogUserData {
    username: string;
    avatar: string;
}

export interface blogData {
    _id?: string;
    title: string;
    image: string;
    description: string;
    category: string;
    userId: BlogUserData;
    username?: string;
    createdAt?: Date;
}