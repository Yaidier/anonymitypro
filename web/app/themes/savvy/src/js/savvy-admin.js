/**
 * Main Admin file for the Theme
 *
 * @package Savvy
 * */

import AjaxHandler      from "./admin/ajax-handler";
import Multilanguage    from "./admin/multilanguage";
import Notifications  from "./admin/notifications";
import CacheManager     from "./admin/cache-manager";

new AjaxHandler()
new Multilanguage();
new Notifications();
new CacheManager()