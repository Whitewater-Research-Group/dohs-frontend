<!DOCTYPE html>
<html lang="en">

<head>

<?php include __DIR__.'/sections/header.php'; ?>
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
  <!-- ======= Modal ======= -->
    <div class="modal" id="exampleModalCenteredScrollable" tabindex="-1" aria-labelledby="exampleModalCenteredScrollableTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalCenteredScrollableTitle">Select Vehicle ID</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p>Below is list of all the vehicles in the databse nd ssocited IDs. Select ny one of them
            </p>
            <div class="card">
              <div class="card-header bg-white text-center py-3">
                <h5 class="mb-0 fw-bold">Vehicles IDs</h5>
              </div>

              <div class="card-body">
                <ul id="vehicle_list" class="list-group">
                  <li class="list-group-item"><strong>Vehicle Name: </strong>ID</li>

                </ul>
              </div>

              <div class="card-footer bg-white d-flex justify-content-between py-3">
                <a href="">See more:</a>
              </div>
            </div>
            <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
            <p>Closing line .</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <!-- <button type="button" class="btn btn-primary">Save changes</button> -->
          </div>
        </div>
      </div>
    </div>
  <!-- ======= End Modal ======= -->

  <!-- ======= Header ======= -->
      <?php include __DIR__.'/sections/menu_dashboard.php'; ?><!-- .navbar -->
  <!-- End Header -->


  <main id="main">



    <!-- ======= Details Section ======= -->
    <section id="details" class="details">
      <div class="container">


        <div class="row content">
          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModalCenteredScrollable">
            Select Vehicle ID
          </button>

          <div class="col-md-2">
          </div>
          <div class="col-md-6" data-aos="fade-right">
            <hr>  
            <h4 class="mb-0 fw-bold">Add Account </h4>
            <hr> 
            <form method="post" id="createProduct" action="<?= site_url('/accounts/update') ?>">
                <br>    
                <div class="list-group mx-0">
                    <label class="list-group-item d-flex gap-2">
                    <input class="form-check-input flex-shrink-0" type="radio" name="listGroupRadios" id="listGroupRadios1" value="" checked="">
                    <span>
                        Income/Revenue <small class="d-block text-muted">Payment for Jobs, sales etc</small>
                    </span>
                    </label>
                    <label class="list-group-item d-flex gap-2">
                    <input class="form-check-input flex-shrink-0" type="radio" name="listGroupRadios" id="listGroupRadios2" value="">
                    <span>
                        Expenditure <small class="d-block text-muted">Expenses, salaries, purchases etc</small>
                    </span>
                    </label>
                </div>
                <br>

                  <label for="cars">Transaction Type</label>
                  <select name="cars" id="cars">
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
                
                <div class="form-group">
                  <div class="row mb-4">
                      <div class="col">
                        <label>Date</label>
                        <input type="date" name="date" class="form-control" value="">
                      </div>
                      <div class="col">
                        <label>Time</label>
                        <input type="time" name="time" id="time" class="form-control" value="">
                      </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="row mb-4">
                      <div class="col">
                        <label>Item</label>
                        <input type="text" name="item" id="item" class="form-control" value=""></input>
                      </div>
                      <div class="col">
                        <label>Cost</label>
                        <input type="text" name="cost" id="cost" class="form-control" value="">
                      </div>
                  </div>
                </div>

                <div class="form-group">
                    <label>Issued</label>
                    <input type="text" name="issued" id="issued" class="form-control" value="">
                    <label>Received</label>
                    <input type="text" name="received" id="received" class="form-control" value="">
                </div>


                <div class="form-group">
                    <label>Particulars</label>
                    <textarea type="text" name="particulars" class="form-control"></textarea>
                </div>
                <div class="form-group">
                    <label style="display:none;">Value</label>
                    <input style="display:none;" type="text" name="value" id="value" class="form-control disabled" value="">
                    <label style="display:none;">Balance</label>
                    <input style="display:none;" type="text" name="balance" id="balance" class="form-control disabled" value=""></input>
                    <!-- <input type="radio" value=true> -->
                </div>

                <div class="form-group">
                    <button type="submit" class="btn btn-primary btn-block">Save</button>
                </div>
            </form>

          </div>
          <div class="col-md-4">
            <section>
                  <button type="button" class="btn btn-success btn-block mb-4" id="btnCompound" onclick="calcValue(-999,-999)">
                    Re-Calculate
                  </button>
                  
                  <div class="card">
                    <div class="card-header bg-white text-center py-3">
                      <h5 class="mb-0 fw-bold">Summary</h5>
                    </div>

                    <div class="card-body">
                      <ul>
                        <li><strong>Balance b/d: </strong>0</li>
                        <li><strong>Issued: </strong><Span id = "issued_label">0</span></li>
                        <li><strong>Received: </strong><Span id = "received_label">0</span></li>
                        <li><strong>Value: </strong><Span id = "value_label">N0</span></li>
                      </ul>
                    </div>

                    <div class="card-footer bg-white d-flex justify-content-between py-3">
                      <strong>Balance in Stock:</strong>
                      <strong><Span id = "balance_label">0</span></strong>
                    </div>
                  </div>
            </section>
            <section>
                

            </section>
          </div>
        </div>



      </div>
    </section><!-- End Details Section -->


  <!-- ======= Footers and scripts ======= -->
  <?php include 'sections/footer.php'; ?>
  <!-- TODO: We also need jQuer for some functions load from CDN -->
  <script src="<?php echo pathinfo(base_url(),PATHINFO_DIRNAME)."/public/"."assets/vendor/jquery/dist/jquery.min.js";?>"></script>

  <!-- End Footer -->

  

  <script>
      let inputBox = document.querySelector("#issued");

      inputBox.addEventListener("input", function () {
          console.log("Input value changed via UI. New value: '%s'", this.value);
          calcValue(this.value,0); 
      });

      observeElement(inputBox, "value", function (oldValue, newValue) {
          console.log("Input value changed via API. Value changed from '%s' to '%s'", oldValue, newValue);
      });

      function observeElement(element, property, callback, delay = 0) {
          let elementPrototype = Object.getPrototypeOf(element);
          if (elementPrototype.hasOwnProperty(property)) {
              let descriptor = Object.getOwnPropertyDescriptor(elementPrototype, property);
              Object.defineProperty(element, property, {
                  get: function() {
                      return descriptor.get.apply(this, arguments);
                  },
                  set: function () {
                      let oldValue = this[property];
                      descriptor.set.apply(this, arguments);
                      let newValue = this[property];
                      if (typeof callback == "function") {
                          setTimeout(callback.bind(this, oldValue, newValue), delay);
                      }
                      return newValue;
                  }
              });
          }
      }
      var received = 0;
      var issued = 0;
      var cost = 0;
      var value = 0;
      var balance = 0;
      function calcValue(dIssued, dReceived) {
        event.preventDefault();
        issued = parseFloat(dIssued);
        received = parseFloat(dReceived);
        if(dIssued===-999){
          issued = parseFloat(document.getElementById("issued").value);
          received = parseFloat(document.getElementById("received").value);
        }
        var cost = parseFloat(document.getElementById("cost").value);
        var balance = parseFloat(document.getElementById("balance").value);

        value = ((cost * received)-(cost * issued)).toFixed(2);
        balance = (balance + received-issued).toFixed(2);
        
        document.getElementById("balance").value = balance;
        document.getElementById("value").value = value;
        document.getElementById("issued_label").innerHTML = dIssued;
        document.getElementById("received_label").innerHTML = received;
        document.getElementById("value_label").innerHTML = value;
        document.getElementById("balance_label").innerHTML = balance;
      }

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

  <!-- AJAX call to API -->
  <script>
     //AJAX call to API 
     $(document).ready( function() {
       // $(document).animate({scrollLeft: 300},500);     //now scrollright
        $.ajax({
            type: 'POST',
            url:  '<?php echo site_url(); ?>/api/vehicles',  //evaluates to ->svr/model.php?parent_idr<6'
            data: {'mock_post_data' : '0'},
            dataType: 'json',
            cache: false,
            success: function(result) {
                //console.log('Output: \n' + JSON.stringify(result));
                //test data=JSON.parse(result); 
                try {
                  //console.log("[0] id: " + result[0].id);
                  //console.log("[0] name: " + result[0].name);
                  jQuery.each(result, function(i, val){   //note result is a json object
                    //console.log('What can we do with data! i:' + i+ " val:" + val.name );
                    $("#vehicle_list").append("<li class='list-group-item' id='myVehiclesID"+val.id+"' onClick=clickedID(" + val.id + ");>"+ val.name + " (" + val.car_brand + " " + val.car_model + ")" + " - " + val.id + "</li>");
                  }); 
                } catch (error) {
                  console.log("An error ocured during parse (see details below) \n" + error); 
                }
                
            },
        });

        // $("#myDivWM").css({
        //   "color":"#bbb","font-size":"100px",
        //   "position":"absolute","top":"10px","left":"15px",
        //   "z-index":"-1","transform":"rotate(45deg)"
        // });
    
      });

      function clickedID(dID){
        //alert($("#myVehiclesID"+dID).text + "   clicked" + dID );
        $("#item").attr('value', dID);
        $("#myVehiclesID"+dID).hide(2000, function(){});

        $("#item").after('</br><span class="small">'+ "You selected: " +  $("#myVehiclesID"+dID).text() + "</span>");
        //or $("#item").val($("#myVehiclesID"+dID).text());
      }

  </script>
  <!-- end AJAX call to API -->
</body>

</html>
