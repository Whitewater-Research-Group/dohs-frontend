<!doctype html>
<html lang="en">
  <head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <title>View Records</title>
  <!-- <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"> -->
  <?php include "sections/header_inner_page.php"; ?>
  <!-- <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"> -->
</head>
<body>
     <!-- ======= Header ======= -->

         <?php include 'sections/menu_dashboard.php'; ?><!-- .navbar --><!-- .navbar -->

      <!-- End Header -->


<div class="container mt-4">
   </br>
    <div class="d-flex justify-content-end">
        <a href="<?php echo site_url($add_new_link) ?>" class="btn btn-success mb-2">Add <?php echo $table_name; ?></a>
	</div>
    <?php
     if (isset($_SESSION['msg'])) {
        echo $_SESSION['msg'];
      }
     ?>
  <div class="mt-3">
     <table class="table table-bordered" id="products-list">
       <thead>
          <tr>
            <?php if($fields_short): ?>
            <?php foreach($fields_short as $key => $field): ?>
                <th><?php echo strtoupper($field); ?></th>
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
                    <td><?php echo $row[$field]; ?></td>
                    <!-- <td><?php //echo $key+1; ?></td> -->
                <?php endforeach; ?>
                <?php endif; ?>
             <td>
                                            <div class=row>
                                                <div class="col">
                                                    <a href="<?php echo site_url($edit_controller_name.'/'.$row['id']);?>" class="btn btn-primary btn-sm">Edit</a>
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
</html>