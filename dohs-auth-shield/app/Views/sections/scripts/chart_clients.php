<?php
$data_chart_percent=0;
$data_chart_diff=0;
$data_chart_str='';
//$data_chart= [0, 0, 0, 0, 0, 0, 60, 60, 100, 110];
//$data_chart = getData("clients"); //todo       //call fxn controller
//$data_chart = $data_chart_clients; 
foreach($data_chart as $key => $val){
    $data_chart_str= $data_chart_str. $val.",";
} 
$data_chart_str=trim($data_chart_str,",");
$data_chart_diff=(int)$data_chart[9]-(int)$data_chart[8];
if ((int)$data_chart[8]>0) $data_chart_percent=$data_chart_diff/(int)$data_chart[8]*100
// echo '<div class="mb-2">';
// echo '    <canvas class="js-area-chart-small"';
// echo '      width="100"';
// echo '      height="20"';
// echo '      data-extend=[{';
// echo '      "data": ['; 
// //0, 0, 0, 0, 0, 60, 60, 100, 80
// echo $data_chart_str;
// echo '],';
// echo        '"borderColor": "#f12559"';
// echo '                    }]>';
// echo '</canvas>';
// echo '</div>';


?>

<div class="mb-2">
<canvas class="js-area-chart-small"
        width="100"
        height="20"
        data-extend='[{
                    "data": [<?php echo $data_chart_str; ?>],
                  "borderColor": "#f12559"
                }]'></canvas>
</div> 

<?php if( $data_chart_percent<0): ?>
    <span class="text-danger">
        <?php  if ($data_chart_percent==0) 
                {echo $data_chart_diff;}
                else  
                {echo $data_chart_percent.'%' ;} 
        ?>
        <span class="ti-arrow-down"></span>
    </span>
<?php else: ?>
    <span class="text-success">
        <?php echo $data_chart_percent; ?>
        <span class="ti-arrow-up"></span>
    </span>
<?php endif; ?>

