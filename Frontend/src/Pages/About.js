import { useContext, useEffect } from "react";
import Base from "../components/Base";
import userContext from "../context/userContext";
const About = ()=>{
    const context = useContext(userContext);

  useEffect(() => {
    // Fetch user data or perform any necessary initialization
    // ...

    // Example: Fetch user data
    // context.fetchUserData();
    }, []);
    console.log(context)
    return (
        <userContext.Consumer>
            {(contextValue)=>(
                <Base>
                    
                <h1>This is about page</h1>
                <p>we are building blog page</p>
                
                <h1>Welcome user: {contextValue.user && contextValue.user.data && contextValue.user.data.user ? contextValue.user.data.user.name : "Loading..."}</h1>
                {/* <h1>Welcome user: {contextValue.user?.data?.user?.name}  </h1> */}
            </Base>
            )}
            
        </userContext.Consumer>
    )
};

export default About;