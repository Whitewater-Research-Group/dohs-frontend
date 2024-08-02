<?php
function getData($dData){
    if ($dData=='clients') $data_chart = $data_chart_clients; 
    if ($dData=='jobs') $data_chart = $data_chart_jobs; 
    if ($dData=='worth') $data_chart = $data_chart_worth; 
    if ($dData=='sales') $data_chart = $data_chart_sales; 


return $data_chart ;
}

?>

