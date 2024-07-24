import { useEffect } from "react";
import { useAuth } from "../store/auth";
import { useState } from "react";
import { Link } from "react-router-dom";

export const AdminContacts = ()=>{
    const [contactData, setContactData] = useState([]);
    const {authorizationToken} = useAuth();
    const getContactsData = async()=>{
        try{
            const response = await fetch("http://localhost:5000/api/admin/contacts",{
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                }
            });
            const data = await response.json();
            console.log("Contact data:", data);
            if(response.ok){
                setContactData(data);
            }

        }catch(error){
            console.log(error);
        }
    };


    useEffect(()=> {
        getContactsData();
    },[]);

    return (<> 
        <section className="admin-users-section">
            <div className="conatiner">
                <h1>Admin Contacts Data</h1>
            </div>
            <div className="container admin-users">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Message</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                    {contactData.map((curContact, index)=>{
                    return (<tr key={index}>
                        <td>{curContact.username}</td>
                        <td>{curContact.email}</td>
                        <td>{curContact.message}</td>
                        <td><button onClick={()=> deleteUser(curUser._id)}>Delete</button></td>
                    </tr>
                    );
                    })}
                    </tbody>
                </table>
            
            </div>
        </section>
        
         
        </>);
};