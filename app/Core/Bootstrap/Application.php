<?php

namespace ResultSystems\Emtudo\Core\Bootstrap;

use Illuminate\Foundation\Application as LaravelApplication;

class Application extends LaravelApplication
{
    /**
     * Bootstrap the given application.
     *
     * @param  \Illuminate\Contracts\Foundation\Application  $app
     * @return void
     */
    public function environmentFile()
    {
        if($this->runningInConsole() or $this->isDevEnvironment()){
            //exit('sim estamos local ou no host');
            return "env-digipress";
        }

        return $this->environmentFile ?: '.env';
    }

    public function isDevEnvironment(){
        if (isset($_SERVER['HTTP_CLIENT_IP'])) {
            $ip = $_SERVER['HTTP_CLIENT_IP'];
        } elseif (isset($_SERVER['HTTP_X_FORWARDED_FOR'])) {
            $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
        } else {
            $ip = $_SERVER['REMOTE_ADDR'];
        }
        $myIP = @gethostbyname('notebook.dlocal.in');
        $myIP = '216.59.16.37';
        return in_array($ip, [$myIP, '216.59.16.37', '216.59.16.38']);
    }
}
