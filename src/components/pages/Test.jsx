import React from 'react'
import '../../assets/css/custom.css'

const Test = () => {
  return (
    <>
    <div>
     
    <div class="nav-btn">
        <label for="nav-check"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg></label>
    </div>
    <input type="checkbox"  id="nav-check" />
    <label for="nav-check" class="overlay"></label>

    <nav class="navbar">
        <div class="navbar-header">
            <h3>TFC NATION</h3>
            <img src="Images/tfc.png" alt="TFC"/>
            <span class="nav-close">
                <label for="nav-check"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg></label>
            </span>
        </div>
        <ul class="nav-items">
            <li><a href="#header" class="nav-link">Home</a></li>
            <li><a href="#features" class="nav-link">Features</a></li>
            <li><a href="#about" class="nav-link">About</a></li>
            <li><a href="#products" class="nav-link">Products</a></li>
            <li><a href="#contact" class="nav-link">Contact</a></li>
        </ul>
    </nav>

                {/* <!--Header--> */}

    {/* <header class="header" id="header">
        <div class="banner">
            <h2>Discover The Sceret To Taste</h2>
            <h1>Tender Fried Chicken</h1>
            <a href="#" class="btn banner-btn">View more</a>
        </div>
    </header> */}

    <div className="content-divider"></div>

              {/* <!--Features--> */}

    <section class="features clearfix" id="features">
        <div class="feature">
            <span class="feature-icon"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M640-440 474-602q-31-30-52.5-66.5T400-748q0-55 38.5-93.5T532-880q32 0 60 13.5t48 36.5q20-23 48-36.5t60-13.5q55 0 93.5 38.5T880-748q0 43-21 79.5T807-602L640-440Zm0-112 109-107q19-19 35-40.5t16-48.5q0-22-15-37t-37-15q-14 0-26.5 5.5T700-778l-60 72-60-72q-9-11-21.5-16.5T532-800q-22 0-37 15t-15 37q0 27 16 48.5t35 40.5l109 107ZM280-220l278 76 238-74q-5-9-14.5-15.5T760-240H558q-27 0-43-2t-33-8l-93-31 22-78 81 27q17 5 40 8t68 4q0-11-6.5-21T578-354l-234-86h-64v220ZM40-80v-440h304q7 0 14 1.5t13 3.5l235 87q33 12 53.5 42t20.5 66h80q50 0 85 33t35 87v40L560-60l-280-78v58H40Zm80-80h80v-280h-80v280Zm520-546Z"/></svg></span>
            <h4 class="feature-title">Made With Love</h4>
            <p class="feature-text">Discover hertfelt hospitality in our cozy ,lovingly accomodations</p>
        </div>
        <div class="feature">
            <span class="feature-icon"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M280-80v-366q-51-14-85.5-56T160-600v-280h80v280h40v-280h80v280h40v-280h80v280q0 56-34.5 98T360-446v366h-80Zm400 0v-320H560v-280q0-83 58.5-141.5T760-880v800h-80Z"/></svg></span>
            <h4 class="feature-title">Taste</h4>
            <p class="feature-text">Savor thr love in every bite of our exquisite,crafted cuisine</p>
        </div>
        <div class="feature">
            <span class="feature-icon"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M160-120v-80h640v80H160Zm160-160q-66 0-113-47t-47-113v-400h640q33 0 56.5 23.5T880-760v120q0 33-23.5 56.5T800-560h-80v120q0 66-47 113t-113 47H320Zm0-80h240q33 0 56.5-23.5T640-440v-320H240v320q0 33 23.5 56.5T320-360Zm400-280h80v-120h-80v120ZM320-360h-80 400-320Z"/></svg></span>
            <h4 class="feature-title">Energy</h4>
            <p class="feature-text">Feel the vibrant energy and warmth in our welcoming , lively atmosphere</p>
        </div>
        <div class="feature">
            <span class="feature-icon"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M400-160h160v-44l50-20q65-26 110.5-72.5T786-400H174q20 57 65 103.5T350-224l50 20v44Zm-80 80v-70q-107-42-173.5-130T80-480h80v-320l720-80v60l-460 52v68h460v60H420v160h460q0 112-66.5 200T640-150v70H320Zm0-620h40v-62l-40 5v57Zm-100 0h40v-50l-40 4v46Zm100 220h40v-160h-40v160Zm-100 0h40v-160h-40v160Zm260 80Z"/></svg></span>
            <h4 class="feature-title">Family recepie</h4>
            <p class="feature-text">Enjoy our family recepies, lovingly crafted for a taste of tradition</p>
        </div>
    </section>

    {/* <!--------about-------> */}

    <section class="about" id="about">
        <div class="section-center clearfix">
            <div class="about-img">
                <div class="about-picture-container">
                    <img src="Images/about.jpg" alt="TFC" class="about-picture"/>
                </div>
            </div>
            <div class="about-info">
                <div class="section-title">
                    <h3>About Us</h3>
                    <h2>TFC Nation</h2>
                </div>
                <p class="about-text">Discover a haven of luxury and relaxation in our meticulously designed rooms and suites, ensuring a serene and memorable stay.</p>
                <p class="about-text">Our hotel combines modern elegance with personalized service, offering amenities tailored to both leisure and business travelers, ensuring every guest enjoys a seamless and enjoyable experience.</p>
                <a href="#" class="btn">Learn More</a>
            </div>
        </div>
    </section>

    {/* <!----------Products---------> */}

    <section class="products" id="products">
        <div class="section-center clearfix">
            <div class="product-info">
                <div class="section-title">
                    <h3>Check Out</h3>
                    <h2>Our Recepie</h2>
                </div>
                <p class="product-text">Indulge in our culinary delights where every dish is meticulously prepared with passion and expertise, showcasing the finest ingredients and flavors. From comforting classics to innovative creations, our recipes embody a commitment to excellence, ensuring each dining experience is unforgettable and filled with delight.</p>
            <a href="#" class="btn">Learn more</a>
            </div>
            <div class="product-inventory clearfix">
                <div class="product">
                    <img src="Images/grill chicken.jpg" alt="Product" class="product-img"/>
                    <h4 class="product-title">Grill Chicken</h4>
                    <h4 class="product-price">$ 350</h4>
                </div>
                <div class="product">
                    <img src="Images/veggie chicken.jpg" alt="Product" class="product-img"/>
                    <h4 class="product-title">Veggie Chicken</h4>
                    <h4 class="product-price">$ 250</h4>
                </div>
                <div class="product">
                    <img src="Images/garlic chicken.jpg" alt="Product" class="product-img"/>
                    <h4 class="product-title">Garlic Chicken</h4>
                    <h4 class="product-price">$ 300</h4>
                </div>
            </div>
        </div>
    </section>

    {/* <!--------Services-------> */}

    <section class="services" id="services">
        <div class="section-title services-title">
            <h3>Explore</h3>
            <h2>Our Services</h2>
        </div>
        <div class="section-center clearfix">
            <div class="service-card">
                <div class="service-img-container">
                    <img src="Images/service1.jpg" alt="" class="service-img"/>
                    <span class="service-icon"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M640-80q-100 0-170-70t-70-170q0-100 70-170t170-70q100 0 170 70t70 170q0 100-70 170T640-80Zm0-80q66 0 113-47t47-113q0-66-47-113t-113-47q-66 0-113 47t-47 113q0 66 47 113t113 47Zm-480 0q-33 0-56.5-23.5T80-240v-304q0-8 1.5-16t4.5-16l80-184h-6q-17 0-28.5-11.5T120-800v-40q0-17 11.5-28.5T160-880h280q17 0 28.5 11.5T480-840v40q0 17-11.5 28.5T440-760h-6l66 152q-19 10-36 21t-32 25l-84-198h-96l-92 216v304h170q5 21 13.5 41.5T364-160H160Zm480-440q-42 0-71-29t-29-71q0-42 29-71t71-29v200q0-42 29-71t71-29q42 0 71 29t29 71H640Z"/></svg></span>
                </div>
                <div class="service-info">
                    <h4>Custom Recepies</h4>
                    <p>Experience our bespoke menu, crafted with care and passion for a distinctive culinary journey.</p>
                    <a href="#" class="btn service-btn">Read more</a>
                </div>
            </div>
            <div class="service-card">
                <div class="service-img-container">
                    <img src="Images/service2.jpg" alt="" class="service-img"/>
                    <span class="service-icon"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M680-600h80v-80h-80v80Zm0 160h80v-80h-80v80Zm0 160h80v-80h-80v80Zm0 160v-80h160v-560H480v56l-80-58v-78h520v720H680Zm-640 0v-400l280-200 280 200v400H360v-200h-80v200H40Zm80-80h80v-200h240v200h80v-280L320-622 120-480v280Zm560-360ZM440-200v-200H200v200-200h240v200Z"/></svg></span>
                </div>
                <div class="service-info">
                    <h4>Home Delivery</h4>
                    <p>Convenient home delivery for our delecious menu, ensuring fresh flavours delivered to your doorstep.</p>
                    <a href="#" class="btn service-btn">Read more</a>
                </div>   
            </div>
            <div class="service-card">
                <div class="service-img-container">
                    <img src="Images/service3.jpg" alt="" class="service-img"/>
                    <span class="service-icon"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M120-360q-33 0-56.5-23.5T40-440v-360q0-33 23.5-56.5T120-880h720q33 0 56.5 23.5T920-800v360q0 33-23.5 56.5T840-360H120Zm0-440v360h720v-360H120Zm3 580-3-60 719-38 3 60-719 38Zm-3 99v-60h720v60H120Zm290-379q74 0 142.5-26T672-606q6 42 44 64t84 22v-200q-46 0-84 22.5T672-632q-53-52-120.5-80T410-740q-79 0-152 27.5T140-620q45 65 118 92.5T410-500ZM120-800v360-360Z"/></svg></span>
                </div>
                <div class="service-info"> 
                    <h4>Tender Chicken</h4>
                    <p>Tender chicken, expertly prepared to perfection for a delectable dining experience.</p>
                    <a href="#" class="btn service-btn">Read more</a>
                </div>  
            </div>
        </div>
    </section>

    {/* <!---------Contact---------> */}

    <section class="contact" id="contact">
        <div class="section-center clearfix">
            <div class="contact-info">
                <div class="contact-item">
                    <h4 class="contact-title">
                        <span class="contact-icon"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z"/></svg></span>
                        Address
                    </h4>
                    <div class="contact-text">123,cherry road salem <br/>pincode - 641669</div>
                </div>
                <div class="contact-item">
                    <h4 class="contact-title">
                        <span class="contact-icon"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z"/></svg></span>
                        Email
                    </h4>
                    <div class="contact-text">srinataraj1521@gmail.com</div>
                </div>
                <div class="contact-item">
                    <h4 class="contact-title">
                        <span class="contact-icon"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M798-120q-125 0-247-54.5T329-329Q229-429 174.5-551T120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12ZM241-600l66-66-17-94h-89q5 41 14 81t26 79Zm358 358q39 17 79.5 27t81.5 13v-88l-94-19-67 67ZM241-600Zm358 358Z"/></svg></span>
                        Telephone
                    </h4>
                    <div class="contact-text">9952208813</div>
                </div>
            </div>
            <div class="contact-form">
                <h3>Contact Us</h3>
                <form action="#">
                    <div class="form-group">
                        <input type="text" class="form-control" required />
                        <label for="" class="form-label">Name</label>
                    </div>
                    <div class="form-group">
                        <input type="email" class="form-control" required />
                        <label for="" class="form-label">Email</label>
                    </div>
                    <div class="form-group">
                        <textarea  class="form-control" required></textarea>
                        <label for="" class="form-label">Message</label>
                    </div>
                    <button class="btn submit-btn">Send Message</button>
                </form>
            </div>
        </div>
    </section>

    {/* <!---------Footer-----> */}

    <footer class="footer">
        <div class="section-center">
            <div class="social-icons">
                <a href="#" class="social-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-instagram" viewBox="0 0 16 16"><path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/></svg></a>
                <a href="#" class="social-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-twitter-x" viewBox="0 0 16 16"><path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"/></svg></a>
                <a href="#" class="social-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-facebook" viewBox="0 0 16 16"><path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"/></svg></a>
            </div>
            <h4 class="footer-text">&copy; 2024 
                <span class="company">TFC Nation</span>
                all rights reserved
            </h4>
        </div>
    </footer>

    </div>
    </>
  )
}

export default Test
