<?php

$context                = \Timber::context();
$context['hero_image']  = '/app/themes/savvychild-child/assets/images/ps-bg-man.png';

\Timber::render( 'other/404.twig', $context );