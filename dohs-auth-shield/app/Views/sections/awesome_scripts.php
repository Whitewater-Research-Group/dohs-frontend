<!-- Global Vendor -->
<script src="<?php echo base_url("assets/vendor/jquery/dist/jquery.min.js");?>"></script>
		<script src="<?php echo base_url("assets/vendor/jquery-migrate/jquery-migrate.min.js");?>"></script>
		<script src="<?php echo base_url("assets/vendor/popper.js/dist/umd/popper.min.js");?>"></script>
		<script src="<?php echo base_url("assets/vendor/bootstrap/dist/js/bootstrap.min.js");?>"></script>

		<!-- Plugins -->
		<script src="<?php echo base_url("assets/vendor/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.concat.min.js");?>"></script>
		<script src="<?php echo base_url("assets/vendor/chart.js/dist/Chart.min.js");?>"></script>
		<script src="<?php echo base_url("assets/vendor/chartjs-plugin-style/dist/chartjs-plugin-style.min.js");?>"></script>

		<!-- Initialization  -->
		<script src="<?php echo base_url("assets/js/sidebar-nav.js");?>"></script>
		<script src="<?php echo base_url("assets/js/main_awesome.js");?>"></script>

		<script src="<?php echo base_url("assets/js/charts/area-chart.js");?>"></script>
		<script src="<?php echo base_url("assets/js/charts/area-chart-small.js");?>"></script>
		<script src="<?php echo base_url("assets/js/charts/doughnut-chart.js");?>"></script>

		<script>
			// Ensure tableRows is defined
			if (typeof tableRows !== 'undefined') {
				// Extract labels (dates) and data (values)
				var labels = tableRows.map(function(row) {
					return row.date;
				});

				var data = tableRows.map(function(row) {
					return row.value;
				});

				// Create the chart
				var ctx = document.getElementById('myChart').getContext('2d');
				var myChart = new Chart(ctx, {
					type: 'line', // Change this to 'bar', 'pie', etc. for different chart types
					data: {
						labels: labels,
						datasets: [{
							label: 'Value',
							data: data,
							backgroundColor: 'rgba(75, 192, 192, 0.2)',
							borderColor: 'rgba(75, 192, 192, 1)',
							borderWidth: 1
						}]
					},
					options: {
						scales: {
							x: {
								beginAtZero: true
							},
							y: {
								beginAtZero: true
							}
						}
					}
				});
			}
		</script>
