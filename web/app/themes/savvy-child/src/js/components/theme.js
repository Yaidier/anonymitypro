/**
 * Handles the app shared all accross the pages in the site
 *
 * 
 * @package Savvychild
 * */

 /**
  * 
  * The main Theme Script
  */
 class ScTheme {
    constructor() {
        if (document.readyState != "loading") {
            this.init();
        }
        else {
            document.addEventListener("DOMContentLoaded", () => {
                this.init();
            });
        }
	}

    init() {
        console.log('Streamingwebsites App');
    }
}

export default ScTheme;
