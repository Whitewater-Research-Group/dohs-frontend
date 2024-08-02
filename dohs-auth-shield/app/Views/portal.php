<!DOCTYPE html>
<html lang="en">

<head>

<?php include __DIR__.'/sections/header.php'; ?>
<title>View services</title>
<!-- Template Main CSS File -->
<link href="<?php echo pathinfo(base_url(),PATHINFO_DIRNAME)."/public/"."assets/css/style.css";?>" rel="stylesheet">

</head>

<body>

  <!-- ======= Header ======= -->
      <?php include 'sections/menu_dashboard.php'; ?><!-- .navbar -->
  <!-- End Header -->

  <!-- ======= Hero Section ======= -->
  <section id="hero" class="d-flex align-items-center">

    <div class="container">
      <div class="row">
        <div class="col-lg-6 d-lg-flex flex-lg-column justify-content-center align-items-stretch pt-5 pt-lg-0 order-2 order-lg-1">
          <div>
            <h1>Staff Portal</h1>
            <h2>Welcome to staff portal! Use the menu above to navigate through the portal</h2>
            <!-- <a href="<?php //echo pathinfo(base_url(),PATHINFO_DIRNAME)."/public/"."downloads/autoFix.apk"; ?>" class="download-btn"><i class="bx bxl-play-store"></i> Android App</a> -->
            <!-- <div><a href="<?php //echo pathinfo(base_url(),PATHINFO_DIRNAME)."/public/"."downloads/weekly_report.pdf"; ?>" class="download-btn"><i class="bx bxl-windows"></i>   Download Weekly Report  </a></div> -->
            <div id="animated_icons">
              <i class='bx bxs-like bx-lg bx-spin-hover'></i>
              <i class='bx bxs-like bx-lg bx-tada-hover'></i>
              <i class='bx bxs-like bx-lg bx-flashing-hover'></i>
              <i class='bx bxs-like bx-lg bx-burst-hover'></i>
              <i class='bx bxs-like bx-lg bx-fade-left-hover'></i>
              <i class='bx bxs-like bx-lg bx-fade-right-hover'></i>
              <i class='bx bxs-like bx-lg bx-fade-up-hover'></i>
              <i class='bx bxs-like bx-lg bx-fade-down-hover'></i>
            </div>

            <div>
              <i class='bx bxs-like bx-lg bx-spin'></i>
              <i class='bx bxs-like bx-lg bx-tada'></i>
              <i class='bx bxs-like bx-lg bx-flashing'></i>
              <i class='bx bxs-heart bx-lg bx-border bx-burst'></i>
              <i class='bx bxs-like bx-lg bx-fade-left'></i>
              <i class='bx bxs-like bx-lg bx-fade-right'></i>
              <i class='bx bxs-heart bx-lg bx-fade-up'></i>
              <i class='bx bxs-like bx-lg bx-fade-down'></i>
            </div>
			</div>
        </div>
        <div class="col-lg-6 d-lg-flex flex-lg-column align-items-stretch order-1 order-lg-2 hero-img" data-aos="fade-up">
          <img src="<?php echo pathinfo(base_url(),PATHINFO_DIRNAME)."/public/"."assets/img/hero-img.png"; ?>" class="img-fluid" alt="">

        </div>
      </div>
    </div>

  </section><!-- End Hero -->

  <main id="main">



    <!-- ======= Details Section ======= -->
    <section id="details" class="details">
      <div class="container">


        <div class="row content">
          <div class="col-md-4" data-aos="fade-right">
            <img src="<?php echo pathinfo(base_url(),PATHINFO_DIRNAME)."/public/"."assets/img/details-2.png"; ?>" class="img-fluid" alt="">
          </div>
          <div class="col-md-8 pt-4" data-aos="fade-up">
            <h3>Features</h3>
            <p class="fst-italic">
                Here is a summary of things you can do with his portal.
            </p>
            <ul>
              <li class='bx bxs-like'>View Dashboard</li>
              <li><i class="bi bi-check"></i>Add/Modify data</li>
            </ul>
            <ul>
              <li class='bx bxs-like'>Check email</li>
              <li class='bx bxs-check'>and much more</li>
            </ul>
          </div>
        </div>
        <h3>Details of QoS and QoE KPIs monitored</h3>
        <?php if($kpis): ?>
            <?php foreach($kpis as $key => $kpi): ?>
              
            <div class="row content">
              <div class="col-md-4" data-aos="fade-right">
                <img src="<?php echo pathinfo(base_url(),PATHINFO_DIRNAME)."/public/";?>assets/img/service-<?php echo $kpi['id']; ?>.png" class="img-fluid" alt="">
              </div>
              <div class="col-md-8 pt-4" data-aos="fade-up">
                <h3><?php echo $kpi['name']; ?></h3>
                <p class="fst-italic">
                  Category: <?php  echo $kpi['category']; ?>
                </p>
                <ul>
                  <!-- <li><i class="bi bi-check"></i>  <?php //echo $kpi['short_description_1']; ?></li> -->
                  <?php if ($kpi['short_description_1']) echo '<li><i class="bi bi-check"></i>'. $kpi['short_description_1']. '</li>'; ?>
                  <?php if ($kpi['short_description_2']) echo '<li><i class="bi bi-check"></i>'. $kpi['short_description_2']. '</li>'; ?>
                  <?php if ($kpi['short_description_3']) echo '<li><i class="bi bi-check"></i>'. $kpi['short_description_3']. '</li>'; ?>
                  <?php if ($kpi['short_description_4']) echo '<li><i class="bi bi-check"></i>'. $kpi['short_description_4']. '</li>'; ?>
                  <?php if ($kpi['short_description_5']) echo '<li><i class="bi bi-check"></i>'. $kpi['short_description_5']. '</li>'; ?>

                </ul>
                <br>
                <?php echo $kpi['description']; ?>  
                
              </div>
            </div>
          <?php endforeach; ?>
        <?php endif; ?>


      </div>
    </section><!-- End Details Section -->


  <!-- ======= Footers and scripts ======= -->
  <?php include 'sections/footer.php'; ?>
  
  <!-- End Footer -->

  <!-- <?php include 'sections/script_main.php';?> -->


</body>

</html>
