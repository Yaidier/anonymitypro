<?php
/**
 * Configuration overrides for WP_ENV === 'staging'
 */

use Roots\WPConfig\Config;
use function Env\env;

/**
 * You should try to keep staging as close to production as possible. However,
 * should you need to, you can always override production configuration values
 * with `Config::define`.
 *
 * Example: `Config::define('WP_DEBUG', true);`
 * Example: `Config::define('DISALLOW_FILE_MODS', false);`
 */

Config::define('SAVEQUERIES', true);
Config::define('WP_DEBUG', true);
Config::define('WP_DEBUG_DISPLAY', true);
Config::define('WP_DEBUG_LOG', env('WP_DEBUG_LOG') ?? true);
Config::define('WP_DISABLE_FATAL_ERROR_HANDLER', true);
Config::define('SCRIPT_DEBUG', true);
Config::define('DISALLOW_INDEXING', true);

/**
 * Production DB Credentials
 */
Config::define('PS_PRODUCTION_DB_USER', 'L4br52yaEkK1u45W');
Config::define('PS_PRODUCTION_DB_PASS', 'Dw197*FYJ0PEtE@Z');

ini_set('display_errors', '1');

// Allow the plugin and theme file editor in the admin
Config::define('DISALLOW_FILE_EDIT', false);
// Allow plugin and theme updates and installation from the admin
Config::define('DISALLOW_FILE_MODS', false);
