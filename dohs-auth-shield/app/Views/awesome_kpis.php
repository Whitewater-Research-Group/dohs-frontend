<?php
echo "<!DOCTYPE html>";
// $sales=500;
// $budget = 'N742,600';
// $clients=23;
// $income='N39,800';
?>
<html lang="en" class="no-js">
	<!-- Head -->
	<head>
		<title>Dashboard</title>
		<?php include __DIR__.'/sections/awesome_header.php'; ?>
        
                                <style>
                                    a, a:hover {
                                    text-decoration: none;
                                    }
                                    a:hover {
                                    opacity: 0.8;
                                    } 
                                </style>
	</head>
	<!-- End Head -->

	<!-- Body -->
	<body>
		<!-- Header (Topbar) -->
		<?php include __DIR__.'/sections/awesome_sidemenu_header.php'; ?> 
		<!-- End Header (Topbar) -->

		<!-- Main -->
		<main class="u-main">
			<!-- Sidebar -->
			<aside id="sidebar" class="u-sidebar">
				<div class="u-sidebar-inner">
					<!-- Sidebar Header -->
					<header class="u-sidebar-header">
						<!-- Sidebar Logo -->
						<a class="u-sidebar-logo" href="index.html">
							<img class="u-sidebar-logo__icon" src="<?php echo base_url("assets/img/logo_50_50.png");?>" alt="Icon">
							<!-- <img class="u-sidebar-logo__text" src="<?php //echo base_url("assets/svg/logo-text-light.svg");?>" alt="Awesome"> -->
						</a>
						<!-- End Sidebar Logo -->
					</header>
					<!-- End Sidebar Header -->

					<!-- Sidebar Nav -->
					<?php include __DIR__.'/sections/awesome_sidebar_nav.php'; ?> 
					<!-- End Sidebar Nav -->
				</div>
			</aside>
			<!-- End Sidebar -->

			<!-- Content -->
			<div class="u-content">
				<!-- Content Body -->
				<div class="u-body">
					<!-- Doughnut Chart Row 1 -->
					<div class="row">
						<div class="col-sm-12 col-xl-12 mb-1">
							<!-- Card -->
							<div class="card">
                            <a class="card-block stretched-link text-decoration-none" href="#">    
								<!-- Card Image-->
								<div class="card-image">
									<img class="card-img-top" src="<?php echo base_url("assets/img/dashboard_550_183_filling_station.png");?>">
									<!-- <span class="card-text">Card Title</span> -->
								</div>
								<!-- End Card Image -->
								<!-- Card Body -->
								<div class="card-body">
									<!-- Chart with Info -->
									<div class="media align-items-center py-2">
										<!-- Chart with Info - Info -->
										<div class="media-body">
											<h5 class="h5 text-muted mb-2">Core business</h5>
											<span class="h2 font-weight-normal mb-0">Filling Station and Auto Parts Market</span>
										</div>

										<!-- End Chart with Info - Info -->

                                        <div class="mb-2">
                                            <h5 class="h6 text-muted mb-2">Total Worth of Assets</h5>
                                            <span class="h3 font-weight-normal mb-0">N87,700,500</span>
                                        </div>
									</div>
									<!-- End Chart with Info -->
								</div></a>
								<!-- End Card Body -->
							</div>
							<!-- End Card -->
						</div>

					</div>
                    <div class="row">
                        <br><br><br>
                    </div>
					<!-- End Doughnut Chart Row 1-->
					<!-- Doughnut Chart Row 2 -->
					<div class="row">
						<div class="col-sm-6 col-xl-6 mb-5">
							<!-- Card -->
							<div class="card">
                                <a class="card-block stretched-link text-decoration-none" href="#">  
								<!-- Card Image-->
								<div class="card-image">
									<img class="card-img-top" src="<?php echo base_url("assets/img/dashboard_300_100_pharmacy.png");?>">
									<!-- <span class="card-text">Card Title</span> -->
								</div>
								<!-- End Card Image -->
								<!-- Card Body -->
								<div class="card-body">
									<!-- Chart with Info -->
									<div class="media align-items-center py-2">
										<!-- Chart with Info - Info -->
										<div class="media-body">
											<span class="h2 font-weight-normal mb-0">Pharmarcy</span>
										</div>

										<!-- End Chart with Info - Info -->
                                        <div class="mb-2">
                                            <h5 class="h6 text-muted mb-2">Total Worth of Assets</h5>
                                            <span class="h3 font-weight-normal mb-0">N9,000,000</span>
                                        </div>

									</div>
									<!-- End Chart with Info -->
								</div></a>
								<!-- End Card Body -->
							</div>
							<!-- End Card -->
						</div>

						<div class="col-sm-6 col-xl-6 mb-5">
							<!-- Card -->
							<div class="card">
                                <a class="card-block stretched-link text-decoration-none" href="#">  
								<!-- Card Image-->
								<div class="card-image">
									<img class="card-img-top" src="<?php echo base_url("assets/img/dashboard_300_by_100_3.png");?>">
									<!-- <span class="card-text">Card Title</span> -->
								</div>
								<!-- End Card Image -->
								<!-- Card Body -->
								<div class="card-body">
									<!-- Chart with Info -->
									<div class="media align-items-center py-2">
										<!-- Chart with Info - Info -->
										<div class="media-body">
											<span class="h2 font-weight-normal mb-0">Building Materials</span>
										</div>
										<!-- End Chart with Info - Info -->

                                        <div class="mb-2">
                                            <h5 class="h6 text-muted mb-2">Total Worth of Assets</h5>
                                            <span class="h3 font-weight-normal mb-0">N18,000,000</span>
                                        </div>
									</div>
									<!-- End Chart with Info -->
								</div></a>
								<!-- End Card Body -->
							</div>
							<!-- End Card -->
						</div>


					</div>
					<!-- End Doughnut Chart Row 2-->
				</div>
				<!-- End Content Body -->

				<!-- Footer -->

				<?php include __DIR__.'/sections/awesome_footer.php'; ?>
				<!-- End Footer -->
			</div>
			<!-- End Content -->
		</main>
		<!-- End Main -->

		
		<?php include __DIR__.'/sections/awesome_scripts.php'; ?>
		
	</body>
	<!-- End Body -->
</html>

