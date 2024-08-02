<?php
$data_chart_percent=0;
$data_chart_diff=0;
$data_chart_str='';
//$data_chart= [0, 0, 0, 0, 0, 0, 60, 60, 100, 110]; //defined from main view created in controller
//todo -----getData("clients")       //call fxn controller

foreach($data_chart as $key => $val){
    $data_chart_str= $data_chart_str. $val.",";
} 
$data_chart_str=trim($data_chart_str,",");
$data_chart_diff=(int)$data_chart[9]-(int)$data_chart[8];
if ((int)$data_chart[8]>0) 
$data_chart_percent=$data_chart_diff/(int)$data_chart[8]*100;
?>

<div class="mb-2">
<canvas class="js-area-chart-small"
        width="600"
        height="160"
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
                {echo number_format($data_chart_percent, 1).'%' ;} 
        ?>
        <span>QoS KPI</span>
    </span>
<?php else: ?>
    <span class="text-success">
        <?php echo number_format($data_chart_percent,1); ?>
        <span class="ti-arrow-up"></span>
    </span>
<?php endif; ?>

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

<script>
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    datasets: [{
      data: [10000, 9200, 10800, 10400, 12800, 13200, 15200, 14800, 15600],

      borderColor: 'rgba(0, 237, 150, 1)',
      backgroundColor: 'rgba(0, 237, 150, .1)',

      pointBackgroundColor: "#ffffff",
      pointShadowColor: 'rgba(0, 0, 0, .19)',
      pointShadowOffsetX: 0,
      pointShadowOffsetY: 2
    }]
  };

  const config = {
    type: 'line',
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };

  var myChart = new Chart(document.getElementById('myChart'), config);
</script>



