<!doctype html>
<html lang="en">
  <head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <title>Add Records</title>
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
        <br><h4> Add Record for <?php echo $controller_name; ?></h4>
        <form method="post" id="createProduct" action="<?= site_url($create_controller_name) ?>">
                    <?php if($fields): ?>
                    <?php foreach($fields as $key => $field): ?>
                        <div class= "form-floating mb-3 mt-3"> 
                        <?php 
                            //echo 'Data type for '. $fields[$key] 
                            //TODO: if(datatype is boolean....)
                            //if datatype is list ...load combo
                        ?>
                        <input type="text" class="form-control" 
                        name="<?php echo $field; ?>" id="<?php echo $field; ?>" 
                        placeholder="1">
                        <label for="<?php echo $field; ?>"><?php echo strtoupper($field); ?></label>
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