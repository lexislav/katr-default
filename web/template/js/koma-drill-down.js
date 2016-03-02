/**
 * Created by hotovec on 23.2.2016.
 */
///<reference path="lib/jquery.d.ts" />
var DrillDown = (function () {
    function DrillDown(drillDownData, opts) {
        this.options = {
            selector: '#drill-down',
            historySelector: '.drill-history',
            rootLevelName: 'Katalog'
        };
        this.root = null;
        this.historyElement = null;
        this.data = [];
        this.history = [];
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
        // console.log("drill init");
        // start building levels
        this.buildLevel(this.data, this.options.rootLevelName);
        this.buildBackButtons();
    }
    DrillDown.prototype.buildLevel = function (childs, historyName) {
        var _this = this;
        var level = $('<div class="drill-level"></div>');
        // if this is first element
        if (this.history.length > 0) {
            level.addClass('drill-hidden');
        }
        childs.forEach(function (entry) {
            // build items
            var levelItem = $('<div class="drill-item"><div class="drill-title"><a href="' + entry.url + '">' + entry.title + '</a></div> <div class="drill-next"><i class="fa fa-play"></i></div> <div class="drill-icon"><a href="' + entry.itemsUrl + '"><i class="fa fa-list"></i></a></div> </div>');
            // smazni ikonu listu pokud není žádné url na položky - produkty
            if (!entry.itemsUrl || entry.itemsUrl.length < 1) {
                levelItem.find('.drill-icon').remove();
            }
            var clickTarget = levelItem.find('.drill-next');
            if (entry.childs.length > 0) {
                levelItem.addClass('drill-has-childs');
                // click on cell
                clickTarget.on('click', function (event) {
                    _this.buildLevel(entry.childs, entry.title);
                });
            }
            // has content class
            if (entry.hasContent == 0) {
                levelItem.addClass('drill-empty-content');
            }
            // attach items
            level.append(levelItem);
        });
        this.historyAdd(level, historyName);
        this.root.append(level);
        var myShowTimeOut = setTimeout(function (t) {
            level.removeClass('drill-hidden');
            clearTimeout(myShowTimeOut);
        }, 20);
    };
    DrillDown.prototype.historyAdd = function (level, historyName) {
        var histObj = {
            title: historyName,
            element: level
        };
        this.history.push(histObj);
        // console.dir(this.history);
        this.historyShow();
    };
    DrillDown.prototype.removeLevel = function (level) {
        var myTimeout = setTimeout(function () {
            level.addClass('drill-hidden');
            clearTimeout(myTimeout);
        }, 20);
    };
    DrillDown.prototype.historyShow = function () {
        var _this = this;
        this.historyElement.empty();
        this.history.forEach(function (entry, index) {
            var drillElement = $('<div class="drill-hist-button"></div>');
            drillElement.text(entry.title);
            drillElement.on('click', function (event) {
                _this.histBackLevel(index + 1);
            });
            _this.historyElement.append(drillElement);
        });
        // show hide back button
        this.root.find('[drill-back]').each(function (index, elem) {
            var el = $(elem);
            if (_this.history.length <= 1) {
                el.addClass('is-hidden');
            }
            else {
                el.removeClass('is-hidden');
            }
        });
    };
    DrillDown.prototype.historyGoBack = function () {
        if (this.history.length > 1) {
            var histObj = this.history.pop();
            this.removeLevel(histObj.element);
        }
        this.historyShow();
    };
    DrillDown.prototype.histBackLevel = function (levelIndex) {
        var delLoops = this.history.length - levelIndex;
        if (delLoops > 0) {
            for (var i = 0; i < delLoops; i++) {
                var histObj = this.history.pop();
                this.removeLevel(histObj.element);
            }
        }
        this.historyShow();
    };
    DrillDown.prototype.buildBackButtons = function () {
        var _this = this;
        // build back buttons for drill-down instance
        $('[drill-back]').each(function (index, elem) {
            var el = $(elem);
            if (el.attr('drill-back') == _this.options.selector) {
                // console.log('back');
                el.on('click', function (event) {
                    _this.historyGoBack();
                });
            }
        });
        // build home buttons for drill-down instance
        $('[drill-home]').each(function (index, elem) {
            var el = $(elem);
            if (el.attr('drill-home') == _this.options.selector) {
                // console.log('home');
                el.on('click', function (event) {
                    _this.histBackLevel(1);
                });
            }
        });
    };
    return DrillDown;
}());
//# sourceMappingURL=koma-drill-down.js.map