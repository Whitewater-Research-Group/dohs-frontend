<!DOCTYPE html>
<html>

<head>

<?php //include '../sections/header.php'; ?>
<title>View services</title>
<?php include __DIR__.'/sections/header_inner_page.php'; ?>
  <!-- <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"> -->
</head>
<body>
     <!-- ======= Header ======= -->

         <?php include 'sections/menu_dashboard.php'; ?><!-- .navbar --><!-- .navbar -->

      <!-- End Header -->

  <div class="container mt-5">
    <form method="post" id="createProduct" action="<?= site_url('/dashboard') ?>">
    <input type="hidden" name="id" value="<?php echo $service['id']; ?>">
        <div class="form-group">
            <label>Name</label>
            <input type="text" name="name" class="form-control" value="<?php echo $service['name']; ?>">
        </div>
        <div class="form-group">
            <label>Price</label>
            <input type="number" name="price" class="form-control" value="<?php echo $service['price']; ?>">
        </div>
        <div class="form-group">
            <label>Description</label>
            <textarea type="text" name="description" class="form-control"><?php echo $service['description']; ?></textarea>
        </div>
        <div class="form-group">
            <button type="submit" class="btn btn-primary btn-block">Go Back to Dashboard</button>
        </div>
    </form>
  </div>
  <!-- ======= Footers and scripts ======= -->
  <?php //include '../sections/footer.php'; ?>
  
  <!-- End Footer -->
</body>

</html>