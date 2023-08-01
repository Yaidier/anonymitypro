<?php

namespace ScTheme\SavvyBuilder;

if( file_exists( dirname( __FILE__ ) . '/vendor/autoload.php' ) ){
	require_once dirname( __FILE__ ) . '/vendor/autoload.php';
}

class SavvyBuilder {
	public static function init(){

		$app_uri = SAVVYCHILD_THEME_DIR_URI . '/app/SavvyBuilder/';
		$app_dir = SAVVYCHILD_THEME_DIR . '/app/SavvyBuilder/';
		
		define( 'NODE_BUILDER_URI', $app_uri );
		define( 'NODE_BUILDER_PATH', $app_dir );
		
		\NBuilder\App::instance();
	}
}