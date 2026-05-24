import api from '@/lib/api'
//post the product 
export const createProduct=async()=>
{
    const res=await api.post('/api/admin/products')
    return res.data
}
//post the categories
export const createCategory=async(data:{
    name:string
})=>
{
    const res=await api.post('/api/admin/categories',data)
    return res.data
}
