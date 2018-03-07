'use strict';

exports.__esModule = true;

var autoprefixer = require('autoprefixer');
var postcss      = require('postcss');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
    function _class() {
        var c = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, _class);

        var def = {
            filter: new RegExp('\.(wxss|css)$'),
            config: {}
        };

        this.setting = Object.assign({}, def, c);
    }

    _class.prototype.apply = function apply(op) {

        var setting = this.setting;
        if (!setting.filter.test(op.file)) {
            op.next();
        } else {
            op.output && op.output({
                action: '压缩',
                file: op.file
            });

            var pluginOpts = setting.config || {};

            var _autoprefixer = postcss([ autoprefixer(pluginOpts) ]);
            _autoprefixer.process(op.code, {from: undefined}).then(function (result) {
                result.warnings().forEach(function (warn) {
                    console.warn(warn.toString());
                });
                op.code = result.css;
                op.next();  
            });
        }
    };

    return _class;
}();

exports.default = _class;
