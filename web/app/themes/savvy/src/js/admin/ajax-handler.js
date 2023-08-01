/**
 * Handles the Ajax Hanlder for the admin scripts of the Theme
 *
 * @package Privacysavvy
 * */

 class AjaxHandler {
    /**
     * Utility Ajax Hanlder Function
     */
    static async call(data = false, nonce = '') {       
        if(typeof ajax_var == 'undefined' || !data){
            return;
        }

        let request = new XMLHttpRequest(),
            url     = new URL(ajax_var.url);

        Object.entries(data).forEach(([key, value]) => {
            url.searchParams.append( key, value );
        });

        return await new Promise((resolve, reject) => {
            request.open( 'GET', url.href, true );
            request.onload = function() {
                if (this.status >= 200 && this.status < 400) {
                    resolve(JSON.parse(this.response));
                } else {
                    reject(this);
                }
            };
                
            request.onerror = function() {
                reject(this);
            };

            request.send();
        });
    }
}

export default AjaxHandler;



