

the scripts

<script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script> -->


method 1
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
<script>    
    window.jQuery || document.write('<script src="/scripts/jquery.1.9.1.min.js"><\/script>')
</script>
<script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.10.2/jquery-ui.min.js"></script>
<script>    
    window.jQuery.ui || document.write('<script src="/scripts/jquery-ui.min.js"><\/script>')
</script>


<!-- mthd2 -->
<!-- (if there is no window.jQuery property defined cdn script didn't loaded). -->
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js"></script>
<script>window.jQuery || document.write('<script src="js/libs/jquery-1.5.1.min.js">\x3C/script>')</script>


<!-- check if other scripts are loaded -->
<script>
    if (typeof $.tooltip === 'undefined') {
        document.write('<script src="js/libs/jquery.tooltip.min.js">\x3C/script>');
    }
</script>

<!-- tethod 3 -->
<script>
    function onJqueryLoadError()
    {
        document.write('<scr' + 'ipt src="static/jquery-3.4.1.min.js"></scr' + 'ipt>');
    }
</script>
<script src="https://www.cdn/jquery-3.4.1.min.js" onerror="onJqueryLoadError()"></script>

<!-- method 4 -->
<script type="text/javascript" src=
"http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js">
</script>
    <!--In case cdn fails, local will load up for sure-->
    <script>
        window.jQuery || document.write(
            '<script src="jquery.min.js">\x3C/script>'
        )
    </script>
    <!--'\x3C' has been used so that the script 
        does not end prematurely. The above 
        condition checks whether local has 
        loaded if not then it loads up the 
        local -->

        

<!-- without using ocument.write whic is dicouraged by browsers -->