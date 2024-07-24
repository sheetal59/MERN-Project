import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

export const AdminUpdate = () =>{
    const [data, setData] = useState({
        username:"",
        email:"",
        phone:"",
    });
    const params = useParams();
    const {authorizationToken} = useAuth();

    const getSingleUserData = async()=>{
        const response = await fetch(`http://localhost:5000/api/admin/users/${params.id}`,{
            method : "GET",
            headers: {
                Authorization : authorizationToken,
            },
        });
        const data = await response.json();
            console.log(`single user data: ${data}`);
        setData(data);
          
    };
    useEffect(()=>{
        getSingleUserData();
    },[]);

    const handleInput = (e)=> {
        let name = e.target.name;
        let value = e.target.value;

        setData({
            ...data,
            [name]:value,
        });
    };

    //to update the data dynamically
    const handleSubmit = async(e)=>{
        e.preventDefault();

        try{
            const response = await fetch(`http://localhost:5000/api/admin/users/update/${params.id}`,{
                method : "PATCH",
                headers: {
                    "Content-Type" : "application/json",
                    Authorization : authorizationToken,
                },
                body: JSON.stringify(data),
                });
            if(response.ok){
                toast.success("Updated Successfully");
            }else{
                toast.error("Couldn't able to process the request");
            }
                
        }catch(error){
        console.log(error);
    }
    };

    return <>
    <section>
        <main>
            <div className="section-contact">
                <div className="container grid grid-two-cols">
                    <div className="contact-form">
                        <h1 className="main-heading mb-3">Update User Data</h1>
                        <br/>

                        <form onSubmit={handleSubmit}>
                        <div>
                                <label htmlFor="username">username</label>
                                <input type="text" name="username"
                                placeholder="username" id="username" 
                                required 
                                autoComplete="off"
                                value = {data.username}
                                onChange={handleInput}
                                autoCapitalize="off"
                                />


                            </div>
                            <div>
                                <label htmlFor="email">email</label>
                                <input type="text" name="email"
                                placeholder=" enter your email" id="email" 
                                required autoComplete="off"
                                value = {data.email}
                                onChange={handleInput} />
                            </div>
                            <div>
                                <label htmlFor="phone">Mobile Number</label>
                                <input type="text" name="phone"
                                placeholder=" enter your phone" id="phone" 
                                required autoComplete="off"
                                value = {data.phone}
                                onChange={handleInput} />
                            </div>
                            
                            <br/>
                            <button type="submit" className="btn btn-submit">
                                Update
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    </section>
    </>
};