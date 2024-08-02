<!doctype html>
<html lang="en">
  <head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <title>Edit Records</title>
  <!-- <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"> -->
  <?php include "sections/header_inner_page.php"; ?>
  <!-- <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"> -->
</head>
<body>
     <!-- ======= Header ======= -->

         <?php include 'sections/menu_dashboard.php'; ?><!-- .navbar --><!-- .navbar -->

      <!-- End Header -->


  <div class="container mt-5">
    <div class="row">
      <div class="col-md-2">
      </div>           
      <div class="col-md-8">     
                <!-- start card -->
                <div class="card">
                  <div class="card-header bg-white text-center py-3">
                    <h5 class="mb-0 fw-bold">Summary</h5>
                  </div>

                  <div class="card-body">
                    <ul>
                        <?php if($fields): ?>
                        <?php foreach($fields as $key => $field): ?>
                            <li><strong><?php echo $field; ?>:</strong> <?php echo $table_rows[$field]; ?></li>
                        <?php endforeach; ?>
                        <?php endif; ?>
                    </ul>
                  </div>

                  <div class="card-footer bg-white d-flex justify-content-between py-3">
                    <strong>--End of Record--</strong>

                  </div>
                </div>
                <!-- end card -->

      </div>
      <div class="col-md-2">
      </div>
    </div>
  </div>

  <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.21/css/jquery.dataTables.min.css">
<script type="text/javascript" src="https://cdn.datatables.net/1.10.21/js/jquery.dataTables.min.js"></script>
<script>
    $(document).ready( function () {
      $('#products-list').DataTable();
    });
</script>
</body>

</html>