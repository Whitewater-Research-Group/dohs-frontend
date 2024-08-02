  <!-- ======= Header ======= -->
  <header id="header" class="fixed-top  header-transparent ">
    <div class="container d-flex align-items-center justify-content-between">

      <div class="logo">
        <h1><a href="<?php echo site_url() ?>"><span style="color: #000000;">The</span><span style="color: #00ff00;"> QoS/QoE App</span></a></h1>
        <!-- Uncomment below if you prefer to use an image logo -->
        <!-- <a href="index.html"><img src="assets/img/logo.png" alt="" class="img-fluid"></a>-->
      </div>
<nav id="navbar" class="navbar">
        <ul>
          <li><a class="nav-link" href="<?php echo site_url('home');?>#hero">Home</a></li>
          <li class="nav-link"><a  href="#details"><span>Products/Services</span></a> </li>
          <li><a class="nav-link" href="<?php echo site_url('home/gallery');?>#gallery">Gallery</a></li>
          <li><a class="nav-link" href="<?php echo site_url('home');?>#pricing">Pricing</a></li>
          <li><a class="nav-link" href="<?php echo site_url('home');?>#faq">About Us</a></li>


          <li class="dropdown"><a href="#"><span>Users</span> <i class="bi bi-chevron-down"></i></a>
            <ul>
              <li><a href="<?php echo site_url('login');?>">Sign in</a></li>
              <li><a href="<?php echo site_url('home/portal');?>"><span>Staff Portal</span> <i class="bi bi-chevron-right"></i></a>
              </li>
              <li><a href="<?php echo site_url('home/appointments');?>">Appointments</a></li>
              <li><a href="<?php echo site_url('home/vehicle_history');?>">Vehicle History</a></li>
              <li><a href="<?php echo site_url('home/guide');?>">User Guide</a></li>
              <li><a href="<?php echo site_url('logout');?>">Sign Out</a></li>
            </ul>
          </li>
        </ul>
        
        <i class="bi bi-list mobile-nav-toggle"></i>
        <i class="bx bx-user"></i>
      </nav><!-- .navbar -->
      </div>
</header><!-- End Header -->