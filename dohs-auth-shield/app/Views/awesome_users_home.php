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
                         
                        </br>
                        <div class="">
                            <a href="<?php echo site_url($add_new_link) ?>" class="btn btn-success mb-2">Add <?php echo $table_name; ?></a>
                        </div>
                        <br>
                        <div class="table-responsive">       
                            <table class="card-table" id="products-list">
                                <thead>
                                    <tr class="small">
                                        <?php if($fields_short): ?>
                                        <?php foreach($fields_short as $key => $field): ?>
                                            <th class="font-weight-normal text-muted pb-3"><?php echo strtoupper($field); ?></th>
                                        <?php endforeach; ?>
                                        <?php endif; ?>
                                    </tr>
                                </thead>
                                <tbody>
                                    <?php if($table_rows): ?>
                                    <?php foreach($table_rows as $key => $row): ?>
                                    <tr>
                                        <?php if($fields_short): ?>
                                        <?php foreach($fields_short as $key => $field): ?>
                                            <td class="py-3"><?php echo ucfirst($row[$field]); ?></td>
                                            <!-- ucfirst ucwords(capitalize each word) strtoupper-->
                                        <?php endforeach; ?>
                                        <?php endif; ?>
                                        <td>
                                            <div class=row>
                                                <div class="col">
                                                    <a href="<?php echo site_url($edit_controller_name.'/'.$row['id']);?>" class="btn btn-primary btn-sm">Edit</a>
                                                </div>
                                                <div class="col">
                                                    <a href="<?php echo site_url($make_admin_controller_name.'/'.$row['id']);?>" class="btn btn-secondary btn-sm">Make Admin</a>
                                                </div>
                                                <div class="col">
                                                    <a href="<?php echo site_url($delete_controller_name.'/'.$row['id']);?>" class="btn btn-danger btn-sm">Delete</a>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <?php endforeach; ?>
                                    <?php endif; ?>
                                </tbody>
                            </table>
                        </div>

					</div>









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

