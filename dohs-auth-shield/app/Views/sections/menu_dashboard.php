  <!-- ======= Header ======= -->
  <header id="header" class="fixed-top  header-transparent ">
    <div class="container d-flex align-items-center justify-content-between">

      <div class="logo">
        <h1><a href="<?php echo site_url() ?>"><span style="color: #000000;">The</span><span style="color: #00ff00;"> QoSE App</span></a></h1>
        <!-- Uncomment below if you prefer to use an image logo -->
        <!-- <a href="index.html"><img src="assets/img/logo.png" alt="" class="img-fluid"></a>-->
      </div>

    <nav id="navbar" class="navbar">
            <ul>
                  <li><a href="<?php echo site_url() ?>">Home</a></li>
                  <li><a href="<?php echo site_url("dashboard") ?>">Dashboard</a></li>
                  <li class="dropdown"><a href="#"><span>Tasks</span> <i class="bi bi-chevron-down"></i></a>
                    <ul>
                      <li class='bx bxs-like'><a href="<?php echo site_url('api');?>">API</a></li>
                      <li class='bx bxs-like'><a href="<?php echo site_url('api');?>">API Docs</a></li>
                    </ul>
                  </li>

                  <li class="dropdown"><a href="#"><i class='bx bx-user bx-tada-hover'></i><span>User(<?php echo "Hello Admin"; ?>)</span> <i class="bi bi-chevron-down"></i></a>
                      <ul>
                        <li><a href="<?php echo site_url('logout');?>">Sign Out</a></li>
                      </ul>
                  </li>

            </ul>
            
            <i class="bi bi-list mobile-nav-toggle"></i>

    </nav><!-- .navbar -->

  </div>
</header><!-- End Header -->