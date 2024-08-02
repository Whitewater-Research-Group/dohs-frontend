<!-- the styles -->
<!-- <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"> -->
<!-- <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
<link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css"> -->


<!-- method 1 -->
<!-- Create a class within your stylesheet ui-helper-hidden and then add  -->
<!-- a div as the first element on your page; -->

<!-- <body> -->
    <div class="ui-helper-hidden"></div><!-- rest of html -->
<!-- </body> -->

<!-- After you have checked to make sure your CDN javascript file has been loaded,  -->
<!-- then use this bit of code note i am using jquery -->
<!-- This will check to see if the element which should be hidden is or not.  -->
<!-- If it isnt hidden, then you know your css file has not loaded from the CDN. -->
<script>
    // CSS Fallback
    $(function () {
        if ($('.ui-helper-hidden:first').is(':visible') === true) {
            $('<link rel="stylesheet" type="text/css" href="/</?php echo pathinfo(base_url(),PATHINFO_DIRNAME)./"/public//"./"assets/vendor/bootstrap/css/bootstrap.min.css/";/?/>" />').appendTo('head');
        }
        //check others
        //bx bx-check
        //swiper-slide
    });
</script>
