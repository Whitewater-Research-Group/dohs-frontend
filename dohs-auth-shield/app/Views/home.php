<!DOCTYPE html>
<html lang="en">

<head>
  <?php include __DIR__.'/sections/header.php'; ?>
  <title>DOHS</title>
 <!-- Template Main CSS File -->
<link href="<?php echo pathinfo(base_url(),PATHINFO_DIRNAME)."/public/"."assets/css/style.css";?>" rel="stylesheet">
</head>

<body>
  <!-- ======= Header ======= -->
    <?php include  __DIR__.'/sections/auto_load_style.php'; ?> 
    <?php include  __DIR__.'/sections/menu_main.php'; ?>
  <!-- End Header -->

  <!-- ======= Hero Section ======= -->
  <section id="hero" class="d-flex align-items-center">

    <div class="container">
      <div class="row">
        <div class="col-lg-6 d-lg-flex flex-lg-column justify-content-center align-items-stretch pt-5 pt-lg-0 order-2 order-lg-1">
          <div>
            <h1><span style="color: #1b7339;">Landing Page for DOHS</span></h1>
            <h2>Welcome to DOHS </h2>
            <!-- <a href="#" class="download-btn"><i class="bx bxl-play-store"></i> Google Play</a> -->
            <!-- <div><a href="downloads/catalogue.pdf" class="download-btn"><i class="bx bxl-windows"></i>   Download our Catalog  </a></div> -->
            <h4>Download the App</h4>
            <div class="">
              <a href="#" class="facebook"><i class="bx bxl-play-store bx-lg"></i></a>
              <a href="#" class="instagram"><i class="bx bxl-android bx-lg"></i></a>
            </div>
			</div>
        </div>
        <div class="col-lg-6 d-lg-flex flex-lg-column align-items-stretch order-1 order-lg-2 hero-img" data-aos="fade-up">
          <img src="<?php echo pathinfo(base_url(),PATHINFO_DIRNAME)."/public/"."assets/img/hero-img.png";?>"  class="img-fluid" alt="">
        </div>
      </div>
    </div>

  </section><!-- End Hero -->

  <main id="main">

    <!-- ======= Details Section ======= -->
    <section  class="details">
      <div class="container">


        <div class="row content">
          <div class="col-md-4" data-aos="fade-right">
            <img src="<?php echo pathinfo(base_url(),PATHINFO_DIRNAME)."/public/";?>assets/img/details-1.png" class="img-fluid" alt="">
          </div>

        </div>




      </div>
    </section><!-- End Details Section -->






    <!-- ======= Testimonials Section ======= -->
    <section id="testimonials" class="testimonials section-bg">
      <div class="container" data-aos="fade-up">

        <div class="section-title">
          <h2>Testimonials</h2>
          <p>These are what people have to say about QoS/QoE App</p>
        </div>

        <div class="testimonials-slider swiper" data-aos="fade-up" data-aos-delay="50">
          <div class="swiper-wrapper">


            <div class="swiper-slide">
              <div class="testimonial-item">
                <img src="<?php echo pathinfo(base_url(),PATHINFO_DIRNAME)."/public/";?>assets/img/testimonials/testimonials-3.jpg" class="testimonial-img" alt="">
                <h3>Olaye, E</h3>
                <h4>Software Developer</h4>
                <p>
                  <i class="bx bxs-quote-alt-left quote-icon-left"></i>
                  The app developers are visionary. They are always trying to improve the app. <i class="bx bxs-quote-alt-right quote-icon-right"></i>
                </p>
              </div>
            </div>
			
			<div class="swiper-slide">
              <div class="testimonial-item">
                <img src="<?php echo pathinfo(base_url(),PATHINFO_DIRNAME)."/public/";?>assets/img/testimonials/testimonials-5.jpg" class="testimonial-img" alt="">
                <h3>Olaye, Ee</h3>
                <h4>Researcher| Database Expert| Systems Developer</h4>
                <p>
                  <i class="bx bxs-quote-alt-left quote-icon-left"></i>
                  Wonderful App. Enjoyed working on it.
                  <i class="bx bxs-quote-alt-right quote-icon-right"></i>
                </p>
              </div>
            </div>
            <div class="swiper-slide">
              <div class="testimonial-item">
                <img src="<?php echo pathinfo(base_url(),PATHINFO_DIRNAME)."/public/";?>assets/img/testimonials/testimonials-4.jpg" class="testimonial-img" alt="">
                <h3>Ed Olaye</h3>
                <h4>Freelancer</h4>
                <p>
                  <i class="bx bxs-quote-alt-left quote-icon-left"></i>
                  The research team is is visionary. They are always trying to improve the system.
                  <i class="bx bxs-quote-alt-right quote-icon-right"></i>
                </p>
              </div>
            </div>




          </div>
          <div class="swiper-pagination"></div>
        </div>

      </div>
    </section><!-- End Testimonials Section -->
	

    <!-- ======= Frequently Asked Questions Section ======= -->
    <section id="faq" class="faq section-bg">
      <div class="container" data-aos="fade-up">

        <div class="section-title">

          <h2>Frequently Asked Questions</h2>
          <p>How do I down load the app?</p>
        </div>

        <div class="accordion-list">
          <ul>
            <li data-aos="fade-up">
              <i class="bx bx-help-circle icon-help"></i> <a data-bs-toggle="collapse" class="collapse" data-bs-target="#accordion-list-1">How do I get my car towed, repaired and returned to me when I am at woork? <i class="bx bx-chevron-down icon-show"></i><i class="bx bx-chevron-up icon-close"></i></a>
              <div id="accordion-list-1" class="collapse show" data-bs-parent=".accordion-list">
                <p>
                  Go to play store and search for QoS/QoE App.
                </p>
              </div>
            </li>
            <li data-aos="fade-up">
              <i class="bx bx-help-circle icon-help"></i> <a data-bs-toggle="collapse" class="collapse" data-bs-target="#accordion-list-1">How do I report my network provider? <i class="bx bx-chevron-down icon-show"></i><i class="bx bx-chevron-up icon-close"></i></a>
              <div id="accordion-list-1" class="collapse show" data-bs-parent=".accordion-list">
                <p>
                  It is a simple as calling 080-000-000-000.
                </p>
              </div>
            </li>

          </ul>
        </div>

      </div>
    </section><!-- End Frequently Asked Questions Section -->

    <!-- ======= Contact Section ======= -->
    <section id="contact" class="contact">
      <div class="container" data-aos="fade-up">

        <div class="section-title">
          <h2>Contact</h2>
          <p>Feel free to contact us using any of the following methods.</p>
        </div>

        <div class="row">

          <div class="col-lg-6">
            <div class="row">
              <div class="col-lg-6 info">
                <i class="bx bx-map"></i>
                <h4>Address</h4>
                <p>University of Benin<br>
                Benin City,<br>Edo State, NG</p>
              </div>
              <div class="col-lg-6 info">
                <i class="bx bx-phone"></i>
                <h4>Call Us</h4>
                <p>+234 8027220523</p>
              </div>
              <div class="col-lg-6 info">
                <i class="bx bx-envelope"></i>
                <h4>Email Us</h4>
                <p>admin@gmail.com</p>
              </div>
              <div class="col-lg-6 info">
                <i class="bx bx-time-five"></i>
                <h4>Working Hours</h4>
                <p>Mon - Fri: 9AM to 5PM</p>
                <p>Sat: 9AM to 3PM</p>
              </div>
            </div>
          </div>

          <div class="col-lg-6">
            <form action="forms/contact.php" method="post" role="form" class="php-email-form" data-aos="fade-up">
              <div class="form-group">
                <input placeholder="Your Name" type="text" name="name" class="form-control" id="name" required>
              </div>
              <div class="form-group mt-3">
                <input placeholder="Your Email" type="email" class="form-control" name="email" id="email" required>
              </div>
              <div class="form-group mt-3">
                <input placeholder="Subject" type="text" class="form-control" name="subject" id="subject" required>
              </div>
              <div class="form-group mt-3">
                <textarea placeholder="Message" class="form-control" name="message" rows="5" required></textarea>
              </div>
              <div class="my-3">
                <div class="loading">Loading</div>
                <div class="error-message"></div>
                <div class="sent-message">Your message has been sent. Thank you!</div>
              </div>
              <div class="text-center"><button type="submit">Send Message</button></div>
            </form>
          </div>

        </div>

      </div>
    </section><!-- End Contact Section -->

  </main><!-- End #main -->

  <!-- ======= Footer ======= -->
  <?php include __DIR__.'/sections/footer.php'; ?>

</body>

</html>
