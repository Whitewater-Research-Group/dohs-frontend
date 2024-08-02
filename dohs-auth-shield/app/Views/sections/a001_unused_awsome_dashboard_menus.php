								<!-- Activities -->
                                <div class="u-header-section">
					<div class="u-header-dropdown dropdown pt-1">
						<a id="activitiesInvoker" class="u-header-invoker d-flex align-items-center" href="#" role="button" aria-haspopup="true" aria-expanded="false"
						   data-toggle="dropdown"
						   data-offset="20">
						  <span class="position-relative">
								<span class="ti-email u-header-invoker__icon"></span>
								<span class="u-indicator u-indicator-top-right u-indicator-xxs bg-success"></span>
							</span>
						</a>

						<div class="u-header-dropdown__menu dropdown-menu dropdown-menu-right" aria-labelledby="activitiesInvoker" style="width: 360px;">
							<div class="card p-3">
								<div class="card-body p-0">
									<div class="list-group list-group-flush">
										<!-- Activity -->
										<a class="list-group-item link-dark px-0" href="#">
											<div class="media align-items-start">
												<img class="u-avatar-sm rounded-circle mr-3" src="<?php echo base_url("assets/img-temp/avatars/img1.jpg");?>" alt="Image description">
												
												<div class="media-body">
													<h5 class="h4 mb-1">Admin</h5>
													<p class="text-muted text-lh-1_4 mb-0">Message from admin</p>
												</div>
											</div>
										</a>
										<!-- End Activity -->

										<!-- Activity -->
										<a class="list-group-item link-dark px-0" href="#">
											<div class="media align-items-start">
												<img class="u-avatar-sm rounded-circle mr-3" src="<?php echo base_url("assets/img-temp/avatars/user-unknown.jpg");?>" alt="Image description">

												<div class="media-body">
													<h5 class="h4 mb-1">Development Team</h5>
													<p class="text-muted text-lh-1_4 mb-0">There are a few things you need to know</p>
												</div>
											</div>
										</a>
										<!-- End Activity -->
									</div>
								</div>

								<hr class="my-3">

								<div class="card-footer border-0 p-0">
									<a class="font-weight-semi-bold" href="#">All emails</a>
								</div>
							</div>
						</div>
					</div>
				</div>
				<!-- End Activities -->

				<!-- Notifications -->
				<div class="u-header-section">
					<div class="u-header-dropdown dropdown pt-1">
						<a id="notificationsInvoker" class="u-header-invoker d-flex align-items-center" href="#" role="button" aria-haspopup="true" aria-expanded="false"
						   data-toggle="dropdown"
						   data-offset="20">
						  <span class="position-relative">
								<span class="ti-bell u-header-invoker__icon"></span>
								<span class="u-indicator u-indicator-top-right u-indicator-xxs bg-danger"></span>
							</span>
						</a>

						<div class="u-header-dropdown__menu dropdown-menu dropdown-menu-right" aria-labelledby="notificationsInvoker" style="width: 360px;">
							<div class="card p-3">
								<div class="card-body p-0">
									<div class="list-group list-group-flush">
										<!-- Activity -->
										<a class="list-group-item link-dark px-0" href="#">
											<div class="media align-items-start">
												<div class="u-icon u-icon-sm rounded-circle bg-danger text-white mr-3">
													<span class="ti-dribbble"></span>
												</div>

												<div class="media-body">
													<h5 class="h4 mb-1">Pending Tasks</h5>
													<p class="text-muted text-lh-1_4 mb-0">Dont forget to chek the pending tasks below</p>
												</div>
											</div>
										</a>
										<!-- End Activity -->


									</div>
								</div>

								<hr class="my-3">

								<div class="card-footer border-0 p-0">
									<a class="font-weight-semi-bold" href="#">All activities</a>
								</div>
							</div>
						</div>
					</div>
				</div>
				<!-- End Notifications -->
                <!-- Settings -->
				<div class="u-header-section">
					<div class="u-header-dropdown dropdown pt-1">
						<a id="appsInvoker" class="u-header-invoker d-flex align-items-center" href="#" role="button" aria-haspopup="true" aria-expanded="false"
						   data-toggle="dropdown"
						   data-offset="20">
						  <span class="position-relative">
								<span class="ti-settings u-header-invoker__icon"></span>
							</span>
						</a>

						<div class="u-header-dropdown__menu dropdown-menu dropdown-menu-right" aria-labelledby="appsInvoker" style="width: 320px;">
							<div class="card p-0">
								<div class="card-body p-0">
									<div class="row no-gutters">
										<!-- App -->
										<div class="col-6 p-3">
											<a class="d-flex flex-column link-dark" href="">
												<div class="u-icon u-icon-sm rounded-circle bg-info text-white mx-auto mb-2">
													<span class="ti-settings"></span>
												</div>

												<span class="font-weight-semi-bold text-center">Light Theme</span>
											</a>
										</div>
										<!-- End App -->

										<!-- App -->
										<div class="col-6 p-3">
											<a class="d-flex flex-column link-dark" href="">
												<div class="u-icon u-icon-sm rounded-circle bg-info text-black mx-auto mb-2">
													<span class="ti-settings"></span>
												</div>

												<span class="font-weight-semi-bold text-center">Dark Theme</span>
											</a>
										</div>
										<!-- End App -->


									</div>
								</div>

								<hr class="my-0">

								<!-- <div class="card-footer border-0 p-3">
									<a class="font-weight-semi-bold" href="<?php //echo site_url('home/portal');?>">Portal Home</a>
								</div> -->
							</div>
						</div>
					</div>
				</div>
				<!-- End Settings -->

                				<!-- User Profile -->
				<div class="u-header-section u-header-section--profile">
					<div class="u-header-dropdown dropdown">
						<a class="link-muted d-flex align-items-center" href="#" role="button" id="userProfileInvoker" aria-haspopup="true" aria-expanded="false"
						   data-toggle="dropdown"
						   data-offset="0">
							<!-- <img class="u-header-avatar img-fluid rounded-circle mr-md-3" src="assets/img-temp/avatars/user-unknown.jpg" alt="User"> -->
							<span class="text-dark d-none d-md-inline-flex align-items-center">
								User (Admin)
								<span class="ti-angle-down text-muted ml-4"></span>
							</span>
						</a>

						<div class="u-header-dropdown__menu dropdown-menu dropdown-menu-right" aria-labelledby="userProfileInvoker" style="width: 260px;">
							<div class="card p-3">
								<div class="card-header border-0 p-0">
									<!-- Storage -->
									<div class="d-flex align-items-center justify-content-between mb-3">
										<span class="mb-0">Storage</span>

										<div class="text-muted">
											<strong class="text-dark">60gb</strong> / 100gb
										</div>
									</div>

									<div class="progress" style="height: 4px;">
										<div class="progress-bar bg-primary" role="progressbar" style="width: 65%;" aria-valuenow="65" aria-valuemin="0" aria-valuemax="100"></div>
									</div>
									<!-- End Storage -->
								</div>

								<hr class="my-4">

								<div class="card-body p-0">
									<ul class="list-unstyled mb-0">
										<li>
											<a class="link-dark" href="<?php echo site_url('logout');?>">Sign Out</a>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
				<!-- End User Profile -->