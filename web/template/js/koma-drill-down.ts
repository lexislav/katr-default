/**
 * Created by hotovec on 23.2.2016.
 */

///<reference path="lib/jquery.d.ts" />

class DrillDown {

    public ddSelector = '#drill-down';
    public ddHistorySelector = '[drill-history]';
    public ddRootName = 'Home';

    //

    public root = null;
    public historyElement = null;

    private data = [];
    private history = [];


    constructor(drillDownData) {

        if (drillDownData == null) {
            console.error('Missing drilldown data');
            return;
        }

        // pass data localy
        this.data = drillDownData;
        this.root = $(this.ddSelector);

        this.historyElement = this.root.find(this.ddHistorySelector);
        console.dir(this.historyElement);

        console.log("Koma Drill Down init");
        console.dir(this.data);

        // start building levels
        this.buildLevel(this.data, this.ddRootName);

    }

    private buildLevel(childs, historyName) {
        var level = $('<div class="drl-level"></div>');

        // if this is first element
        if (this.history.length > 0) {
            level.addClass('drl-hidden');
        }

        childs.forEach((entry) => {
            // build items
            var levelItem = $('<div drill-item><div drill-title><a href="' + entry.url + '">' + entry.title + '</a></div> <div drill-next> > </div> <div drill-icon><a href="' + entry.url + '"><i class="fa fa-pause"></i></a></div> </divdrill>');
            var clickTarget = levelItem.find('[drill-next]');

            if (entry.childs.length > 0) {
                levelItem.addClass('drl-has-childs');

                // click on cell
                clickTarget.on('click', (event) => {
                    this.buildLevel(entry.childs, entry.title);
                });
            }
            // attach items
            level.append(levelItem);
        });

        this.historyAdd(level, historyName);

        this.root.append(level);

        var myShowTimeOut = setTimeout((t) => {
            level.removeClass('drl-hidden');
            clearTimeout(myShowTimeOut);
        }, 20);

    }


    private historyAdd(level, historyName) {
        var histObj = {
            title: historyName,
            element: level
        };
        this.history.push(histObj);
        console.dir(this.history);
        this.historyShow();
    }


    private removeLevel(level) {
        var myTimeout = setTimeout(function () {
            level.addClass('drl-hidden');
            clearTimeout(myTimeout);
        }, 20);
    }


    private historyShow() {
        this.historyElement.empty();
        this.history.forEach((entry, index) => {

            var drillElement = $('<div drill-hist-button></div>');
            drillElement.text(entry.title);

            drillElement.on('click', (event) => {
                this.histBackLevel(index + 1);
            });

            this.historyElement.append(drillElement);
        });
    }


    public historyGoBack() {
        if (this.history.length > 1) {
            var histObj = this.history.pop();
            this.removeLevel(histObj.element);
        }
        this.historyShow();
    }


    public histBackLevel(levelIndex) {
        var delLoops = this.history.length - levelIndex;
        if (delLoops > 0) {
            for (var i = 0; i < delLoops; i++) {
                var histObj = this.history.pop();
                this.removeLevel(histObj.element);
            }
        }
        this.historyShow();
    }

}
