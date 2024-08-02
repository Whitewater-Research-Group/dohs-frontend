<!DOCTYPE html>
<html lang="en">

<head>

<?php include __DIR__.'/sections/header_inner_page.php'; ?>
<title>View services</title>
<!-- Template Main CSS File -->
<link href="<?php echo pathinfo(base_url(),PATHINFO_DIRNAME)."/public/"."assets/css/style.css";?>" rel="stylesheet">
<style>
    .container {
      /* max-width: 500px; */
    }

    .error {
      display: block;
      padding-top: 5px;
      font-size: 14px;
      color: red;
    }
  </style>
</head>

<body>

  <!-- ======= Header ======= -->
      <?php include 'sections/menu_dashboard.php'; ?><!-- .navbar -->
  <!-- End Header -->


  <main id="main">



    <!-- ======= Details Section ======= -->
    <section id="details" class="details">
      <div class="container">


        <div class="row content">
          <div class="col-md-2">
          </div>
          <div class="col-md-8" data-aos="fade-right">
          <hr>  
          <h3>Edit services </h3>
          <?php 
                      Header('Access-Control-Allow-Headers:*'); //for allow any headers, insecure
                      Header('Access-Control-Allow-Methods:GET,POST,OPTIONS,PUT,DELETE'); //method allowed
          
          ?>
            <form method="post" id="createProduct" action="<?= site_url('/services/update') ?>">
                <input type="hidden" name="id" id="id" value="<?php echo $service['id']; ?>">
                <div class="form-group">
                    <label>Name</label>
                    <input type="text" name="name" class="form-control" value="<?php echo $service['name']; ?>">
                </div>
                <div class="form-group">
                    <label>Price</label>
                    <input type="number" name="price" class="form-control" value="<?php echo $service['price']; ?>">
                </div>
                <div class="form-group">
                    <label>Category</label>
                    <textarea type="text" name="category" class="form-control"><?php echo $service['category']; ?></textarea>

                    <label>Description</label>
                    <textarea type="text" name="description" class="form-control"><?php echo $service['description']; ?></textarea>
                    <label>short_description_1</label>
                    <textarea type="text" name="short_description_1" class="form-control"><?php echo $service['short_description_1']; ?></textarea>
                    <label>short_description_2</label>
                    <textarea type="text" name="short_description_2" class="form-control"><?php echo $service['short_description_2']; ?></textarea>
                    <label>short_description_3</label>
                    <textarea type="text" name="short_description_3" class="form-control"><?php echo $service['short_description_3']; ?></textarea>
                    <label>short_description_4</label>
                    <textarea type="text" name="short_description_4" class="form-control"><?php echo $service['short_description_4']; ?></textarea>
                    <label>short_description_5</label>
                    <textarea type="text" name="short_description_5" class="form-control"><?php echo $service['short_description_5']; ?></textarea>
                </div>
                <div class="form-group">
                    <button type="submit" class="btn btn-primary btn-block">Save</button>
                </div>
            </form>

          </div>
        </div>



      </div>
    </section><!-- End Details Section -->


  <!-- ======= Footers and scripts ======= -->
  <?php include 'sections/footer.php'; ?>
  
  <!-- End Footer -->

  
  <script>
    if ($("#createProduct").length > 0) {
      $("#createProduct").validate({
        rules: {
          name: {
            required: true,
          },
          price: {
            required: true,
          },
          description: {
            required: true,
          },
        },
        messages: {
          name: {
            required: "Name is required.",
          },
          price: {
            required: "Price is required.",
          },
          description: {
            required: "Description is required.",
          },
        },
      })
    }
  </script>
</body>

</html>
