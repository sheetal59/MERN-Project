export const Home = () => {
    return <>
    <main>
        <section classname="section-hero">
            <div className="container grid grid-two-cols">
                <div className="hero-content">
                    <p>Medistats</p>
                    <h1>Early Signals, Lifelong Impact: Detecting Behavioural Disorders</h1>
                    <p>
                        Your child's health and happiness is our priority.
                        Get data driven insights for early disorder detection. Just answer simple questions about
                        your child's behvaiour and get to detect symptoms of ADHD, Dyslexia, Autism and many more 
                        at an early stage. Join us to make informed decisions and ensure a healthier, happier tomorrow.
                    </p>
                    <div className="btn btn-group">
                        <a href="/register"><button className="btn">Connect Now</button></a>
                        <a href="/register"><button className="btn secondary-btn">Learn More</button></a>
                    </div>
                </div>

                {/* hero images  */}
            <div className="hero-image">
              <img
                src="/images/home.png"
                alt="coding together"
                width="400"
                height="500"
              />
            </div>
          </div>
        </section>


      {/* 2nd section  */}
      <section className="section-analytics">
        <div className="container grid grid-four-cols">
            <div className="div1">
                <h2>50+</h2>
                <p>Registered Child Psycologist</p>
            </div>
            <div className="div1">
                <h2>5</h2>
                <p>Early Detection Tests</p>
            </div>
            <div className="div1">
                <h2>100+</h2>
                <p>Happy Parents</p>
            </div>
            <div className="div1">
                <h2>10+</h2>
                <p>Brain Activity Games</p>
            </div>
        </div>

      </section>

      {/* 3rd section  */}
      <section className="section-hero">
        <div className="container grid grid-two-cols">
          {/* hero images  */}
          <div className="hero-image">
            <img
              src="/images/activity.jpg"
              alt="coding together"
              width="400"
              height="500"
            />
          </div>

          <div className="hero-content">
            <p>We are here to help you</p>
            <h1>Get Started Today</h1>
            <p>
              Ready to take the first step towards a more efficient and secure
              IT infrastructure? Contact us today for a free consultation and
              let's discuss how Thapa Technical can help your business thrive in
              the digital age.
            </p>
            <div className="btn btn-group">
              <a href="/contact">
                <button className="btn">connect now</button>
              </a>
              <a href="/services">
                <button className="btn secondary-btn">learn more</button>
              </a>
            </div>
          </div>
        </div>
        </section>
    </main>
    
    </>;

}; 
