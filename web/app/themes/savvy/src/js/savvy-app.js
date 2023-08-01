/**
 * Core Public App for the Theme
 *
 * @package Savvy
 * */

import SavvyNavMenu             from "./components/nav-menu";
import SavvyTheme               from "./components/theme";
import SavvyTableOfContents     from "./components/table-of-contents";
import SavvyArticleScore        from "./components/article-score";
import SavvyGlider              from "./components/glider";
import SavvySharer              from "./components/sharer";
import SavvyPopup               from "./components/popup";
import SavvyTriggers            from "./components/triggers";

new SavvyNavMenu();
new SavvyTableOfContents();
new SavvyArticleScore();
new SavvyGlider();
new SavvySharer();
new SavvyPopup();
new SavvyTriggers();

/**
 * Starting the main Theme Script
 */
 SavvyTheme.instance().start();