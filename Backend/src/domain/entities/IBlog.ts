export interface AddBlog {
    id?:string,
    userId?: string,
    title: string,
    category: string,
    description: string,
    image?:string,
}