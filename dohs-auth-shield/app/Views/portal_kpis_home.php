<!doctype html>
<html lang="en">
  <head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <title>KPIs</title>
  <!-- <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"> -->
  <?php include __DIR__.'/sections/header_inner_page.php'; ?>
  <!-- <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"> -->
</head>
<body>
     <!-- ======= Header ======= -->

         <?php include 'sections/menu_dashboard.php'; ?><!-- .navbar --><!-- .navbar -->

      <!-- End Header -->

<div class="container mt-4">
   </br></br>
    <div class="d-flex justify-content-end">
        <a href="<?php echo site_url('/kpis/add') ?>" class="btn btn-success mb-2">Add Kpi</a>
	</div>
    
      <?php if (isset($_SESSION['msg'])): ?>
         <?php if (($_SESSION['msg']=="kpi saved to database successfully")): ?>
            <div class="alert alert-success alert-dismissible fade show" role="alert">
                  <?php echo  $_SESSION['msg']; ?>
            </div>
         <?php else: ?>
            <div class="alert alert-warning alert-dismissible fade show" role="alert">
                  <?php echo  $_SESSION['msg']; ?>
            </div>
         <?php endif; ?>
     <?php endif; ?>
  <div class="mt-3">
     <table class="table table-bordered" id="products-list">
       <thead>
          <tr>
             <th></th>
             <th>Name</th>
             <th>Typical <br> Value</th>
             <th>Description</th>
             <th>Action</th>
          </tr>
       </thead>
       <tbody>
          <?php if($kpis): ?>
          <?php foreach($kpis as $key => $kpi): ?>
          <tr>
             <td><?php echo $key+1; ?></td>
             <td><?php echo $kpi['name']; ?></td>
             <td><?php echo $kpi['typical_value']; ?></td>
             <td><?php echo $kpi['description']; ?></td>
             <td>
              <a href="<?php echo site_url('kpis/edit/'.$kpi['id']);?>" class="btn btn-primary btn-sm">Edit</a>
              <a href="<?php echo site_url('kpis/delete/'.$kpi['id']);?>" class="btn btn-danger btn-sm">Delete</a>
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