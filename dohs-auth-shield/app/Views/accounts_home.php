<!doctype html>
<html lang="en">
  <head>
  <!-- <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"> -->
  <title>Accounts</title>
  <?php include __DIR__.'/sections/header_inner_page.php'; ?>
  <!-- <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"> -->
</head>
<body>
     <!-- ======= Header ======= -->

         <?php include 'sections/menu_dashboard.php'; ?><!-- .navbar --><!-- .navbar -->

      <!-- End Header -->

<div class="container mt-4">
      </br>
    <div class="d-flex justify-content-end">
        <a href="<?php echo site_url('/accounts/add') ?>" class="btn btn-success mb-2">Add Transaction</a>
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
             
             <th>Date</th>
             <th>Particulars</th>
             <th>Transaction <br> Type</th>
             <th>Payments</th>
             <th>Revenue</th>
             <th>Balance</th>
             <th>Action</th>
          </tr>
       </thead>
       <tbody>
          <?php if($accounts): ?>
          <?php foreach($accounts as $key => $accounts): ?>
          <tr>
             <td><?php echo $accounts['date']; ?></td>
             <td><?php echo $accounts['particulars']; ?></td>
             <td><?php echo $accounts['transaction_type']; ?></td>
             <td><?php echo $accounts['payments']; ?></td>
             <td><?php echo $accounts['revenue']; ?></td>
             <td><?php echo $accounts['balance']; ?></td>
             <td>
              <a href="<?php echo site_url('accounts/edit/'.$accounts['id']);?>" class="btn btn-primary btn-sm">Edit</a>
              <a href="<?php echo site_url('accounts/delete/'.$accounts['id']);?>" class="btn btn-danger btn-sm">Delete</a>
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
<script>
    $(document).ready( function () {
      $('#products-list').DataTable();
    });
</script>
</body>
</html>