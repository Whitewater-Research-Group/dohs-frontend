<?php foreach($products as $key => $product): ?>
    <li class="u-sidebar-nav-menu__item">
        <a class="u-sidebar-nav-menu__link" href="<?php echo site_url("dashboard/report_weekly/".$product['id']);//  $key+1; ?>">
            <span class="u-sidebar-nav-menu__item-icon"><?php echo $key+1; ?></span>
            <span class="u-sidebar-nav-menu__item-title">Weekly Report (<?php echo $product['name']; ?>)</span>
        </a>
    </li> 
<?php endforeach; ?>