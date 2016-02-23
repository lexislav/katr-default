/**
 * Created by hotovec on 23.2.2016.
 */

///<reference path="lib/jquery.d.ts" />

class DrillDown {

    public options = {

        selector: '#drill-down',
        historySelector: '.drill-history',
        rootLevelName: 'Home'

    };

    public root = null;
    public historyElement = null;

    private data = [];
    private history = [];


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

            if (opts.historySelector) {
                this.options.historySelector = opts.historySelector;
            }

            if (opts.rootLevelName) {
                this.options.rootLevelName = opts.rootLevelName;
            }
        }

        // pass data localy
        this.data = drillDownData;
        this.root = $(this.options.selector);

        this.historyElement = this.root.find(this.options.historySelector);
        console.dir(this.historyElement);

        console.log("Koma Drill Down init");
        console.dir(this.data);

        // start building levels
        this.buildLevel(this.data, this.options.rootLevelName);
        this.buildBackButtons();

    }

    private buildLevel(childs, historyName) {
        var level = $('<div class="drill-level"></div>');

        // if this is first element
        if (this.history.length > 0) {
            level.addClass('drill-hidden');
        }

        childs.forEach((entry) => {
            // build items
            var levelItem = $('<div class="drill-item"><div class="drill-title"><a href="' + entry.url + '">' + entry.title + '</a></div> <div class="drill-next"> > </div> <div class="drill-icon"><a href="' + entry.url + '"><i class="fa fa-pause"></i></a></div> </div>');
            var clickTarget = levelItem.find('.drill-next');

            if (entry.childs.length > 0) {
                levelItem.addClass('drill-has-childs');

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
            level.removeClass('drill-hidden');
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
            level.addClass('drill-hidden');
            clearTimeout(myTimeout);
        }, 20);
    }


    private historyShow() {
        this.historyElement.empty();
        this.history.forEach((entry, index) => {

            var drillElement = $('<div class="drill-hist-button"></div>');
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

    private buildBackButtons() {
        // build back buttons for drill-down instance
        $('[drill-back]').each((index, elem) => {
            var el = $(elem);
            if (el.attr('drill-back') == this.options.selector) {
                console.log('back');

                el.on('click', (event) => {
                    this.historyGoBack();
                });
            }
        });

        // build home buttons for drill-down instance
        $('[drill-home]').each((index, elem) => {
            var el = $(elem);
            if (el.attr('drill-home') == this.options.selector) {
                console.log('home');

                el.on('click', (event) => {
                    this.histBackLevel(1);
                });
            }
        });
    }

}
