import { useContext, useEffect, useState } from "react";
import Base from "../components/Base";
import userContext from "../context/userContext";
import { getCurrentUserDetail } from "../auth";
const Services = () => {
    //const userContextData = useContext(userContext)
  return (
    <userContext.Consumer>
      {(object) =>
         (
          <Base>
            <h1>This is services page</h1>
            <p>we are building blog page</p>
            {/* {console.log(userContextData)}
            {console.log(object)} */}

            <h1>Welcome user: {object.user && object.user.data && object.user.data.user ? object.user.data.user.name : "Loading..."}</h1>
          </Base>
        )
      }
    </userContext.Consumer>
  );
};

export default Services;
