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
					<h1 class="h2 mb-2">Modify Database</h1>

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
                    </br>
                        <div class="d-flex justify-content-end">
                            <a href="<?php echo site_url($add_new_link) ?>" class="btn btn-success mb-2">Add <?php echo $table_name; ?></a>
                        </div>
                        <br><h4> Add Record  for <?php echo $controller_name; ?></h4>  
						<?php //echo $is_display_table. '</br>'; ?>
						<?php if(isset($is_display_table) && $is_display_table=="true"): ?>
						<div class="table-responsive">
							<table class="card-table" id="vehicles_list">
								<thead>
									<tr class="small">
										<th class="font-weight-normal text-muted pb-3">Vehicle ID</th>
										<th class="font-weight-normal text-muted pb-3">Name</th>
										<th class="font-weight-normal text-muted pb-3">Brand</th>
										<th class="font-weight-normal text-muted pb-3">Model</th>
										<th class="font-weight-normal text-muted pb-3">Reg. No.</th>
										<th class="font-weight-normal text-muted pb-3">Action</th>
									</tr>
								</thead>
								<tbody>
									<?php if (isset($all_vehicles)): ?>
									<?php foreach($all_vehicles as $key_vehicles => $val_vehicles): ?>
									<tr>
										<td class="py-3"><?php echo $val_vehicles['id']; ?></td>
										<td class="py-3"><h4 class="font-weight-normal mb-0"><?php echo $val_vehicles['name']; ?></h4></td>
										<td class="py-3"><?php echo $val_vehicles['car_brand']; ?></td>
										<td class="py-3"><?php echo $val_vehicles['car_model']; ?></td>
										<td class="py-3"><?php echo $val_vehicles['reg_number']; ?></td>
										<td class="py-3">
										<a href="<?php echo site_url('dashboard/modify_vehicles/'.$val_vehicles['id'].'/false');?>" class="btn btn-primary btn-sm">Edit</a>
										<!-- <button  onClick="edit_vehicle()" class="btn btn-primary btn-sm">Edit JS</a>										 -->
										</td>
									</tr>
									<?php endforeach; ?>
									<?php endif; ?>
								</tbody>
							</table>
						</div>
						<?php endif; ?>






						<div class="col-md-9 mb-5">
							<form class="h-100" action="<?php echo site_url(); ?>/Dashboard/update_vehicles" method="post">
								
								<!-- id 	created_at 	name 	address 	email 	car_brand 	
								car_model 	car_model_year 	vin_number 	reg_number 	phone 	engine_type 	engine_mo -->
								<!-- Card -->
								<div class="card h-100">
									<!-- Card Header -->
									<header class="card-header">
										<h2 class="h4 card-header-title">Vehicles</h2>
									</header>
									<!-- End Card Header -->

									<!-- Card Body -->
									<div class="card-body pt-0">
										<!-- Text -->
										<div class="form-group">
											<label for="id">Vehicle ID</label>
											<input id="id" name="id" value="<?php echo  $vehicles['id']; ?>" class="form-control form-pill" type="text" placeholder="Placeholder">
										</div>
										<!-- End Text -->

										<hr class="my-4">

										<!-- Input with Left Icon -->
										<div class="form-group">
											<label for="exampleInputText2_2">Created at:</label>

											<div class="input-group">
												<div class="input-group-prepend">
												<span class="input-group-text">
													<span class="ti-calendar"></span>
												</span>
												</div>
												<input type="date" id="created_at" name="created_at" value="<?php echo date($vehicles['created_at']); ?>" class="form-control form-pill" type="text" placeholder="dd/mm/yyyy">
											</div>
										</div>
										<!-- End Input with Left Icon -->


										<!-- Disabled Text -->
										<div class="form-group">
											<label for="exampleInputText2_4">Name</label>
											<input id="name" name="name" value="<?php echo $vehicles['name']; ?>" class="form-control form-pill" type="text" placeholder="name">
											<small class="form-text text-muted">Name of the Vehicle Owner.</small>
										</div>
										<!-- End Disabled Text -->

										<!-- Input with Right Icon -->
										<div class="form-group">
											<label for="address">Address</label>

											<div class="input-group">
												<input id="address" name="address" value="<?php echo $vehicles['address']; ?>" class="form-control form-pill" type="text" placeholder="Address">

												<div class="input-group-append">
												<span class="input-group-text">
													<span class="ti-user"></span>
												</span>
												</div>
											</div>
										</div>
										<!-- End Input with Right Icon -->

										<hr class="my-4">

										<!-- Input with Left Icon -->
										<div class="form-group">
											<label for="exampleInputText2_2">Email:</label>

											<div class="input-group">
												<div class="input-group-prepend">
												<span class="input-group-text">
													<span class="ti-email"></span>
												</span>
												</div>

												<input id="email" name="email" value="<?php echo $vehicles['email']; ?>" class="form-control form-pill is-valid" type="text" placeholder="youremail@domain.com">
												<div class="valid-feedback is-hidden">Valid Email Check.</div> 
												<!-- toggle hide/show -->

											</div>
										</div>
										<!-- End Input with Left Icon -->

										<!-- Error Text -->
										<div class="form-group">
											<label for="car_brand">Car Brand</label>
											<input id="car_brand" name="car_brand" value="<?php echo $vehicles['car_brand']; ?>" class="form-control form-pill is-invalid" type="text" placeholder="e.g Toyota">
											<div class="invalid-feedback">Car brand</div>
										</div>
										<!-- End Error Text -->

										<!-- Success Text -->
										<div class="form-group">
											<label for="car_model">Car Model</label>
											<input id="car_model" name="car_model" value="<?php echo $vehicles['car_model']; ?>" class="form-control form-pill" type="text" placeholder="Car Model">
											<!-- <div class="valid-feedback">Success feedback.</div> toggle hide/show-->
										</div>
										<!-- End Success Text -->
										
										<!-- Success Text -->
										<div class="form-group">
											<label for="exampleInputText2_5">Car Model Year</label>
											<input name="car_model_year" id="car_model_year" class="form-control form-pill" type="text" placeholder="Car Model Year">
											<!-- <div class="valid-feedback">Success feedback.</div> toggle hide/show-->
										</div>
										<!-- End Success Text -->

										<!-- Success Text -->
										<div class="form-group">
											<label for="exampleInputText2_5">VIN</label>
											<input name="vin" id="vin" class="form-control form-pill" type="text" placeholder="VIN">
											<!-- <div class="valid-feedback">Success feedback.</div> toggle hide/show-->
										</div>
										<!-- End Success Text -->
										<!-- Success Text -->
										<div class="form-group">
											<label for="exampleInputText2_5">Registration Number</label>
											<input name="reg_number" id="reg_number" class="form-control form-pill" type="text" placeholder="">
											<!-- <div class="valid-feedback">Success feedback.</div> toggle hide/show-->
										</div>
										<!-- End Success Text -->
										<!-- Success Text -->
										<div class="form-group">
											<label for="exampleInputText2_5">phone</label>
											<input name="phone" id="phone" class="form-control form-pill" type="text" placeholder="+234 0800 000 0000">
											<!-- <div class="valid-feedback">Success feedback.</div> toggle hide/show-->
										</div>
										<!-- End Success Text -->	
										<!-- Success Text -->
										<div class="form-group">
											<label for="exampleInputText2_5">Engine Type</label>
											<input name="reg_number" id="reg_number" class="form-control form-pill" type="text" placeholder="">
											<!-- <div class="valid-feedback">Success feedback.</div> toggle hide/show-->
										</div>
										<!-- End Success Text -->

										<!-- Success Text -->
										<div class="form-group">
											<label for="exampleInputText2_5">Engine Model Number</label>
											<input name="reg_number" id="reg_number" class="form-control form-pill" type="text" placeholder="">
											<!-- <div class="valid-feedback">Success feedback.</div> toggle hide/show-->
										</div>
										<!-- End Success Text -->						
										<!-- Success Text -->
										<div class="form-group">
											<label for="exampleInputText2_5">Mileage</label>
											<input name="mileage" id="mileage" class="form-control form-pill" type="text" placeholder="">
											<!-- <div class="valid-feedback">Success feedback.</div> toggle hide/show-->
										</div>
										<!-- End Success Text -->	

										<!-- Success Text -->
										<div class="form-group">
											<label for="exampleInputText2_5">Engine Model Number</label>
											<input name="reg_number" id="reg_number" class="form-control form-pill" type="text" placeholder="">
											<!-- <div class="valid-feedback">Success feedback.</div> toggle hide/show-->
										</div>
										<!-- End Success Text -->	

										<button type="submit" class="btn btn-block btn-wide btn-primary text-uppercase">Save to Database</button>

									</div>
									<!-- End Card Body -->
								</div>
								<!-- End Card -->
							</form>
						</div>
					</div>

					<div class="row" id="options">
						<div class="col-md-6 mb-5">
							<form action="dashboard/modify_db">
								<!-- Card -->
								<div class="card">
									<!-- Card Header -->
									<header class="card-header">
										<h2 class="h4 card-header-title">Job Type</h2>
									</header>
									<!-- End Card Header -->

									<!-- Card Body -->
									<div class="card-body pt-0">
										<!-- Checkbox -->
										<div class="form-group">
											<div class="custom-control custom-checkbox">
												<input id="chk_mechanical" class="custom-control-input" type="checkbox">
												<label class="custom-control-label" for="exampleCheck4">Mechanical</label>
											</div>
										</div>
										<!-- End Checkbox -->

										<!-- Checkbox Checked -->
										<div class="form-group">
											<div class="custom-control custom-checkbox">
												<input id="checkElectrical" class="custom-control-input" type="checkbox" checked>
												<label class="custom-control-label" for="checkExterior">Electrical</label>
											</div>
										</div>
										<!-- End Checkbox Checked -->

										<!-- Checkbox Checked -->
										<div class="form-group">
											<div class="custom-control custom-checkbox">
												<input id="checkExterior" class="custom-control-input" type="checkbox" checked>
												<label class="custom-control-label" for="checkExterior">Exterior body work</label>
											</div>
										</div>
										<!-- End Checkbox Checked -->

										<!-- Checkbox Checked -->
										<div class="form-group">
											<div class="custom-control custom-checkbox">
												<input id="checkInterior" class="custom-control-input" type="checkbox" checked>
												<label class="custom-control-label" for="checkInterior">Interior body work</label>
											</div>
										</div>
										<!-- End Checkbox Checked -->

										<hr class="my-4">


									</div>
									<!-- End Card Body -->
								</div>
								<!-- End Card -->
							</form>
						</div>

						<div class="col-md-6 mb-5 mb-md-0">
							<!-- Card -->
							<div class="card h-100">
								<!-- Card Header -->
								<header class="card-header">
									<h2 class="h4 card-header-title">Options</h2>
								</header>
								<!-- End Card Header -->

								<!-- Card Body -->
								<div class="card-body pt-0">
									<div class="custom-control custom-switch mb-2">
										<input type="checkbox" class="custom-control-input" id="customSwitch1-1">
										<label class="custom-control-label" for="customSwitch1-1">Dont Save</label>
									</div>

									<div class="custom-control custom-switch mb-2">
										<input type="checkbox" class="custom-control-input" id="customSwitch1-2" checked>
										<label class="custom-control-label" for="customSwitch1-2">Use short date format</label>
									</div>
								</div>
								<!-- End Card Body -->
							</div>
							<!-- End Card -->
						</div>
					</div>

				</div>
				<!-- End Content Body -->

				<!-- Footer -->
				<?php include __DIR__.'/sections/awesome_footer.php'; ?>
				<!-- End Footer -->
			</div>
			<!-- End Content -->
			<!-- End Content -->
		</main>
		<!-- End Main -->
		<?php include __DIR__.'/sections/awesome_scripts.php'; ?>
		<script>
			function edit_vehicle(){
				document.getElementById("vehicles_list").innerHTML = "";
				document.getElementById("id").value=1;
				document.getElementById("created_at").value="created @@@";
				
				//document.getElementByClass("Table").appendStyle="{display:none}";
			}

		</script>
	</body>
	<!-- End Body -->
</html>

