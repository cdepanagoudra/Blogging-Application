import { myAxios } from "./helper"

const loadAllCategories=()=>{
    return myAxios.get('/category/').then(response=>{
        return response.data
    })
}
export default loadAllCategories;