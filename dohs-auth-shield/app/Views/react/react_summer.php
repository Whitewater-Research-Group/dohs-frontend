<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Summer</title>
  </head>
  <body>

    <h2>Summer React</h2>

    <!-- We will put our React component inside this div. -->
    <div id="like_button_container"></div>

    <!-- Load React. -->
    <!-- Note: when deploying, replace "development.js" with "production.min.js". -->
    <script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>

    <!-- Load our React component. -->
    <script src="<?php echo base_url('assets/js/react/components/summer.js');?>"></script>

  </body>
</html>