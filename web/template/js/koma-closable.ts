/**
 * Created by hotovec on 23.2.2016.
 */

///<reference path="lib/jquery.d.ts" />

class Closable {

    public options = {

        selector: 'data-closable',

    };

    public element = null;



    constructor(drillDownData, opts?) {

        if (drillDownData == null) {
            console.error('Missing drilldown data');
            return;
        }

        // parse config (optional)
        if (opts) {
            if (opts.selector) {
                this.options.selector = opts.selector;
            }
        }

      
    }

    private buildLevel(childs, historyName) {
        var level = $('<div class="drill-level"></div>');

        // if this is first element


        var myShowTimeOut = setTimeout((t) => {
            level.removeClass('drill-hidden');
            clearTimeout(myShowTimeOut);
        }, 20);

    }


}
