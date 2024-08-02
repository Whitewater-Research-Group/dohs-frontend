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
						<a class="u-sidebar-logo" href="#">
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
					<!-- Doughnut Chart -->
					<div class="row">
					</div>


					<div class="row">


						<div class="col-md-12 mb-5 mb-md-0">
							<!-- Active Tasks -->
							<div class="card h-100">
								<!-- Card Header -->
								<header class="card-header d-flex align-items-center justify-content-between">
									<h2 class="h4 card-header-title">Subscribers</h2>
									<span class="text-muted"><?php //echo $clients; ?> Monitored Devices</span>
								</header>
								<!-- End Card Header -->

								<!-- Card Body -->
								<div class="card-body p-0">
									<div class="table-responsive">
										<div id="animated_icons">
											<i class='bx bxs-like bx-spin-hover'></i>
											<i class='bx bxs-like bx-tada-hover'></i>
											<i class='bx bxs-like bx-flashing-hover'></i>
											<i class='bx bxs-like bx-burst-hover'></i>
											<i class='bx bxs-like bx-fade-left-hover'></i>
											<i class='bx bxs-like bx-fade-right-hover'></i>
											<i class='bx bxs-like bx-fade-up-hover'></i>
											<i class='bx bxs-like bx-fade-down-hover'></i>
										</div>
										<table class="card-table">
										<thead>
											<tr class="small">
											<th class="font-weight-normal text-muted pb-3">Device ID</th>
											<th class="font-weight-normal text-muted pb-3">Phone Number</th>
                                            <th class="font-weight-normal text-muted pb-3">Location (Lat, Long)</th>
                                            <th class="font-weight-normal text-muted pb-3">Action</th>
											</tr>
										</thead>
										<tbody>
											<?php if($table_rows): ?>
                                    		<?php foreach($table_rows as $key => $row): ?>

											<tr>
												<td class="py-3">
													<div class="media align-items-center">
														<div class="u-icon rounded-circle bg-primary text-white mr-3">
															<span class="ti-paint-bucket"></span>
														</div>

														<div class="media-body">
															<h4 class="font-weight-normal mb-0"><?php echo ucfirst($row["phone_id"]); ?></h4>
														</div>
													</div>
												</td>
												<td class="py-3"><?php echo $row["phone_number"]; ?></td>
                                                <td class="py-3"><?php echo $row["location_latitude"]. ", ". $row["location_longitude"]; ?></td>
                                                <td class="py-3">
                                                    <a href="<?php echo site_url('dashboard/subscribers/'.$row['location_latitude'].'/'.$row['location_longitude']);?>" class="btn btn-primary btn-sm">View on Map</a>
                                                </td>
                                                
											</tr>
											<?php endforeach; ?>
                                    		<?php endif; ?>

										</tbody>
										</table>
									</div>
								</div>
								<!-- End Card Body -->								<!-- Card Footer -->

								<!-- End Card Footer -->
							</div>
							<!-- End Active Tasks -->
						</div>


					</div>

                    <div class="row">
                            <div class="col-md-04 mb-5">

                            </div>
							<div class="col-md-08 mb-5">
                            
                            </br>
							<div id = "embedded_map">
								<h1>Embedded Map </h1>
							</div>			
								<?php
                                    $location_latitude = 37.4234;
                                    $location_longitude = -122.084;
								?>
                                <?php
                                    // Get the path component of the URL
                                    $url_path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

                                    // Split the path into its components
                                    $path_components = explode('/', $url_path);
                                    // Extract the latitude and longitude values from the path
                                    $location_latitude = $path_components[1];
                                    if (!is_numeric($location_latitude)) {
                                        $location_latitude = 37.4234; // Default latitude
                                    }

                                    $location_longitude = $path_components[2];
                                    if (!is_numeric($location_longitude)) {
                                        $location_longitude = -122.084; // Default longitude
                                    }
                                ?>

								<iframe src="https://www.openstreetmap.org/export/embed.html?bbox=<?php echo ($location_longitude - 0.001); ?>,<?php echo ($location_latitude - 0.001); ?>,<?php echo ($location_longitude + 0.001); ?>,<?php echo ($location_latitude + 0.001); ?>&amp;layer=mapnik&amp;marker=<?php echo $location_latitude; ?>,<?php echo $location_longitude; ?>" width="600" height="450" frameborder="0" scrolling="no"></iframe>

							</div>
						</div>
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

