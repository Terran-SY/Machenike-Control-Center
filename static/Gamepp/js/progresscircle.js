function makesvg(percentage, inner_text, unit) {
    var inner_text = "";
    var abs_percentage = Math.abs(percentage).toString();
    var percentage_str = percentage.toString();
    var classes = "";
    if (percentage < 0) {
        classes = "danger-stroke circle-chart__circle--negative";
    } else if (percentage > 0 && percentage <= 40) {
        classes = "success-stroke";
    } else if (percentage > 40 && percentage <= 75) {
        classes = "warning-stroke";
    } else {
        classes = "warning-red";
    }
    var svg = '<svg class="circle-chart" viewbox="0 0 33.83098862 33.83098862" >'
        + '<circle class="circle-chart__background" cx="16.9" cy="16.9" r="15.9" />'
        + '<circle class="circle-chart__circle ' + classes + '"'
        + 'stroke-dasharray="' + abs_percentage + ',100"    cx="16.9" cy="16.9" r="15.9" />'
        + '<g class="circle-chart__info">'
        + '   <text class="circle-chart__percent" x="17.9" y="14"><span class="percentage_str">' + percentage_str + unit + '</span></text>'

    if (inner_text) {
        svg += '<text class="circle-chart__subline" x="16.91549431" y="22">' + inner_text + '</text>'
    }

    svg += ' </g></svg>';

    return svg
}

(function ($) {

    $.fn.circlechart = function () {
        this.each(function () {
            var percentage = $(this).data("percentage");
            var percentageunit = $(this).data("unit");
            var inner_text = $(this).text();
            $(this).html(makesvg(percentage, inner_text, percentageunit));
        });
        return this;
    };

    // 添加的代码
    $.fn.setChart = function (val) {
        $(this).find('.circle-chart__circle').attr('stroke-dasharray', val + ',100');
        $(this).find('.percentage_str').text(val + '%');
    }

}(jQuery));

