// src/pages/Home.jsx
import React from "react";
import bg1 from "../assets/images/header/bg1.jpg";
import blog1 from "../assets/images/blog/01_blog.jpg";
import blog2 from "../assets/images/blog/02_blog.jpg";
import blog3 from "../assets/images/blog/03_blog.jpg";
import aboutImg from "../assets/images/about/01_about.jpg";
// import logo from "../assets/images/logo/mainlogo.png";
import product1 from "../assets/images/products/product1.jpg";
import product2 from "../assets/images/products/product2.jpg";
import product3 from "../assets/images/products/product3.jpg";



const Home = () => {
    const blogPosts = [
  {
    img: blog1,
    category: ["Eggs", "Tips"],
    date: "Feb 10, 2025",
    title: "How to Store Eggs Fresh for Longer",
    desc: "Learn the best methods for storing eggs to keep them fresh, safe, and nutritious whether for wholesale or retail customers.",
    link: "01_blog.html",
  },
  {
    img: blog2,
    category: ["Chicks", "Farming"],
    date: "Feb 15, 2025",
    title: "Beginner’s Guide to Chick Care & Feeding",
    desc: "Discover how to properly feed and care for newly hatched chicks to ensure healthy growth on your farm.",
    link: "01_blog.html",
  },
  {
    img: blog3,
    category: ["Farm", "Maintenance"],
    date: "Feb 20, 2025",
    title: "Top 5 Tips for Poultry Farm Maintenance",
    desc: "From hygiene to proper ventilation, explore essential farm maintenance tips to keep your hens and chicks healthy.",
    link: "01_blog.html",
  },
];

  return (
    <>
        {/* // header */}
    

    <section className="header header-1" id="page">
  <div className="hero-slider">
    <div className="box-slider">
      <div
        className="bg-slider"
        style={{ backgroundImage: `url(${bg1})` }}
      ></div>
      <div className="display-table">
        <div className="table-cell">
          <div className="overlay"></div>
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="banner">
                  <div className="top-handline">Fresh from the Farm</div>
                  <h1 className="handline">Muttaikadai Hatcheries</h1>
                  <p className="about-website">
                    Supplying farm-fresh eggs and quality hatchery services 
                    with care and dedication. From hatching to delivery, 
                    we ensure the best for farmers, retailers, and families.
                  </p>
                  {/* <a href="#about" className="btn-2">Learn More</a> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


    {/* // feature */}
     {/*  */}


    {/* about */}

    


    {/* <!-- :: Services --> */}
        <section className="services py-100-70">
          <div className="container">
            <div className="row">
              <div className="col-md-6 offset-md-3">
                <div className="sec-title text-center">
                  <h2>About Us</h2>
                  <h3>High Quality <span>Hatchery Care</span></h3>
                  <div className="icon">
                    <i className="flaticon-egg sec-icon"></i>
                  </div>
                  <p>We provide the best care and technology to ensure healthy chicks and maximum hatchability for poultry farmers.</p>
                </div>
              </div>
            </div>
            <div className="row">
              {/* <!-- Hatchery Service 1 --> */}
              <div className="col-sm-6 col-md-4 col-lg-3">
                <div className="services-item">
                  <i className="item-icon flaticon-chicken"></i>
                  <div className="item-content">
                    <h4>Quality Eggs</h4>
                    <p>We source and select only the finest hatching eggs from healthy parent stock.</p>
                    <a href="services.html">Read More</a>
                  </div>
                </div>
              </div>

              {/* <!-- Hatchery Service 2 --> */}
              <div className="col-sm-6 col-md-4 col-lg-3">
                <div className="services-item">
                  <i className="item-icon flaticon-incubator"></i>
                  <div className="item-content">
                    <h4>Modern Incubators</h4>
                    <p>Our fully automated incubators maintain perfect temperature and humidity for optimal hatching.</p>
                    <a href="services.html">Read More</a>
                  </div>
                </div>
              </div>

              {/* <!-- Hatchery Service 3 --> */}
              <div className="col-sm-6 col-md-4 col-lg-3">
                <div className="services-item">
                  <i className="item-icon flaticon-chick"></i>
                  <div className="item-content">
                    <h4>Healthy Chicks</h4>
                    <p>We ensure biosecurity and vaccination protocols to deliver strong, disease-free chicks.</p>
                    <a href="services.html">Read More</a>
                  </div>
                </div>
              </div>

              {/* <!-- Hatchery Service 4 --> */}
              <div className="col-sm-6 col-md-4 col-lg-3">
                <div className="services-item">
                  <i className="item-icon flaticon-farmer"></i>
                  <div className="item-content">
                    <h4>Farmer Support</h4>
                    <p>We provide expert guidance and after-sales support for better poultry farm management.</p>
                    <a href="services.html">Read More</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* :: Get Now Packages */}
        <section className="get-now-packages py-100">
          <div className="overlay-1"></div>
          <div className="container">
            <div className="row">
              <div className="col-md-8 offset-md-2">
                <div className="sec-title text-center">
                  <h2>Fresh Hatchery Deals – Limited Time!</h2>
                  <h3>Get 20% Off on Bulk Egg & Chick Orders – Hurry Up!</h3>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col text-center">
                <a href="01_contact.html" className="btn-4">
                  <i className="fas fa-phone-alt"></i> Contact us
                </a>
              </div>
            </div>
          </div>
        </section>


 {/* <!-- :: Department --> */}
        <section className="department py-100-70">
        <div className="container">
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <div className="sec-title text-center">
                <h2>Our Services</h2>
                <h3>We Care For Our <span>Farm</span></h3>
                <div className="icon">
                  <i className="flaticon-egg sec-icon"></i>
                </div>
                <p>
                  Egg Cart Hatcheries is dedicated to providing fresh, healthy eggs and
                  high-quality chicks. We support farmers with reliable hatchery and poultry
                  solutions to grow their businesses successfully.
                </p>
              </div>
            </div>
          </div>
        
          <div className="row">
            <div className="col-sm-6 col-md-4 col-lg-3">
              <div className="services-item">
                <i className="item-icon flaticon-egg"></i>
                <div className="item-content">
                  <h4>Fresh Egg Supply</h4>
                  <p>
                    Daily farm-fresh eggs delivered with strict quality and hygiene standards.
                  </p>
                  <a href="services.html">Read More</a>
                </div>
              </div>
            </div>
        
            <div className="col-sm-6 col-md-4 col-lg-3">
              <div className="services-item">
                <i className="item-icon flaticon-chicken"></i>
                <div className="item-content">
                  <h4>Day-Old Chicks</h4>
                  <p>
                    Healthy and well-vaccinated chicks to help farmers kickstart their flocks.
                  </p>
                  <a href="services.html">Read More</a>
                </div>
              </div>
            </div>
        
            <div className="col-sm-6 col-md-4 col-lg-3">
              <div className="services-item">
                <i className="item-icon flaticon-farm"></i>
                <div className="item-content">
                  <h4>Poultry Feed Supply</h4>
                  <p>
                    Nutritious, balanced feed designed for the healthy growth of your poultry.
                  </p>
                  <a href="services.html">Read More</a>
                </div>
              </div>
            </div>
        
            <div className="col-sm-6 col-md-4 col-lg-3">
              <div className="services-item">
                <i className="item-icon flaticon-vaccine"></i>
                <div className="item-content">
                  <h4>Vaccination & Care</h4>
                  <p>
                    Expert guidance and vaccination services to protect chicks from diseases.
                  </p>
                  <a href="services.html">Read More</a>
                </div>
              </div>
            </div>
          </div>
        </div>
    </section>


        {/* :: Statistic */}
        <div className="statistic py-100-70">
          <div className="overlay-1"></div>
          <div className="container">
            <div className="row">
              {/* Total Eggs Hatched */}
              <div className="col-sm-6 col-md-4 col-lg-3">
                <div className="statistic-item">
                  <div className="count" data-from="10000" data-to="50000"></div>
                  <div className="item-contact">
                    <div className="name-item">Total Eggs Hatched</div>
                    <p>High success rate with modern incubation technology.</p>
                  </div>
                </div>
              </div>
        
              {/* Happy Farmers */}
              <div className="col-sm-6 col-md-4 col-lg-3">
                <div className="statistic-item">
                  <div className="count" data-from="100" data-to="1200"></div>
                  <div className="item-contact">
                    <div className="name-item">Happy Farmers</div>
                    <p>Supporting farmers with quality chicks and services.</p>
                  </div>
                </div>
              </div>
        
              {/* Hatchery Branches */}
              <div className="col-sm-6 col-md-4 col-lg-3">
                <div className="statistic-item">
                  <div className="count" data-from="1" data-to="25"></div>
                  <div className="item-contact">
                    <div className="name-item">Hatchery Branches</div>
                    <p>Expanding across regions to serve poultry farmers better.</p>
                  </div>
                </div>
              </div>
        
              {/* Years of Experience */}
              <div className="col-sm-6 col-md-4 col-lg-3">
                <div className="statistic-item">
                  <div className="count" data-from="1" data-to="30"></div>
                  <div className="item-contact">
                    <div className="name-item">Years of Experience</div>
                    <p>Trusted name in egg hatching & poultry farming solutions.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* :: Doctors */}
        <section className="doctors py-100-70">
          <div className="container">
            <div className="row">
              <div className="col-md-6 offset-md-3">
                <div className="sec-title text-center">
                  <h2>Our Products</h2>
                  <h3>
                    Fresh & Quality <span>Eggs & Chickens</span>
                  </h3>
                  <div className="icon">
                    <i className="flaticon-heart sec-icon"></i>
                  </div>
                  <p>
                    We supply farm-fresh eggs and healthy chickens directly from our hatchery. Available in wholesale and retail to meet all your needs.
                  </p>
                </div>
              </div>
            </div>

            <div className="row">
              {/* Doctor 1 */}
              <div className="col-md-6 col-lg-4">
                <div className="doctor-item">
                  <div className="img-box">
                    <img
                      className="img-fluid"
                      src={product1}
                      alt="01 Doctor"
                    />
                  </div>
                  <div className="text-box text-center">
                    <h5>Wholesale Eggs</h5>
                    <span>Bulk Supply</span>
                    <p>
                      Large quantities of farm-fresh eggs delivered to retailers, distributors, and hotels at competitive prices.
                    </p>
                    <ul>
                      <li>
                        <a href="#"><i className="fab fa-facebook-f"></i></a>
                      </li>
                      <li>
                        <a href="#"><i className="fab fa-twitter"></i></a>
                      </li>
                      <li>
                        <a href="#"><i className="fab fa-instagram"></i></a>
                      </li>
                      <li>
                        <a href="#"><i className="fab fa-dribbble"></i></a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Doctor 2 */}
              <div className="col-md-6 col-lg-4">
                <div className="doctor-item">
                  <div className="img-box">
                    <img
                      className="img-fluid"
                      src={product2}
                      alt="02 Doctor"
                    />
                  </div>
                  <div className="text-box text-center">
                    <h5>Retail Eggs</h5>
                    <span>For Households</span>
                    <p>
                      Fresh, hygienically packed eggs for families, available in different pack sizes to suit your needs.
                    </p>
                    <ul>
                      <li>
                        <a href="#"><i className="fab fa-facebook-f"></i></a>
                      </li>
                      <li>
                        <a href="#"><i className="fab fa-twitter"></i></a>
                      </li>
                      <li>
                        <a href="#"><i className="fab fa-instagram"></i></a>
                      </li>
                      <li>
                        <a href="#"><i className="fab fa-dribbble"></i></a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Doctor 3 */}
              <div className="col-md-6 col-lg-4">
                <div className="doctor-item">
                  <div className="img-box">
                    <img
                      className="img-fluid"
                      src={product3}
                      alt="03 Doctor"
                    />
                  </div>
                  <div className="text-box text-center">
                    <h5>Chickens</h5>
                    <span>Healthy & Fresh</span>
                    <p>
                      Nutritious, farm-raised chickens ensuring the best quality and freshness for your table.
                    </p>
                    <ul>
                      <li>
                        <a href="#"><i className="fab fa-facebook-f"></i></a>
                      </li>
                      <li>
                        <a href="#"><i className="fab fa-twitter"></i></a>
                      </li>
                      <li>
                        <a href="#"><i className="fab fa-instagram"></i></a>
                      </li>
                      <li>
                        <a href="#"><i className="fab fa-dribbble"></i></a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

       


        





    </>
  );
};

export default Home;
