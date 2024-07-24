//context api
//in react context is a feature that allows you to share state data between components without explicitily passing the data through each level of compenent tree.
//its a way to manage global state or share data bweteen components that are not directly connected.

import { createContext, useContext, useEffect, useState } from "react";
export const AuthContext = createContext();

//provider component is reposnible for providing the data context to its descendents
//the value prop of the provider is crucial because it's where you define the data that you want to make accessible
//to component that consume the context
// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const[user, setUser] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const[services, setServices ] = useState("");
  const authorizationToken = `Bearer ${token}`;

  //function to stored the token in local storage
  const storetokenInLS = (serverToken) => {
    setToken(serverToken);
    return localStorage.setItem("token", serverToken);
  };

  let isLoggedIn = !! token;
  console.log("isLoggedIn" , isLoggedIn);

//tackling the logout functionality
const LogoutUser = () => {
  setToken("");
  return localStorage.removeItem("token");

};
//to fetch the services data from the database
const getServices = async()=>{
  try{
    const response = await fetch("http://localhost:5000/api/data/service",
      {
        method:"GET",
      });
    if(response.ok){
      const data  = await response.json();
      console.log(data.msg);
      setServices(data.msg);
    }
  }catch(error){
    console.log(`services frontend error ${error}`);
  };
};


useEffect(()=> {
  getServices();
  userAuthentication();
},[]);
//Authentication jwt to get the user data logged in
const userAuthentication = async () => {
  setIsLoading(true);
  try{
      const response = await fetch("http://localhost:5000/api/auth/user",
        {
          method: "GET",
          headers: {
              Authorization: authorizationToken,
          },
        });
        if(response.ok){
          const data = await response.json();
          //console.log("user data", data.userData);
          setUser(data.userData);
          setIsLoading(false);
        }
        else{
          setIsLoading(false);
        }
  }catch(error){
    console.error("Error fetching user data");
  }
};



  return (
    <AuthContext.Provider value={{ isLoggedIn, storetokenInLS, LogoutUser, user, services, authorizationToken, isLoading}}>
      {children}
    </AuthContext.Provider>
  );
};
//consumer
export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the Provider");
  }
  return authContextValue;
};
