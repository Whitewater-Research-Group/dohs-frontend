<!DOCTYPE html>
<html lang="en">

<head>

<?php include __DIR__.'/sections/header_inner_page.php'; ?>
<title>Edit Jobss</title>
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

            <form method="post" id="createProduct" action="<?= site_url('/jobs/update') ?>">

                <input type="hidden" name="vehicles_json" id="vehicles_json" value="<?php echo $vehicles_json ?>">
                <div class="form-group">
                    <label>Is this Job for a new Client/Vehicle?</label>
                    <input type="text" name="name" class="form-control" value="<?php //echo $accounts['id']; ?>">
                </div>
                
                <div class="accordion">

                </div>

                <div class="list-group mx-0">
                    <label class="list-group-item d-flex gap-2">
                    <input class="form-check-input flex-shrink-0" type="radio" name="listGroupRadios" id="listGroupRadios1" value="" checked="">
                    <span>
                        Income/Revenue
                        <small class="d-block text-muted">Payment for Jobs, sales etc</small>
                    </span>
                    </label>
                    <label class="list-group-item d-flex gap-2">
                    <input class="form-check-input flex-shrink-0" type="radio" name="listGroupRadios" id="listGroupRadios2" value="">
                    <span>
                        Expenditure
                        <small class="d-block text-muted">Expenses, salaries, purchases etc</small>
                    </span>
                    </label>

                </div>

                  
                  
                  <label for="cars">Transaction Type</label>
                  <select name="cars" id="mySelect">
                  <option value="Tax Payments">Revenue</option>
                    <option value="Transportation">Transportation</option>
                    <option value="Refreshments">Refreshments</option>
                    <option value="Garage maintenance">Garage maintenance</option>
                    <option value="Office maintenance">Office maintenance</option>
                    <option value="Vehicle Parts">Vehicle Parts</option>
                    <option value="Loan payments">Loan payments</option>
                    <option value="Salary advance">Salary advance</option>
                    <option value="Tax Payments">Tax Payments</option>
                    
                    <option value="General">General Expenses</option>
                  </select>
                  <input id="myInput" type="text" placeholder="Search..">


                  <!-- particulars 	payments 	revenue 	balance 	transaction_type 	transaction_id 	 -->
                    <div class="form-floating mb-3 mt-3"> 
                    <input type="text" class="form-control" name="id" id="id" placeholder="ID" value="<?php //echo $accounts['id']; ?>">
                    <label for="id">id</label>
                    </div>
                    <div class="form-floating mb-3 mt-3"> 
                    <input type="text" class="form-control" name="date" id="date" placeholder="date" value="1/1/1900">
                    <label for="date">date (Search + lazy loading using offset and limit in API)</label>
                    </div>
                    <div class="form-floating mb-3 mt-3"> 
                    <input type="text" class="form-control" name="particulars" id="particulars" placeholder="1" value="hub">
                    <label for="particulars">particulars</label>
                    </div>
                                        <div class="form-floating mb-3 mt-3"> 
                    <input type="text" class="form-control" name="payments" id="payments" placeholder="1" value="1">
                    <label for="payments">payments</label>
                    </div>
                                        <div class="form-floating mb-3 mt-3"> 
                    <input type="text" class="form-control" name="revenue" id="revenue" placeholder="1" value="120">
                    <label for="revenue">revenue</label>
                    </div>
                                        <div class="form-floating mb-3 mt-3"> 
                    <input type="text" class="form-control" name="balance" id="balance" placeholder="1" value="100">
                    <label for="balance">balance</label>
                    </div>
                    <div class="form-floating mb-3 mt-3"> 
                    <input type="text" class="form-control" name="transaction_type" id="transaction_type" placeholder="1" value="uwelu man">
                    <label for="transaction_type">transaction_type</label>
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

  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
  <?php include 'sections/script_main.php'; ?>
  <!-- <h2>Search for Account Type</h2>
  <p>Type something in the input field to search the list for specific items:</p>  
  <input id="myInput" type="text" placeholder="Search..">
  <br> -->

  <!-- <ul id="myList">
    <li>Income</li>
    <li>Expendiure</li>
    <li>Salaries</li>
    <li>Job</li>
  </ul> -->
  <div id="old_content_div">
    lazy
    <span id="new_content_div">Lzy stuff</span>
  </div>
  
  <script>
    $(document).ready(function(){
      //---search feture----
      $("#myInput").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        //ul list
        $("#myList li").filter(function() {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
        //select list
        $("#mySelect option").filter(function() {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
      });
      //-----End serch fxn

      // ----lazylod feture
      $(window).scroll(function() {
          if($(window).scrollTop() == $(document).height() - $(window).height()) {
                // ajax call get data from server and append to the div
                console.log("bottom of page");
                $('#new_content_div').val=("loaded");
                let new_element=$('#new_content_div');
                
                new_element.hide().appendTo('.old_conent_div').fadeIn(4000); //appends elements in nice way
                $(window).scrollTop($(window).scrollTop()-1); ///assures that your function never stops at the bottom of the page
          }
      });
      //---end lazy load

      //---Lazy load on scrolling div----
      $('#someScrollingDiv').on('scroll', function() {
          let div = $(this).get(0);
          if(div.scrollTop + div.clientHeight >= div.scrollHeight) {
              // do the lazy loading here
          }
      });
      //---end lazy div

      //-------another lazy load div-----

      //---------end another lazy load div
      // $(window).scroll(function() {
      //     var top_of_element = $("#element").offset().top;
      //     var bottom_of_element = $("#element").offset().top + $("#element").outerHeight();
      //     var bottom_of_screen = $(window).scrollTop() + $(window).innerHeight();
      //     var top_of_screen = $(window).scrollTop();

      //     if ((bottom_of_screen > top_of_element) && (top_of_screen < bottom_of_element)){
      //         // the element is visible, do something
      //     } else {
      //         // the element is not visible, do something else
      //     }
      // });

    });
</script>


  <script>
    // if ($("#createProduct").length > 0) {
    //   $("#createProduct").validate({
    //     rules: {
    //       name: {
    //         required: true,
    //       },
    //       price: {
    //         required: true,
    //       },
    //       description: {
    //         required: true,
    //       },
    //     },
    //     messages: {
    //       name: {
    //         required: "Name is required.",
    //       },
    //       price: {
    //         required: "Price is required.",
    //       },
    //       description: {
    //         required: "Description is required.",
    //       },
    //     },
    //   })
    // }
  </script>
</body>

</html>
