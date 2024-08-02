<?php
    // Custom comparison function to sort by date and time
    function compareByDateTime($a, $b) {
    $dateTimeA = strtotime($a['date'] . ' ' . $a['time']);
    $dateTimeB = strtotime($b['date'] . ' ' . $b['time']);

    if ($dateTimeA == $dateTimeB) {
    return 0;
    }
    return ($dateTimeA < $dateTimeB) ? -1 : 1;
    }

    // Sort the table_rows array
    usort($table_rows, 'compareByDateTime');
?>