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
						<div class="col-sm-6 col-xl-3 mb-5">
							<!-- Card -->
							<div class="card">
								<a class="card-block stretched-link text-decoration-none" href="<?php echo site_url("/kpis");?>">
								<!-- Card Image-->
								<div class="card-image">
									<img class="card-img-top" src="<?php echo base_url("assets/img/monitoring-3.png");?>">
									<!-- <span class="card-text">Card Title</span> -->
								</div>
								<!-- End Card Image -->
								<!-- Card Body -->
								<div class="card-body">
									<!-- Chart with Info -->
									<div class="media align-items-center py-2">
										<!-- Chart with Info - Info -->
										<div class="media-body">
											<h5 class="h5 text-muted mb-2">KPIs Monitored</h5>
											<span class="h2 font-weight-normal mb-0"><?php echo $kpis; ?></span>
										</div>
										<!-- End Chart with Info - Info -->

										<!-- Chart with Info - Chart -->
											<?php $data_chart = $data_chart_worth; ?>
											<?php include 'sections/scripts/tiny_trend_chart.php'; ?>

										<!-- End Chart with Info - Chart -->
									</div>
									<!-- End Chart with Info -->
								</div>
								<!-- End Card Body -->
								</a>
							</div>
							<!-- End Card -->

						</div>

						<div class="col-sm-6 col-xl-3 mb-5">
							<!-- Card -->
							<div class="card">
									<a class="card-block stretched-link text-decoration-none" href="<?php echo site_url("/dashboard/subscribers");?>">
									<!-- Card Image-->
									<div class="card-image">
										<img class="card-img-top" src="<?php echo base_url("assets/img/monitoring-2.png");?>">
										<!-- <span class="card-text">Card Title</span> -->
									</div>
									<!-- End Card Image -->
								<!-- Card Body -->
								<div class="card-body">
									<!-- Chart with Info -->
									<div class="media align-items-center py-2">
										<!-- Chart with Info - Info -->
										<div class="media-body">
											<h5 class="h5 text-muted mb-2">Subscribers Monitored</h5>
											<span class="h2 font-weight-normal mb-0"><?php echo $clients; ?></span>
										</div>
										<!-- End Chart with Info - Info -->

										<!-- Chart with Info - Chart -->
											<?php $data_chart = $data_chart_sales; ?>
											<?php include 'sections/scripts/tiny_trend_chart.php'; ?>

										<!-- End Chart with Info - Chart -->
									</div>
									<!-- End Chart with Info -->
								</div></a>
								<!-- End Card Body -->
							</div>
							<!-- End Card -->
						</div>

						<div class="col-sm-6 col-xl-3 mb-5">
							<!-- Card -->
							<div class="card">
								<a class="card-block stretched-link text-decoration-none" href="<?php echo site_url("/dashboard/qoe");?>">
								<!-- Card Body -->
								<div class="card-body">
									<!-- Chart with Info -->
									<div class="media align-items-center py-2">
										<!-- Chart with Info - Info -->
										<div class="media-body">
											<h5 class="h5 text-muted mb-2">QoE data collected</h5>
											<span class="h2 font-weight-normal mb-0"><?php echo $qoe_data; ?></span>
										</div>
										<!-- End Chart with Info - Info -->

										<!-- Chart with Info - Chart -->
										<div class="text-right ml-2" style="max-width: 70px;">
											<?php $data_chart = $data_chart_clients; ?>
											<?php include 'sections/scripts/tiny_trend_chart.php'; ?>

										</div>
										<!-- End Chart with Info - Chart -->
									</div>
									<!-- End Chart with Info -->
								</div>
								</a>
								<!-- End Card Body -->
							</div>
							<!-- End Card -->
						</div>

						<div class="col-sm-6 col-xl-3 mb-5">
							<!-- Card -->
							<div class="card">
								<a class="card-block stretched-link text-decoration-none" href="<?php echo site_url("/dashboard/qos_summary");?>">
								<!-- Card Body -->
								<div class="card-body">
									<!-- Chart with Info -->
									<div class="media align-items-center py-2">
										<!-- Chart with Info - Info -->
										<div class="media-body">
											<h5 class="h5 text-muted mb-2">QoS data collected</h5>
											<span class="h2 font-weight-normal mb-0"><?php echo $qos_data; ?></span>
										</div>
										<!-- End Chart with Info - Info -->

										<!-- Chart with Info - Chart -->
											<?php $data_chart = $data_chart_jobs; ?>
											<?php include 'sections/scripts/tiny_trend_chart.php'; ?>
										<!-- End Chart with Info - Chart -->
									</div>
									<!-- End Chart with Info -->
								</div></a>
								<!-- End Card Body -->
							</div>
							<!-- End Card -->
						</div>
					</div>
					<!-- End Doughnut Chart -->

					<div class="row">
						<div class="col-md-6 mb-5">
							<!-- Revenue Chart -->
							<div class="card h-100">
								<!-- Card Header -->
								<header class="card-header d-flex align-items-center justify-content-between">
									<h2 class="h4 card-header-title">Quality of Service Trend</h2>

									<!-- Card Icons -->
									<ul class="list-inline mb-0">
										<li class="list-inline-item dropdown">
											<a id="revenueMenuInvoker" class="u-icon-sm link-muted" href="#" role="button" aria-haspopup="true" aria-expanded="false"
											   data-toggle="dropdown"
											   data-offset="8">
												<span class="ti-more"></span>
											</a>


										</li>
									</ul>
									<!-- End Card Icons -->
								</header>
								<!-- End Card Header -->

								<!-- Card Body -->
								<div class="card-body pt-0">
									<!-- Chart Legends -->
									<ul class="list-inline mb-4">
										<li class="list-inline-item d-inline-flex align-items-center mr-4">
											<span class="u-indicator u-indicator-xxs position-static bg-primary border-0 mr-2"></span>
											QoS (SuccessfulCalls)
										</li>
										<li class="list-inline-item d-inline-flex align-items-center mr-4">
											<span class="u-indicator u-indicator-xxs position-static bg-success border-0 mr-2"></span>
											QoS (CCR)
										</li>
										<li class="list-inline-item d-inline-flex align-items-center mr-4">
											<span class="u-indicator u-indicator-xxs position-static bg-success border-0 mr-2"></span>
											QoS (DialedCall)
										</li>
									</ul>
									<!-- End Chart Legends -->

									<!-- Chart -->
									<div class="mx-n3" style="height: 340px;">
									<script>
										//var tableRows = <?php //echo json_encode($table_rows); ?>;
										var labels = <?php echo $labels; ?>;
    									var datas = <?php echo $datas; ?>;
										var labels_weeks = <?php echo $labels_weeks; ?>;
    									var datas_successful_calls = <?php echo $datas_successful_calls; ?>;
										var datas_blocked_calls = <?php echo $datas_blocked_calls; ?>;
										var datas_ccr = <?php echo $datas_ccr; ?>;
										var datas_dialed = <?php echo $datas_dialed; ?>;

										
										var datas_donut = <?php echo $datas_donut; ?>;
									</script>

										<canvas class="js-area-chart"
										        width="100"
										        height="320"></canvas>
									</div>
									<!-- End Chart -->
								</div>
								<!-- End Card Body -->
							</div>
							<!-- End Revenue Chart -->
						</div>

						<div class="col-md-6 mb-5">
							<!-- Performance Chart -->
							<div class="card h-100">
								<!-- Card Header -->
								<header class="card-header d-flex align-items-center justify-content-between">
									<h2 class="h4 card-header-title">Performance</h2>

									<!-- Card Icons -->
									<ul class="list-inline mb-0">
										<li class="list-inline-item dropdown">
											<!-- <a id="performanceMenuInvoker" class="u-icon-sm link-muted" href="#" role="button" aria-haspopup="true" aria-expanded="false"
											   data-toggle="dropdown"
											   data-offset="8">
												<span class="ti-more"></span>
											</a> -->

											<!-- Card Menu -->
											<!-- <div class="dropdown-menu dropdown-menu-right" aria-labelledby="performanceMenuInvoker" style="width: 150px;">
												<div class="card border-0 p-3">
													<ul class="list-unstyled mb-0">
														<li class="mb-3">
															<a class="d-block link-dark" href="#">Add</a>
														</li>
														<li>
															<a class="d-block link-dark" href="#">Remove</a>
														</li>
													</ul>
												</div>
											</div> -->
											<!-- Card Menu -->
										</li>
									</ul>
									<!-- End Card Icons -->
								</header>
								<!-- End Card Header -->

								<!-- Card Body -->
								<div class="card-body">
									<!-- Chart -->
									<div class="mx-auto mb-6" style="max-width: 240px; max-height: 240px;">
										<canvas class="js-doughnut-chart"
										        width="240"
										        height="240"></canvas>
									</div>
									<!-- End Chart -->

									<!-- Chart Legends -->
									<ul class="list-inline d-flex align-items-center justify-content-center text-center mb-0">
										<li class="list-inline-item px-5 mr-0">
											<div class="h2 font-weight-normal text-primary mb-1"><?php echo "". number_format(($clients/160)*100, 2). "%"; ?></div>
											<div class="text-muted">Monitored Subscribers (<?php echo $clients; ?>)</div>
										</li>
										<li class="list-inline-item px-5 mr-0">
											<div class="h2 font-weight-normal text-info mb-1"><?php echo "". number_format(((160-$clients)/160)*100, 2). "%"; ?></div>
											<div class="text-muted">Target Subscribers to be decided by NCC (160)</div>
										</li>
										<!-- <li class="list-inline-item px-5 mr-0">
											<div class="h2 font-weight-normal text-success mb-1">15%</div>
											<div class="text-muted">Conversion</div>
										</li> -->
									</ul>
									<!-- End Chart Legends -->
								</div>
								<!-- End Card Body -->
							</div>
							<!-- End Performance Chart -->
						</div>
						<div class="row">
							<div class="col-md-6 mb-5">

							</div>

							<div class="col-md-6 mb-5">

							</div>
						</div>

						<div class="row">
							<div class="col-md-12 mb-5">
								<div id = "embedded_map">
									<h1>Embedded Map </h1>
								</div>			
								<?php
								$location_latitude = 37.4234;
								$location_longitude = -122.084;
								?>

								<iframe src="https://www.openstreetmap.org/export/embed.html?bbox=<?php echo ($location_longitude - 0.001); ?>,<?php echo ($location_latitude - 0.001); ?>,<?php echo ($location_longitude + 0.001); ?>,<?php echo ($location_latitude + 0.001); ?>&amp;layer=mapnik&amp;marker=<?php echo $location_latitude; ?>,<?php echo $location_longitude; ?>" width="600" height="450" frameborder="0" scrolling="no"></iframe>

								<?php
								$locations = array(
									array(37.4234, -122.084),
									array(37.4234, -122.08400000000003),
									array(37.4234, -122.08400000000009),
								);
								?>

								<!-- <iframe src="https://www.openstreetmap.org/export/embed.html?bbox=<?php echo ($locations[0][1] - 0.001); ?>,<?php echo ($locations[0][0] - 0.001); ?>,<?php echo ($locations[2][1] + 0.001); ?>,<?php echo ($locations[2][0] + 0.001); ?>&amp;layer=mapnik<?php foreach ($locations as $loc) { echo "&amp;marker={$loc[0]},{$loc[1]}"; } ?>" width="600" height="450" frameborder="0" scrolling="no"></iframe> -->

							</div>
						</div>



						<div class="row">
							<div class="col-md-12 mb-5">
							<div id="subscribers-map">
							<!-- include the Google Maps API library -->
							<!-- <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD8771iut40kO8BXsfrENU_gN5soMCLnTk"></script> -->

							<h1>Google Map (c) </h1>
							<!-- create a div element to hold the map -->
							<div id="map" style="height: 400px;"></div>

							<script>
							// // create an array of location objects
							// var locations = [
							// 	{lat: 37.7749, lng: -122.4194, name: 'San Francisco'},
							// 	{lat: 40.7128, lng: -74.0060, name: 'New York'},
							// 	{lat: 51.5074, lng: -0.1278, name: 'London'}
							// ];

							// // create a map object centered on the first location
							// var map = new google.maps.Map(document.getElementById('map'), {
							// 	center: locations[0],
							// 	zoom: 6
							// });

							// // add markers for each location to the map
							// locations.forEach(function(location) {
							// 	var marker = new google.maps.Marker({
							// 	position: location,
							// 	map: map,
							// 	title: location.name
							// 	});
							// });
							</script>

							</div>
							</div>
						</div>


						<div class="row">
							<div style="max-width: 700px;">
									<?php $data_chart = $data_chart_clients; ?>
									<?php include 'sections/scripts/area_chart.php'; ?>

							</div>
							<canvas id="myChart" width="600" height="160"></canvas>
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

