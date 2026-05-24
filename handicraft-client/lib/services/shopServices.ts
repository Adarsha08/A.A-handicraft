import api from '../api'
//getiing the categories from the backend 
export const getAllCategories=async()=>
{
    const res=await api.get('/api/shop/categories')
    return res.data
}
//getting the products from the backend 
export const getAllProducts=async()=>
{
    const res=await api.get('/api/shop/products')
    return res.data
}