<!DOCTYPE html>
<html lang="en" class="no-js">
	<!-- Head -->
	<head>
		<title>Log In</title>

		<!-- Meta -->
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
		<meta http-equiv="x-ua-compatible" content="ie=edge">

		<!-- Favicon -->
		<link rel="shortcut icon" href="favicon.png" type="image/x-icon">

		<!--  Social tags -->
		<meta name="keywords" content="Awesome Dashboard UI Kit, Bootstrap, Template, Theme, Freebies, MIT license, Free, Download">
		<meta name="description" content="Awesome Dashboard UI Kit crafted by Htmlstream">
		<meta name="author" content="htmlstream.com">

		<!-- Schema.org -->
		<meta itemprop="name" content="mmlog autoFix">
		<meta itemprop="description" content="mmlog autoFix">
		<meta itemprop="image" content="assets/img-temp/aduik-preview.png">

		<!-- Twitter Card -->
		<meta name="twitter:card" content="product">
		<meta name="twitter:site" content="@mmlog_autoix">
		<meta name="twitter:title" content="mmlog autoFix">
		<meta name="twitter:description" content="mmlog autoFix">
		<meta name="twitter:creator" content="@htmlstream">
		<meta name="twitter:image" content="assets/img-temp/aduik-preview.png">

		<!-- Open Graph -->
		<meta property="og:type" content="website">
		<meta property="og:site_name" content="mmlog autoFix">
		<meta property="og:title" content="mmlog autoFix">
		<meta property="og:description" content="mmlog autoFix">
		<meta property="og:url" content="https://htmlstream.com/preview/awesome-dashboard-ui-kit/">
		<meta property="og:locale" content="en_US">
		<meta property="og:image" content="assets/img-temp/aduik-preview.png">
		<meta property="og:image:secure_url" content="assets/img-temp/aduik-preview.png">

		<!-- Web Fonts -->
		<link href="//fonts.googleapis.com/css?family=Roboto:300,400,500,700" rel="stylesheet">

		<!-- Components Vendor Styles -->
		<link rel="stylesheet" href="<?php echo base_url("assets/vendor/themify-icons/themify-icons.css");?>">

		<!-- Theme Styles -->
		<link rel="stylesheet" href="<?php echo base_url("assets/css/theme.css");?>">
	</head>
	<!-- End Head -->

	<!-- Body -->
	<body>
		<!-- Main -->
		<main class="d-flex flex-column u-hero u-hero--end mnh-100vh" style="background-image: url(assets/img-temp/bg/bg-1.png);">
			<div class="container py-11 my-auto">
				<div class="row align-items-center">
					<div class="col-md-6 col-lg-5 offset-lg-1 mb-4 mb-md-0">
						<!-- Card -->
						<div class="card">
							<!-- Card Body -->
							<div class="card-body p-4 p-lg-7">
								<h2 class="text-center mb-4">Sign in</h2>
								<?php if(session()->getFlashdata('msg')):?>
									<div class="alert alert-info">
									<?= session()->getFlashdata('msg') ?>
									</div>
								<?php endif;?>								<!-- Sign in Form -->
								<form action="<?php echo site_url(); ?>/Login/signin" method="post">
									<!-- Email -->
									<div class="form-group">
										<label for="email">Email</label>
										<input id="email" name="email" class="form-control" type="email" placeholder="Your email">
									</div>
									<!-- End Email -->

									<!-- Password -->
									<div class="form-group">
										<label for="password">Password</label>
										<input id="password" name="password" class="form-control" type="password" placeholder="Enter your password">
									</div>
									<!-- End Password -->

									<div class="d-flex align-items-center justify-content-between my-4">
										<!-- Remember -->
										<div class="custom-control custom-checkbox">
											<input id="rememberMe" class="custom-control-input" type="checkbox">
											<label class="custom-control-label text-dark" for="rememberMe">Remember me</label>
										</div>
										<!-- End Remember -->

										<a class="font-weight-semi-bold" href="account-password-recover.html">Forgot password?</a>
									</div>

									<button type="submit" class="btn btn-block btn-wide btn-primary text-uppercase">Sign In</button>

									<!-- Divider with Text -->
									<div class="divider-with-text text-center my-4 mx-7">
										<span class="divider-with-text__content">OR</span>
									</div>
									<!-- End Divider with Text -->



									<p class="text-center mb-0">
										Don’t have an account?
										<a class="font-weight-semi-bold" href="<?php echo site_url("Register");?>">Sign up here</a>
									</p>
								</form>
								<!-- End Sign in Form -->
							</div>
							<!-- End Card Body -->
						</div>
						<!-- End Card -->
					</div>

					<div class="col-md-6 col-lg-5 offset-lg-1">
						<div class="logo">
							<h1><a href="<?php echo site_url() ?>"><span style="color: #1b7339;">QoS/QoE App</span></a></h1>
							<!-- Uncomment below if you prefer to use an image logo -->
							<a href="index.html"><img src="assets/img/logo.png" alt="" class="img-fluid"></a>
						</div>
						<p class="font-weight-semi-bold text-primary mb-5">Qualiity</p>
						<!-- Benefits -->
						<ul class="list-unstyled mb-11">

						</ul>
						<!-- End Benefits -->

						<!-- <blockquote class="blockquote mb-0">
							<p class="mb-3">From</p>
							<footer class="blockquote-footer">
								<img class="u-avatar-sm img-fluid rounded-circle mr-3" src="<?php //echo base_url("assets/img-temp/avatars/img1.jpg");?>" alt="User Profile">
								Research Team
							</footer>
						</blockquote> -->
					</div>
				</div>
			</div>

			<!-- Footer -->
			<footer class="u-footer mt-auto">
				<div class="container">
					<div class="d-md-flex align-items-md-center text-center text-md-left text-muted">
						<!-- Footer Menu -->
						<ul class="list-inline mb-3 mb-md-0">
							<li class="list-inline-item mr-4">
								<a class="text-muted" href="https://web.facebook.com/" target="_blank">About</a>
							</li>
							<li class="list-inline-item">
								<a class="text-muted" href="https://web.facebook.com/" target="_blank">Learn More</a>
							</li>
						</ul>
						<!-- End Footer Menu -->

						<!-- Copyright -->
						<span class="text-muted ml-auto">&copy; 2022. All Rights Reserved.</span>
						<!-- End Copyright -->
					</div>
				</div>
			</footer>
			<!-- End Footer -->
		</main>
		<!-- End Main -->
	</body>
	<!-- End Body -->
</html>