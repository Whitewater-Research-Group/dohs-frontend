  <!-- ======= Header ======= -->
  <header id="header" class="fixed-top  header-transparent ">
    <div class="container d-flex align-items-center justify-content-between">

      <div class="logo">
        <h4><a href="<?php echo site_url() ?>"><span style="color: #1b7339;"> DOHS App</span></a></h1>
        <!-- Uncomment below if you prefer to use an image logo -->
        <!-- <a href="index.html"><img src="assets/img/logo.png" alt="" class="img-fluid"></a>-->
      </div>
<nav id="navbar" class="navbar">
        <ul>
          <li><a class="nav-link scrollto active" href="<?php echo site_url('home');?>#hero">Home</a></li>
          <li class="nav-link scrollto"><a  href="#details"><span>Stakeholders</span></a> </li>
          <li><a href="<?php echo site_url('dashboard');?>"><span>Dashboard</span> </a></li>
          <li><a class="nav-link scrollto" href="#faq">About</a></li>


          <li class="dropdown"><a href="#"><span>Users</span> <i class="bi bi-chevron-down"></i></a>
            <ul>
              <li><a href="<?php echo site_url('login');?>">Sign in</a></li>
              <li><a href="<?php echo site_url('logout');?>">Sign Out</a></li>
            </ul>
          </li>
        </ul>
        
        <i class="bi bi-list mobile-nav-toggle"></i>
        <!-- <i class="bx bx-user"></i> -->
      </nav><!-- .navbar -->
      </div>
</header><!-- End Header -->