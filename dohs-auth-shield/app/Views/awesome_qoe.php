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

					<div class="row">


						<div class="col-md-12 mb-5 mb-md-0">
							<!-- Active Tasks -->
							<div class="card h-100">
								<!-- Card Header -->
								<header class="card-header d-flex align-items-center justify-content-between">
									<h2 class="h4 card-header-title">QoE Data</h2>
									<span class="text-muted"><?php echo $clients; ?> Devices</span>
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
											<th class="font-weight-normal text-muted pb-3">Name</th>
											<th class="font-weight-normal text-muted pb-3">Value</th>
											<th class="font-weight-normal text-muted pb-3">Date</th>
											<th class="font-weight-normal text-muted pb-3">Time</th>
											<th class="font-weight-normal text-muted pb-3">Phone</th>
											<th class="font-weight-normal text-muted pb-3">Location</th>
											<th class="font-weight-normal text-muted pb-3">Details</th>
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
															<h4 class="font-weight-normal mb-0"><?php echo ucfirst($row["kpi_name"]); ?></h4>
															<small class="text-muted">1 hour ago-- <?php echo $row["time"]; ?></small>
														</div>
													</div>
												</td>
												<td class="py-3"><?php echo $row["value"]; ?></td>
												<td class="py-3"><?php echo $row["date"]; ?></td>
												<td class="py-3"><?php echo $row["time"]; ?></td>
												<td class="py-3"><?php echo $row["phone_number"]; ?></td>
												<td class="py-3"><?php echo $row["location_latitude"].", ". $row["location_longitude"]; ?></td>
												<td class="py-3"><?php echo $row["particulars"]." DT: ". $row["data_type"]; ?></td>
											</tr>
											<?php endforeach; ?>
                                    		<?php endif; ?>

											<!-- <tr>
												<td class="py-3">
													<div class="media align-items-center">
														<div class="u-icon rounded-circle bg-secondary text-white mr-3">
															<span class="ti-truck"></span>
														</div>

														<div class="media-body">
															<h4 class="font-weight-normal mb-0">Default QoE</h4>
															<small class="text-muted">Since inception</small>
														</div>
													</div>
												</td>
												<td class="py-3">0</td>
												<td class="py-3">24/8/2022</td>
											</tr> -->
										</tbody>
										</table>
									</div>
								</div>
								<!-- End Card Body -->								
							</div>
							<!-- End Active Tasks -->
						</div>


					</div>
					<br></br>
					<!-- Calls -->
					<div class="row">


						<div class="col-md-12 mb-5 mb-md-0">
							<!-- Active Tasks -->
							<div class="card h-100">
								<!-- Card Header -->
								</br>
								<header class="card-header d-flex align-items-center justify-content-between">
									<h2 id = "calls" class="h4 card-header-title">QoE Data (Calls)</h2>
									<!-- <span class="text-muted"><?php echo $clients; ?> Devices</span> -->
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
											<th class="font-weight-normal text-muted pb-3">Name</th>
											<th class="font-weight-normal text-muted pb-3">Value</th>
											<th class="font-weight-normal text-muted pb-3">Date</th>
											<th class="font-weight-normal text-muted pb-3">Time</th>
											<th class="font-weight-normal text-muted pb-3">Phone</th>
											<th class="font-weight-normal text-muted pb-3">Location</th>
											<th class="font-weight-normal text-muted pb-3">Details</th>
											</tr>
										</thead>
										<tbody>
											<?php if($calls_table_rows): ?>
                                    		<?php foreach($calls_table_rows as $key => $row): ?>

											<tr>
												<td class="py-3">
													<div class="media align-items-center">
														<div class="u-icon rounded-circle bg-primary text-white mr-3">
															<span class="ti-paint-bucket"></span>
														</div>

														<div class="media-body">
															<h4 class="font-weight-normal mb-0"><?php echo ucfirst($row["kpi_name"]); ?></h4>
															<small class="text-muted">1 hour ago-- <?php echo $row["time"]; ?></small>
														</div>
													</div>
												</td>
												<td class="py-3"><?php echo $row["value"]; ?></td>
												<td class="py-3"><?php echo $row["date"]; ?></td>
												<td class="py-3"><?php echo $row["time"]; ?></td>
												<td class="py-3"><?php echo $row["phone_number"]; ?></td>
												<td class="py-3"><?php echo $row["location_latitude"].", ". $row["location_longitude"]; ?></td>
												<td class="py-3"><?php echo $row["particulars"]." DT: ". $row["data_type"]; ?></td>
											</tr>
											<?php endforeach; ?>
                                    		<?php endif; ?>

											<!-- <tr>
												<td class="py-3">
													<div class="media align-items-center">
														<div class="u-icon rounded-circle bg-secondary text-white mr-3">
															<span class="ti-truck"></span>
														</div>

														<div class="media-body">
															<h4 class="font-weight-normal mb-0">Default QoE</h4>
															<small class="text-muted">Since inception</small>
														</div>
													</div>
												</td>
												<td class="py-3">0</td>
												<td class="py-3">24/8/2022</td>
											</tr> -->
										</tbody>
										</table>
									</div>
								</div>

							</div>
							<!-- End Active Tasks -->
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

