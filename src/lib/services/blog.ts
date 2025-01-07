import api from "../axios";
import { BlogFormData } from "../validations/blog";


export async function getBlogs(){
    const response = await api.get("/blogs")
    return response.data
}

export async function getBlogById(id: string) {
    const response = await api.get(`/blogs${id}`)
    return response.data
}

export async function createBlog(data:BlogFormData){
    const formData = new FormData()
    formData.append('title', data.title)
    formData.append('content', data.content)
    if(data.image?.url){
        formData.append('imageUrl', data.image.url)
        formData.append('imageId', data.image.public_id)
    }
    
    const response = await api.post('/blogs', formData, {
        headers: {
            'Content-Type' : 'multipart/form-data'
        }
    })

    return response.data
}
export async function updateBlog(id: string, data: BlogFormData){
    const formData = new FormData()
    formData.append('title', data.title)
    formData.append('content', data.content)
    if(data.image?.url){
        formData.append('imageUrl', data.image.url)
        formData.append('imageId', data.image.public_id)
    }

    const response  = await api.put(`/blogs/${id}`, formData, {
        headers: {
            'Content-Type' : 'multipart/form-data'
        }
    })
    return response.data
}