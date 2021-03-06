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
        'defaultCpLanguage' => 'cs',
        /** 'cpTrigger' => new-url, **/
        'sendPoweredByHeader' => false,
        'allowAutoUpdates' => 'minor-only',
        'enableCsrfProtection' => true,
        'loginPath' => 'login',
        'testToEmailAddress' => 'lexislav@gmail.com',
        'generateTransformsBeforePageLoad' => true,
        'baseAssetPath' => './',
        'docsUrl' => '/dokumentace',
        'siteUrl' => 'http://koma-katalog.cz/'
    ),

    'koma-katalog.dev' => array(
        'devMode' => true,
        'siteUrl' => 'http://koma-katalog.dev/'
    ),

    'koma-katalog.cz' => array(
        'devMode' => false,
        'testToEmailAddress' => null,
        // 'postLoginRedirect' => 'homepage',
        'siteUrl' => 'http://koma-katalog.cz/'
    )
);
