import React, { useEffect, useState } from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap'
import loadAllCategories from '../Services/category-service'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
function CategorySideMeny() {
    const [categories,setCategories] = useState([])

    useEffect(()=>{
        loadAllCategories().then(data=>{
            //console.log(data)
            setCategories([...data])
        }).catch(error=>{
            //console.log(error);
            toast.error("Error in loading error")
        })
    },[])
  return (
    <div>
        <ListGroup>
            <ListGroupItem tag={Link} to="/" action={true} className='border-0'>
                All Blogs
            </ListGroupItem>   
            {categories && categories.map((cat,index)=>{
                return (
                    <ListGroupItem tag={Link} to={'/categories/'+cat.id} key={index} action={true} className='border-0 shadow mt-1'>
                        {cat.title}
                    </ListGroupItem>
                )
            })} 
        </ListGroup>
    </div>
  )
}

export default CategorySideMeny