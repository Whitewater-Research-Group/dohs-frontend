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
      <?php include 'sections/menu_main.php'; ?><!-- .navbar -->
  <!-- End Header -->

  <!-- ======= Hero Section ======= -->
  <section id="hero" class="d-flex align-items-center">

    <div class="container">
      <div class="row">
        <div class="col-lg-6 d-lg-flex flex-lg-column justify-content-center align-items-stretch pt-5 pt-lg-0 order-2 order-lg-1" data-aos="fade-up">
          <form method="POST" action="<?php echo site_url('home/search_vehicle'); ?>">
            <h1>Vehicle History</h1>
            <input id="search" name="search" placeholder = "vin"></input>
            <div><button type="submit"  class="download-btn"><i class="bx bx-search"></i>   Search for Vehicle  </button></div>
          </form>

        </div>
        <div class="col-lg-6 d-lg-flex flex-lg-column align-items-stretch order-1 order-lg-2 hero-img" data-aos="fade-up">
          <img src="<?php echo pathinfo(base_url(),PATHINFO_DIRNAME)."/public/"."assets/img/hero-imgold.png"; ?>" class="img-fluid" alt="">
          <p>
              ... this is still a work in progress. Make, VIN etc 
			      </p>
   
        </div>
      </div>
    </div>

  </section><!-- End Hero -->

  <main id="main">



    <!-- ======= Details Section ======= -->
    <section id="details" class="details">
      <div class="container">
        <div class="row content">
        </div>
      </div>
    </section><!-- End Details Section -->

    <!-- ======= Details Section ======= -->
    <section id="details" class="details">
        <div class="container mt-4">

            <?php
              if (isset($_SESSION['msg'])) {
                  echo $_SESSION['msg'];
              }
            ?>
            <div class="mt-3">
                <table class="table table-bordered" id="products-list">
                <thead>
                    <tr>
                        <th></th>
                        <th>Vehicle ID</th>
                        <th>Created at</th>
                        <th>Name</th>
                        <th>Brand</th>
                        <th>Model</th>
                        <th>Year</th>
                        <th>Reg. No.</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <?php if($vehicles): ?>
                    <?php foreach($vehicles as $key => $vehicles): ?>
                    <tr>
                        <td><?php echo $key+1; ?></td>
                        <td><?php echo $vehicles['id']; ?></td>
                        <td><?php echo $vehicles['created_at']; ?></td>
                        <td><?php echo $vehicles['name']; ?></td>
                        <td><?php echo $vehicles['car_brand']; ?></td>
                        <td><?php echo $vehicles['car_model']; ?></td>
                        <td><?php echo $vehicles['car_model_year']; ?></td>
                        <td><?php echo $vehicles['reg_number']; ?></td>
                        <td>
                        <a href="<?php echo site_url('home/search_vehicle_history/'.$vehicles['id']);?>" class="btn btn-primary btn-sm">History</a>
                        
                        </td>
                    </tr>
                    <?php endforeach; ?>
                    <?php endif; ?>
                </tbody>
                </table>
            </div>
        </div>
    </section><!-- End dynamic Section -->
    <!-- <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script> -->
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.21/css/jquery.dataTables.min.css">
    <script type="text/javascript" src="https://cdn.datatables.net/1.10.21/js/jquery.dataTables.min.js"></script>
    <script>
        $(document).ready( function () {
        $('#products-list').DataTable();
        });
    </script>
  <!-- ======= Footers and scripts ======= -->
  <?php include 'sections/footer.php'; ?>
  
  <!-- End Footer -->

  

</body>

</html>
