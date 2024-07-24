import { useState  } from "react";
import { useAuth } from "../store/auth";

const defaultContactFormData = {
    username: "",
    email: "",
    message: "",
  };
  
  // type UserAuth = boolean;
  export const Contact = () => {
    const [data, setData] = useState(defaultContactFormData);
  
    const { user } = useAuth();
  
    console.log("frontend user ", user.email);
  
    const [userData, setUserData] = useState(true);
    
    if(userData && user){
        setData({
            username: user.username,
            email: user.email,
            message:"",
        });
        setUserData(false);
    }
     
//handling the input
const handleInput =  (e) => {
   // console.log(e);
    const name = e.target.name;
    const value = e.target.value;

    setData((prev)=> ({...prev, [name]: value}));
};
//handling the form submission
const handleContactForm = async (e) =>{
    e.preventDefault();

   try{
        const response = await fetch("http://localhost:5000/api/form/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(Contact),
        });
        console.log("response:", response);
        if(response.ok){
            setData(defaultContactFormData);
            const responseData = await response.json();
            alert(responseData);
            console.log(responseData);
        }else{
            console.error("API Error:", response.status, response.statusText);
        }

   }catch(error){
    console.error(error);
   }
};
    return <>
    <section>
        <main>
            <div className="section-contact">
                <div className="container grid grid-two-cols">
                    <div className="contact-image">
                        <img src="/images/contact.png" alt="contact us " width="450" height="500" />
                    </div>
                    <div className="contact-form">
                        <h1 className="main-heading mb-3">Contact Us</h1>
                        <br/>

                        <form onSubmit= {handleContactForm}>
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
                                <label htmlFor="message">message</label>
                                <textarea name="message"
                                placeholder="message" id="message" 
                                required autoComplete="off"
                                value= {data.message}
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