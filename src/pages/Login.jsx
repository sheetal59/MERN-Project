import { useState  } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";




const URL = "http://localhost:5000/api/auth/login";

export const Login = () => {
    const[user, setUser] = useState({
        email:"",
        password:"",
    });
//handling the input
const handleInput = (e) => {
    console.log(e);
    let name = e.target.name;
    let value = e.target.value;

    setUser({
        ...user,
        [name]: value,

    });
};
const navigate = useNavigate();
const {storetokenInLS} = useAuth();
//handling the form submission
const handleSubmit = async (e) =>{
    e.preventDefault();
    
    try{
        const response =  await fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });
        console.log("login",response);
        const res_data = await response.json();
        if(response.ok){
            
            //store token in local storage
            storetokenInLS(res_data.token);
            console.log("response from server", res_data);
            toast.success("Login SuccessFull");
            setUser({email:"", password:""});
            navigate("/");
        }
        else{
            toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
            console.log('Invalid Credentials');
        }
        console.log(response);
    }catch(error){
        console.log(error);
    }


};
    return <>
    <section>
        <main>
            <div className="section-registration">
                <div className="container grid grid-two-cols">
                    <div className="registration-image">
                        <img src="/images/login.jpg" alt="register " width="450" height="500" />
                    </div>
                    <div className="registration-form">
                        <h1 className="main-heading mb-3">Login Form</h1>
                        <br/>

                        <form onSubmit= {handleSubmit}>
                            <div>
                                <label htmlFor="email">email</label>
                                <input type="text" name="email"
                                placeholder=" enter your email" id="email" 
                                required autoComplete="off"
                                value = {user.email}
                                onChange={handleInput} />
                            </div>
                            <div>
                                <label htmlFor="password">password</label>
                                <input type="password" name="password"
                                placeholder="password" id="password" 
                                required autoComplete="off"
                                value= {user.password}
                                onChange={handleInput}
                                />
                            </div>
                            <br/>
                            <button type="submit" className="btn btn-submit">
                                Register Now
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    </section>
    
    </>;

};