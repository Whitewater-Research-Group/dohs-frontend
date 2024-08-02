<nav class="u-sidebar-nav">
						<!-- Sidebar Nav Menu -->
						<ul class="u-sidebar-nav-menu u-sidebar-nav-menu--top-level">

							<!-- Dashboard -->
							<li class="u-sidebar-nav-menu__item">
								<a class="u-sidebar-nav-menu__link active" href="<?php echo site_url("dashboard");?>">
									<span class="ti-dashboard u-sidebar-nav-menu__item-icon"></span>
									<span class="u-sidebar-nav-menu__item-title">Dashboard</span>
								</a>
							</li>
							<!-- End Dashboard -->
							<!-- Workflow -->
							<li class="u-sidebar-nav-menu__item">
								<a class="u-sidebar-nav-menu__link" href="#"
								   data-target="#menuItemUIBase">
								   <span class="ti-save u-sidebar-nav-menu__item-icon"></span>
									<span class="u-sidebar-nav-menu__item-title">Modify Database</span>
									<span class="ti-angle-down u-sidebar-nav-menu__item-arrow"></span>
								</a>

								<ul id="menuItemUIBase" class="u-sidebar-nav-menu u-sidebar-nav-menu--second-level" style="display: none;">
									<li><a class="u-sidebar-nav-menu__link" href="<?php echo site_url("dashboard/users");?>">Users</a></li>
									<li><a class="u-sidebar-nav-menu__link" href="<?php echo site_url("dashboard/generic/kpis");?>">KPIs</a></li>
								</ul>


							</li>
							<!-- End UI Base -->




							<!-- Account Pages -->
							<li class="u-sidebar-nav-menu__item">
								<a class="u-sidebar-nav-menu__link" href="<?php echo site_url("dashboard/generic/users");?>"
								   data-target="#menuItemAccountPages">
									<span class="ti-layers-alt u-sidebar-nav-menu__item-icon"></span>
									<span class="u-sidebar-nav-menu__item-title">Users Account</span>
									<span class="ti-angle-down u-sidebar-nav-menu__item-arrow"></span>
								</a>

								<ul id="menuItemAccountPages" class="u-sidebar-nav-menu u-sidebar-nav-menu--second-level" style="display: none;">

									<!-- Sign Up -->
									<li class="u-sidebar-nav-menu__item">
										<a class="u-sidebar-nav-menu__link" href="<?php echo site_url("/dashboard/register");?>">
											<span class="u-sidebar-nav-menu__item-icon">R</span>
											<span class="u-sidebar-nav-menu__item-title">Register User</span>
										</a>
									</li>
									<!-- End Sign Up -->

								</ul>
							</li>
							<!-- End Account Pages -->


							<li class="u-sidebar-nav-menu__divider"></li>

							<!-- Documentation -->
							<li class="u-sidebar-nav-menu__item">
								<a class="u-sidebar-nav-menu__link" href="">
									<span class="ti-files u-sidebar-nav-menu__item-icon"></span>
									<span class="u-sidebar-nav-menu__item-title">Documentation</span>
								</a>
							</li>
							<!-- End Documentation -->

						</ul>
						<!-- End Sidebar Nav Menu -->
					</nav>