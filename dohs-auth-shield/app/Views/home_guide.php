<!DOCTYPE html>
<html lang="en">

<head>
  <?php include __DIR__.'/sections/header.php'; ?>
  <title>AutoFix</title>
 <!-- Template Main CSS File -->
<link href="<?php echo pathinfo(base_url(),PATHINFO_DIRNAME)."/public/"."assets/css/style.css";?>" rel="stylesheet">
</head>

<body>
  <!-- ======= Header ======= -->
  
    <?php include  __DIR__.'/sections/auto_load_style.php'; ?> 
    <?php include  __DIR__.'/sections/menu_main.php'; ?><!-- .navbar --><!-- .navbar -->
  <!-- End Header -->


  <main id="main">
      <!-- ======= Details Section ======= -->
    <section id="details" class="details">
      <div class="container">

        <div class="row content">
          <div class="col-md-4" data-aos="fade-right">
            <img src="assets/img/details-1.png" class="img-fluid" alt="">
          </div>
          <div class="col-md-8 pt-4" data-aos="fade-up">
            <h3>Guide for <span style="color: #000000;">MMLog</span><span style="color: #ff0000;"> autoFix</span></h3>
            <p class="fst-italic">
                Contact the admin to learn how to use this app.
            </p>
          </div>
        </div>


      </div>
    </section><!-- End Details Section -->

    

  </main><!-- End #main -->

  <!-- ======= Footer ======= -->
  <?php include __DIR__.'/sections/footer.php'; ?>

</body>

</html>
