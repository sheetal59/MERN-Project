import { useAuth } from "../store/auth";

export const Service = () => {
    const { services } = useAuth();
    console.log(services);
    return (
        <section className="section-services">
            <div className="container">
                <h1 className="main-heading">Services</h1>
            </div>
            <div className="container grid grid-three-cols">

               {
                services.map((curElem,index)=>{
                    const {name, age_group, levels, description}= curElem;

                    return(
                    <div className="card" key={index}>
                    <div className="card-img">
                        <img src="/images/service5.jpeg" alt="" width="300" height="200" />
                    </div>
                    <div className="card-details">
                        <div className="grid grid-two-cols">
                            <p>Levels: {levels}</p>
                            <p>Age Group: {age_group}</p>
                        </div>
                        <h2>{name}</h2>
                        <p>{description}</p>
                    </div>
                    </div>
                    );
                })};
                
            </div>
        </section>
    );

};