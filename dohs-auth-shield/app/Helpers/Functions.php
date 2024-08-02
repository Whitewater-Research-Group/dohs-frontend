<?php
namespace App\Helpers;
class Functions 
{


    
    public function time_ago($timestamp) {
        $current_time = time();
        $time_difference = $current_time - $timestamp;
        
        // Calculate different time periods
        $seconds = $time_difference;
        $minutes = round($seconds / 60);           // value 60 is seconds
        $hours   = round($seconds / 3600);         // value 3600 is 60 minutes * 60 seconds
        $days    = round($seconds / 86400);        // value 86400 is 24 hours * 60 minutes * 60 seconds
        $weeks   = round($seconds / 604800);       // value 604800 is 7 days * 24 hours * 60 minutes * 60 seconds
        $months  = round($seconds / 2629440);      // value 2629440 is ((365+365+365+365+366)/5/12) days * 24 hours * 60 minutes * 60 seconds
        $years   = round($seconds / 31553280);     // value 31553280 is ((365+365+365+365+366)/5) days * 24 hours * 60 minutes * 60 seconds
    
        // Display the appropriate time format
        if ($seconds <= 60) {
            return "Just Now";
        } elseif ($minutes <= 60) {
            return ($minutes == 1) ? "1 minute ago" : "$minutes minutes ago";
        } elseif ($hours <= 24) {
            return ($hours == 1) ? "1 hour ago" : "$hours hours ago";
        } elseif ($days <= 7) {
            return ($days == 1) ? "1 day ago" : "$days days ago";
        } elseif ($weeks <= 4.3) {  // 4.3 == 30/7
            return ($weeks == 1) ? "1 week ago" : "$weeks weeks ago";
        } elseif ($months <= 12) {
            return ($months == 1) ? "1 month ago" : "$months months ago";
        } else {
            return ($years == 1) ? "1 year ago" : "$years years ago";
        }
    }
    


}

?>