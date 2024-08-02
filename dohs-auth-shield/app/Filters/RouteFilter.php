<?php 

namespace App\Filters;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\Filters\FilterInterface;


class RouteFilter implements FilterInterface
{
    public function before(RequestInterface $request, $arguments = null)
    {
        if (!session()->get('isSignedIn'))
        {
            return redirect()
                ->to('/login');
        }
    }
    
    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null)
    {
        
    }
}


//Open app/Config/Filters.php file, find $aliases array in the Filters class and switch the aliases prop with given code.

/* public $aliases = [
		'csrf'     => CSRF::class,
		'toolbar'  => DebugToolbar::class,
		'honeypot' => Honeypot::class,
		'routeFilter' => \App\Filters\RouteFilter::class,
	]; */


//The /dashboard page is not accessible due to injecting the route guard filter.

/*
 * --------------------------------------------------------------------
 * Route Definitions
 * --------------------------------------------------------------------
*/

/* $routes->setDefaultController('RegisterController');
$routes->get('/', 'RegisterController::index');
$routes->get('/register', 'RegisterController::index');
$routes->get('/login', 'LoginController::index');
$routes->get('/dashboard', 'DashboardController::index',['filter' => 'routeFilter']); */