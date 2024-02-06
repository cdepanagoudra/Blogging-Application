//isLoggedIn=>

export const isLoggedIn=()=>{
    let data = localStorage.getItem("data");
    //console.log(data);
    if(data==null){
        return false;
    }else{
        return true;
    }
};

//doLogin=> data=> set to localstorage

export const doLogin = (data,next) =>{
    localStorage.setItem("data", JSON.stringify(data));
    next()
};
//doLogout=> remove from localstorage

export const doLogout=(next)=>{
    localStorage.removeItem("data");
    next()
};

//get current user
export const getCurrentUserDetail=()=>{
    if(isLoggedIn()){
        return JSON.parse(localStorage.getItem("data"))?.user;
    } else {
        return undefined;
    }
};

export const getToken=()=>{
    if(isLoggedIn()){
        return JSON.parse(localStorage.getItem("data")).token
    }else{
        return null;
    }
}