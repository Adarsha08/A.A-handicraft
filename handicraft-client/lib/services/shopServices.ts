import api from '../api'
//getiing the categories from the backend 
export const getAllCategories=async()=>
{
    const res=await api.get('/shop/categories')
    return res.data
}
//getting the products from the backend 
export const getAllProducts=async()=>
{
    const res=await api.get('/shop/products')
    return res.data
}