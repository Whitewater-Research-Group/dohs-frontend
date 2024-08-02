	<!-- Meta -->
    <meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
		<meta http-equiv="x-ua-compatible" content="ie=edge">

		<!-- Favicon -->
		<link rel="shortcut icon" href="<?php echo base_url("assets/img/favicon.png");?>" type="image/x-icon">

		<!--  Social tags -->
		<meta name="keywords" content="mmlogAutofix, cars, garage">
		<meta name="description" content="mmlogAutofix">
		<meta name="author" content="mmlogAutofix.keminkreative.site">

		<!-- Schema.org -->
		<meta itemprop="name" content="mmlogautoFix">
		<meta itemprop="description" content="mmlogAutofix">
		<meta itemprop="image" content="assets/img-temp/aduik-preview.png">

		<!-- Twitter Card -->
		<meta name="twitter:card" content="product">
		<meta name="twitter:site" content="@mmlogautoFix">
		<meta name="twitter:title" content="mmlogautoFix">
		<meta name="twitter:description" content="mmlogautoFix">
		<meta name="twitter:creator" content="@mmlogautoFix">
		<meta name="twitter:image" content="assets/img-temp/aduik-preview.png">

		<!-- Open Graph -->
		<meta property="og:type" content="website">
		<meta property="og:site_name" content="mmlogautoFix">
		<meta property="og:title" content="Dashboard">
		<meta property="og:description" content="">
		<meta property="og:url" content="">
		<meta property="og:locale" content="en_US">
		<meta property="og:image" content="assets/img-temp/aduik-preview.png">
		<meta property="og:image:secure_url" content="assets/img-temp/aduik-preview.png">

		<!-- Web Fonts -->
		<link href="//fonts.googleapis.com/css?family=Roboto:300,400,500,700" rel="stylesheet">

		<!-- Components Vendor Styles -->
		<link rel="stylesheet" href="<?php echo base_url("assets/vendor/themify-icons/themify-icons.css");?>">
		<link rel="stylesheet" href="<?php echo base_url("assets/vendor/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.css");?>">
		
	
		<!-- Theme Styles -->
		<link rel="stylesheet" href="<?php echo base_url("assets/css/theme.css");?>">

		<?php
function timeAgo($timestamp) {
    // Check if the timestamp is null or not in the correct format
    if (empty($timestamp) || strtotime($timestamp) === false) {
        return "";
    }

    $timeAgo = strtotime($timestamp);
    $currentTime = time();
    $timeDifference = $currentTime - $timeAgo;
    $seconds = $timeDifference;

    $minutes = round($seconds / 60);           // 60 seconds in a minute
    $hours = round($seconds / 3600);           // 3600 seconds in an hour
    $days = round($seconds / 86400);           // 86400 seconds in a day
    $weeks = round($seconds / 604800);         // 604800 seconds in a week
    $months = round($seconds / 2629440);       // 2629440 seconds in a month
    $years = round($seconds / 31553280);       // 31553280 seconds in a year

    if ($seconds <= 60) {
        return "Just now";
    } elseif ($minutes <= 60) {
        return $minutes == 1 ? "one minute ago" : "$minutes minutes ago";
    } elseif ($hours <= 24) {
        return $hours == 1 ? "an hour ago" : "$hours hours ago";
    } elseif ($days <= 7) {
        return $days == 1 ? "yesterday" : "$days days ago";
    } elseif ($weeks <= 4.3) { // 4.3 weeks in a month
        return $weeks == 1 ? "a week ago" : "$weeks weeks ago";
    } elseif ($months <= 12) {
        return $months == 1 ? "a month ago" : "$months months ago";
    } else {
        return $years == 1 ? "one year ago" : "$years years ago";
    }
}


?>
