<?php
echo "<!DOCTYPE html>";
?>
<html lang="en" class="no-js">
	<!-- Head -->
	<head>
		<title>Dashboard - Weekly Report</title>
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
					<!-- Doughnut Chart -->
					<div class="row">

					</div>
					<!-- End Doughnut Chart -->

					<div class="row">


						<div class="col-md-10">
							<!-- Inventory Activity -->
							<div class="card h-100">
								<!-- Card Header -->
								<header class="card-header d-flex align-items-center justify-content-between">
									<h2 class="h4 card-header-title">Weekly Report</h2>
									<span class="text-muted">Item Number<?php //echo $data['id']; ?></span>
								</header>
								<!-- End Card Header -->

								<!-- Card Body -->
								<div class="card-body p-0">
									<div class="table-responsive">
                    <table class="card-table">
                      <thead>
                        <tr class="small">
                          <th class="font-weight-normal text-muted pb-3">Name</th>
                          <th class="font-weight-normal text-muted pb-3">Type</th>
                          <th class="font-weight-normal text-muted pb-3">Qty</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td class="py-3">
															<div class="media align-items-center">
																<div class="u-icon rounded-circle bg-primary text-white mr-3">
																	<span class="ti-paint-bucket"></span>
																</div>

																<div class="media-body">
																	<h4 class="font-weight-normal mb-0">Equipments</h4>
																	<small class="text-muted">1 hour ago</small>
																</div>
															</div>
                          </td>
                          <td class="py-3">Sprayers</td>
                          <td class="py-3">+7.00 ITEMS</td>
                        </tr>
                        <tr>
                          <td class="py-3">
															<div class="media align-items-center">
																<div class="u-icon rounded-circle bg-secondary text-white mr-3">
																	<span class="ti-truck"></span>
																</div>

																<div class="media-body">
																	<h4 class="font-weight-normal mb-0">Equipments</h4>
																	<small class="text-muted">2 hour ago</small>
																</div>
															</div>
                          </td>
                          <td class="py-3">Jack</td>
                          <td class="py-3">+8.00 ITEMS</td>
                        </tr>
                        <tr>
                          <td class="py-3">
															<div class="media align-items-center">
																<div class="u-icon rounded-circle bg-danger text-white mr-3">
																	<span class="ti-trello"></span>
																</div>

																<div class="media-body">
																	<h4 class="font-weight-normal mb-0">Tools</h4>
																	<small class="text-muted">15 minute ago</small>
																</div>
															</div>
                          </td>
                          <td class="py-3">Spanners - 13 flat</td>
                          <td class="py-3">+20.0 ITEMS</td>
                        </tr>
                        <tr>
                          <td class="py-3">
															<div class="media align-items-center">
																<div class="u-icon rounded-circle bg-info text-white mr-3">
																	<span class="ti-trello"></span>
																</div>

																<div class="media-body">
																	<h4 class="font-weight-normal mb-0">Tools</h4>
																	<small class="text-muted">30 minute ago</small>
																</div>
															</div>
                          </td>
                          <td class="py-3">Pliers</td>
                          <td class="py-3">-2.00 ITEMS</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
								</div>
								<!-- End Card Body -->

								<!-- Card Footer -->
								<footer class="card-footer border-0">
									<a class="font-weight-semi-bold" href="#">All activities</a>
								</footer>
								<!-- End Card Footer -->
							</div>
							<!-- End Recent Activity -->
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

