<!DOCTYPE html>
<html lang="en">

<head>
  <?php include __DIR__.'/sections/header.php'; ?>
  <title>AutoFix</title>
 <!-- Template Main CSS File -->
<link href="<?php echo pathinfo(base_url(),PATHINFO_DIRNAME)."/public/"."assets/css/style.css";?>" rel="stylesheet">
</head>

<body>
  <!-- ======= Header ======= -->
  
    <?php include  __DIR__.'/sections/auto_load_style.php'; ?> 
    <?php include  __DIR__.'/sections/menu_main.php'; ?><!-- .navbar --><!-- .navbar -->
  <!-- End Header -->


  <main id="main">
      <!-- ======= Details Section ======= -->
    <section id="details" class="details">
      <div class="container">

        <div class="row content">
          <div class="col-md-4" data-aos="fade-right">
            <img src="assets/img/details-1.png" class="img-fluid" alt="">
          </div>
          <div class="col-md-8 pt-4" data-aos="fade-up">
            <h3>API Reference</h3>
            <p class="fst-italic">
                <?php echo $api_doc; ?>
            </p>
            
            <button id="test_api" class="button btn-primary">Test API </button>
          </div>
        </div>


      </div>
    </section><!-- End Details Section -->

    

  </main><!-- End #main -->

  <!-- ======= Footer ======= -->
  <?php include __DIR__.'/sections/footer.php'; ?>
  <h1>Authors</h1>
  <ul id="authors"></ul>
  <a>Result from API</a>
  <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
  <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.21/css/jquery.dataTables.min.css">

<script>
  //jQuery
  $( document ).ready(function() {
  let endpoint = 'https://localhost/qose/web/ci_app/public/index.php/api/kpis'
  let apiKey = '5b578yg9yvi8sogirbvegoiufg9v9g579gviuiub8'

  $( ".content a" ).each(function( index, element ) {
    $.ajax({
        url: endpoint + "?key=" + apiKey + " &q=" + $( this ).text(),
        contentType: "application/json",
        dataType: 'json',
        success: function(result){
            $( element ).after(
            '<a href="' + result.id + '"> \n ' +
              '<div class="link-preview"> \n ' +
                '<div style="width:70%;" class="link-info"> \n ' +
                  '<h4>' + result.name +'</h4> \n ' +
                  '<p>' + result.description +'</p> \n ' +
                '</div><br> \n ' +
                  '<a href="' + result.category + '" class="url-info"><i class="far fa-link"></i>' + result.url + '</a> \n ' +
                '</div></a>');
            $( element ).remove();
        }
    })
  });
});



  //Vannila
  const ul = document.getElementById('authors');
  const list = document.createDocumentFragment();
  const url = 'https://jsonplaceholder.typicode.com/users';

  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let authors = data;

      authors.map(function(author) {
        let li = document.createElement('li');
        let name = document.createElement('h2');
        let email = document.createElement('span');

        name.innerHTML = `${author.name}`;
        email.innerHTML = `${author.email}`;

        li.appendChild(name);
        li.appendChild(email);
        list.appendChild(li);
      });
    }).
    .catch(function(error) {
      console.log(error);
    });

  ul.appendChild(list);
</script>

</body>

</html>
