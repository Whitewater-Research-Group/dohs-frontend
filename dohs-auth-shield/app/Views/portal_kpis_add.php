<!DOCTYPE html>
<html>

<head>
  <title>Create Service</title>
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css">
  <style>
    .container {
      max-width: 500px;
    }

    .error {
      display: block;
      padding-top: 5px;
      font-size: 14px;
      color: red;
    }
  </style>
<?php include __DIR__.'/sections/header_inner_page.php'; ?>
  <!-- <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"> -->
</head>
<body>
     <!-- ======= Header ======= -->

         <?php include 'sections/menu_dashboard.php'; ?><!-- .navbar --><!-- .navbar -->

      <!-- End Header -->

  <div class="container mt-5">
    <form method="post" id="createProduct" action="<?= site_url('/services/store') ?>">
      <div class="form-group">
        <label>Name</label>
        <input type="text" name="name" class="form-control">
      </div>

      <div class="form-group">
        <label>Price</label>
        <input type="number" name="price" class="form-control">
      </div>


      <div class="form-group">
        <label>Category</label>
        <textarea type="text" name="category" class="form-control"></textarea>

        <label>Description</label>
        <textarea type="text" name="description" class="form-control"></textarea>
        <label>short_description_1</label>
                    <textarea type="text" name="short_description_1" class="form-control"> </textarea>
                    <label>short_description_2</label>
                    <textarea type="text" name="short_description_2" class="form-control"> </textarea>
                    <label>short_description_3</label>
                    <textarea type="text" name="short_description_3" class="form-control"> </textarea>
                    <label>short_description_4</label>
                    <textarea type="text" name="short_description_4" class="form-control"> </textarea>
                    <label>short_description_5</label>
                    <textarea type="text" name="short_description_5" class="form-control"> </textarea>
      </div>

      <div class="form-group">
        <button type="submit" class="btn btn-primary btn-block">Save</button>
      </div>
    </form>
  </div>

  <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.19.2/jquery.validate.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.19.2/additional-methods.min.js"></script>
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
