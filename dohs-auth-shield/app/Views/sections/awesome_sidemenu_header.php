<header class="u-header">
			<!-- Header Left Section -->
			<div class="u-header-left">
				<!-- Header Logo -->
				<a class="u-header-logo" href="<?php echo site_url();?>">
					<span style="color: #00FF00;">QoS/QoE App</span>
					<!-- <img class="u-sidebar-logo__icon" src="<?php //echo base_url("assets/img/logo_15_15.png");?>" alt="Icon"> -->
					<!-- <img class="u-sidebar-logo__text" src="<?php //echo base_url("assets/svg/logo-text-light.svg");?>" alt="Awesome"> -->
				</a>	
				<!-- End Header Logo -->
			</div>
			<!-- End Header Left Section -->

			<!-- Header Middle Section -->
			<div class="u-header-middle">
				<!-- Sidebar Invoker -->
				<div class="u-header-section">
					<a class="js-sidebar-invoker u-header-invoker u-sidebar-invoker" href="#"
					   data-is-close-all-except-this="true"
					   data-target="#sidebar">
						<span class="ti-align-left u-header-invoker__icon u-sidebar-invoker__icon--open"></span>
						<span class="ti-align-justify u-header-invoker__icon u-sidebar-invoker__icon--close"></span>
					</a>
				</div>
				<!-- End Sidebar Invoker -->

				<!-- Header Search -->
				<div class="u-header-section justify-content-sm-start flex-grow-1 py-0">
					<div class="u-header-search"
					     data-search-mobile-invoker="#headerSearchMobileInvoker"
					     data-search-target="#headerSearch">
						<!-- Header Search Invoker (Mobile Mode) -->
						<a id="headerSearchMobileInvoker" class="u-header-search__mobile-invoker align-items-center" href="#">
							<span class="ti-search"></span>
						</a>
						<!-- End Header Search Invoker (Mobile Mode) -->

						<!-- Header Search Form -->
						<div id="headerSearch" class="u-header-search-form">
							<form action="<?php echo site_url('dashboard/search');?>" method="get" class="w-100">
								<div class="input-group h-100">
									<button class="btn-link input-group-prepend u-header-search__btn" type="submit">
										<span class="ti-search"></span>
									</button>
									<input class="form-control u-header-search__field" name="search_qos" id="search_qos" type="search" placeholder="Type to search…">
								</div>
							</form>
						</div>
						<!-- End Header Search Form -->
					</div>
				</div>
				<!-- End Header Search -->





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
			</div>
			<!-- End Header Middle Section -->
		</header>