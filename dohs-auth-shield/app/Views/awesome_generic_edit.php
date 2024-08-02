<?php
echo "<!DOCTYPE html>";
?>
<html lang="en" class="no-js">
	<!-- Head -->
	<head>
		<title>Vehicles</title>
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
			<!-- Content -->
			<div class="u-content">
				<!-- Content Body -->
				<div class="u-body">
					<h1 class="h2 mb-2">Modify Database for <?php echo $controller_name; ?></h1>

					<!-- Breadcrumb -->
					<nav aria-label="breadcrumb">
						<ol class="breadcrumb">
							<li class="breadcrumb-item"><a href="<?php echo site_url('dashboard'); ?>">Dashboard</a></li>
							<!-- <li class="breadcrumb-item active" aria-current="page"><a href="<?php //echo site_url('portal/vehicles'); ?>">Portal Vehicles</a></li> -->
							<li class="breadcrumb-item active" aria-current="page">Modify Records</li>
						</ol>
					</nav>
					<!-- End Breadcrumb -->

					<div class="row">
						<div class="col-md-2">
						</div>           
						<div class="col-md-8">  
							<form method="post" id="createProduct" action="<?= site_url($update_controller_name) ?>">

									<!-- <input type="hidden" name="id" id="id" value="<?php //echo $id; ?>"> -->
									
										<?php if($fields): ?>
										<?php foreach($fields as $key => $field): ?>
											<div class= "form-floating"> 
												<label for="<?php echo $field; ?>"><?php echo strtoupper($field); ?></label>
												<input type="text" class="form-control" 
												name="<?php echo $field; ?>" id="<?php echo $field; ?>" placeholder="1"
												value="<?php echo $table_rows[$field]; ?>">
											
											</div>
										<?php endforeach; ?>
										<?php endif; ?>

								<div class="form-group">
									<button type="submit" class="btn btn-primary btn-block">Save</button>
								</div>
							</form>
						</div>
						<div class="col-md-2">
						</div>
					</div>


						<!-- Success Text -->
						<!-- 
						<div class="form-group">
							<label for="exampleInputText2_5">Engine Model Number</label>
							<input name="reg_number" id="reg_number" class="form-control form-pill" type="text" placeholder="">
							<div class="valid-feedback">Success feedback.</div> toggle hide/show
						</div> -->

						<!-- End Success Text -->	

						<!-- Input with Left Icon -->

						<!-- 
						<div class="form-group">
							<label for="exampleInputText2_2">Email:</label>

							<div class="input-group">
								<div class="input-group-prepend">
								<span class="input-group-text">
									<span class="ti-email"></span>
								</span>
								</div>

								<input id="email" name="email" value="<?php echo ""; ?>" class="form-control form-pill is-valid" type="text" placeholder="youremail@domain.com">
								<div class="valid-feedback is-hidden">Valid Email Check.</div> 
								 -->

							</div>
						</div>

						<!-- End Input with Left Icon -->




				<!-- Footer -->
				<?php include __DIR__.'/sections/awesome_footer.php'; ?>
				<!-- End Footer -->
			</div>
			<!-- End Content -->
		</main>
		<!-- End Main -->
		<?php include __DIR__.'/sections/awesome_scripts.php'; ?>
        <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
        <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.21/css/jquery.dataTables.min.css">
        <script type="text/javascript" src="https://cdn.datatables.net/1.10.21/js/jquery.dataTables.min.js"></script>

        <?php include 'sections/script_main.php';?>
        <script>
            $(document).ready( function () {
            $('#products-list').DataTable();
            });
        </script>
	</body>
	<!-- End Body -->
</html>

