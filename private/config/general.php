<?php

/**
 * General Configuration
 *
 * All of your system's general configuration settings go in here.
 * You can see a list of the default settings in craft/app/etc/config/defaults/general.php
 */

return array(
	'*' => array(
        'omitScriptNameInUrls' => true,
        'defaultWeekStartDay' => 1,
        /** 'cpTrigger' => new-url, **/
        'sendPoweredByHeader' => false
    ),

    'koma-katalog.dev' => array(
        'devMode' => true,
    ),

    'koma-katalog.cz' => array(
    	'devMode' => false,
        'cooldownDuration' => 0,
    )
);
