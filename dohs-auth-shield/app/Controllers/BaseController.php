<?php

namespace App\Controllers;
//for all conrollers in autofix
use App\Models\Vehicle;
use App\Models\UserModel;
//others

use CodeIgniter\Controller;
use CodeIgniter\HTTP\CLIRequest;
use CodeIgniter\HTTP\IncomingRequest;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use Psr\Log\LoggerInterface;

/**
 * Class BaseController
 *
 * BaseController provides a convenient place for loading components
 * and performing functions that are needed by all your controllers.
 * Extend this class in any new controllers:
 *     class Home extends BaseController
 *
 * For security be sure to declare any new methods as protected or private.
 */
class BaseController extends Controller
{
    /**
     * Instance of the main Request object.
     *
     * @var CLIRequest|IncomingRequest
     */
    protected $request;

    /**
     * An array of helpers to be loaded automatically upon
     * class instantiation. These helpers will be available
     * to all other controllers that extend BaseController.
     *
     * @var array
     */
    protected $helpers = [];

    /**
     * Constructor.
     */
    public function initController(RequestInterface $request, ResponseInterface $response, LoggerInterface $logger)
    {
        $this->helpers = array_merge($this->helpers, ['auth', 'setting']);

        // Do Not Edit This Line
        parent::initController($request, $response, $logger);

        $session = session();
        //echo "Hey User : ".$session->get('name');
        $data['session_name'] = 'guest'; // $session->get('name');  

        if (!auth()->loggedIn()) {
            return redirect()->to('/login'); // Do something.
        }

    }



    public function check_login_state(){
        if (!auth()->loggedIn()) {
            return redirect()->to('/login'); // Do something.
            return false;
        }
    }


}
