

function scheduleX(obj) {
    var scheX = {
        fulfill: obj.fulfill || 55,
        listAll: obj.listAll || 100,
        speed: obj.speed || 25,
        again: obj.again || true,
        bgColor: obj.bgColor || "#7d8e91",
        listColor: obj.listColor || "red",
        scWidth: obj.scWidth || "300",
        scHeight: obj.scHeight || "25"
    }
    if ($("#scheduleX").length === 1) {
        $("#scheduleX").append('<div class="xList"> <span class="xNum"></span></div>');
        if (scheX.again) {
            $(".xList").css("width", "0");
        }
        $("#scheduleX").css({
            "background-color": scheX.bgColor,
            "width": scheX.scWidth + "px",
            "height": scheX.scHeight + "px"
        })
        $(".xList").css("background-color", scheX.listColor);
        var num = 0;
        var numAll = Math.round(scheX.fulfill / scheX.listAll * 100);
        var xNumAll = setInterval(function () {
            num++;
            $(".xNum").html(num + "%")
            if (num == numAll) {
                clearInterval(xNumAll)
            }
        }, scheX.speed);
        $(".xList").animate({
            "width": numAll + "%"
        }, scheX.speed * numAll)
    }
}

function scheduleX2(obj) {
    var scheX2 = {
        fulfill: obj.fulfill || 55,
        listAll: obj.listAll || 100,
        speed: obj.speed || 25,
        again: obj.again || true,
        bgColor: obj.bgColor || "#7d8e91",
        listColor: obj.listColor || "red",
        scWidth: obj.scWidth || "300",
        scHeight: obj.scHeight || "25"
    }
    if ($("#scheduleX2").length === 1) {
        $("#scheduleX2").append('<div class="xList2"> <span class="xNum2"></span></div>');
        if (scheX2.again) {
            $(".xList2").css("width", "0");
        }
        $("#scheduleX2").css({
            "background-color": scheX2.bgColor,
            "width": scheX2.scWidth + "px",
            "height": scheX2.scHeight + "px"
        })
        $(".xList2").css("background-color", scheX2.listColor);
        var num = 0;
        var numAll = Math.round(scheX2.fulfill / scheX2.listAll * 100);
        var xNumAll = setInterval(function () {
            num++;
            $(".xNum2").html(num + "%");
            if (num == numAll) {
                clearInterval(xNumAll)
            }
        }, scheX2.speed)
        $(".xList2").animate({
            "width": numAll + "%"
        }, scheX2.speed * numAll)
    }
}


function scheduleX3(obj) {
    var scheX3 = {
        fulfill: obj.fulfill || 55,
        listAll: obj.listAll || 100,
        speed: obj.speed || 25,
        again: obj.again || true,
        bgColor: obj.bgColor || "#7d8e91",
        listColor: obj.listColor || "red",
        scWidth: obj.scWidth || "300",
        scHeight: obj.scHeight || "25"
    }
    if ($("#scheduleX3").length === 1) {
        $("#scheduleX3").append('<div class="xList3"> <span class="xNum3"></span></div>');
        if (scheX3.again) {
            $(".xList3").css("width", "0");
        }
        $("#scheduleX3").css({
            "background-color": scheX3.bgColor,
            "width": scheX3.scWidth + "px",
            "height": scheX3.scHeight + "px"
        })
        $(".xList3").css("background-color", scheX3.listColor);
        var num = 0;
        var numAll = Math.round(scheX3.fulfill / scheX3.listAll * 100);
        var xNumAll = setInterval(function () {
            num++;
            $(".xNum3").html(num + "%");
            if (num == numAll) {
                clearInterval(xNumAll)
            }
        }, scheX3.speed)
        $(".xList3").animate({
            "width": numAll + "%"
        }, scheX3.speed * numAll)
    }
}


function scheduleX4(obj) {
    var scheX4 = {
        fulfill: obj.fulfill || 55,
        listAll: obj.listAll || 100,
        speed: obj.speed || 25,
        again: obj.again || true,
        bgColor: obj.bgColor || "#7d8e91",
        listColor: obj.listColor || "red",
        scWidth: obj.scWidth || "300",
        scHeight: obj.scHeight || "25"
    };
    if ($("#scheduleX4").length === 1) {
        $("#scheduleX4").append('<div class="xList4"> <span class="xNum4"></span></div>');
        if (scheX4.again) {
            $(".xList4").css("width", "0");
        }
        $("#scheduleX4").css({
            "background-color": scheX4.bgColor,
            "width": scheX4.scWidth + "px",
            "height": scheX4.scHeight + "px"
        })
        $(".xList4").css("background-color", scheX4.listColor);
        var num = 0;
        var numAll = Math.round(scheX4.fulfill / scheX4.listAll * 100);
        var xNumAll = setInterval(function () {
            num++;
            $(".xNum4").html(num + "%");
            if (num == numAll) {
                clearInterval(xNumAll)
            }
        }, scheX4.speed)
        $(".xList4").animate({
            "width": numAll + "%"
        }, scheX4.speed * numAll)
    }
}

function scheduleX5(obj) {
    var scheX5 = {
        fulfill: obj.fulfill || 55,
        listAll: obj.listAll || 100,
        speed: obj.speed || 25,
        again: obj.again || true,
        bgColor: obj.bgColor || "#7d8e91",
        listColor: obj.listColor || "red",
        scWidth: obj.scWidth || "300",
        scHeight: obj.scHeight || "25"
    };
    if ($("#scheduleX5").length === 1) {
        $("#scheduleX5").append('<div class="xList5"> <span class="xNum5"></span></div>');
        if (scheX5.again) {
            $(".xList5").css("width", "0");
        }
        $("#scheduleX5").css({
            "background-color": scheX5.bgColor,
            "width": scheX5.scWidth + "px",
            "height": scheX5.scHeight + "px"
        })
        $(".xList5").css("background-color", scheX5.listColor);
        var num = 0;
        var numAll = Math.round(scheX5.fulfill / scheX5.listAll * 100);
        var xNumAll = setInterval(function () {
            num++;
            $(".xNum5").html(num + "%");
            if (num == numAll) {
                clearInterval(xNumAll)
            }
        }, scheX5.speed)
        $(".xList5").animate({
            "width": numAll + "%"
        }, scheX5.speed * numAll)
    }
}

function scheduleX6(obj) {
    var scheX6 = {
        fulfill: obj.fulfill || 55,
        listAll: obj.listAll || 100,
        speed: obj.speed || 25,
        again: obj.again || true,
        bgColor: obj.bgColor || "#7d8e91",
        listColor: obj.listColor || "red",
        scWidth: obj.scWidth || "300",
        scHeight: obj.scHeight || "25"
    };
    if ($(".scheduleX6").length === 1) {
        $(".scheduleX6").append('<div class="xList6"> <span class="xNum6"></span></div>');
        if (scheX6.again) {
            $(".xList6").css("width", "0");
        }
        $(".scheduleX6").css({
            "background-color": scheX6.bgColor,
            "width": scheX6.scWidth + "px",
            "height": scheX6.scHeight + "px"
        })
        $(".xList6").css("background-color", scheX6.listColor);
        var num = 0;
        var numAll = Math.round(scheX6.fulfill / scheX6.listAll * 100);
        var xNumAll = setInterval(function () {
            num++;
            $(".xNum6").html(num + "%");
            if (num == numAll) {
                clearInterval(xNumAll)
            }
        }, scheX6.speed)
        $(".xList6").animate({
            "width": numAll + "%"
        }, scheX6.speed * numAll)
    }
}

function scheduleX7(obj) {
    var scheX7 = {
        fulfill: obj.fulfill || 55,
        listAll: obj.listAll || 100,
        speed: obj.speed || 25,
        again: obj.again || true,
        bgColor: obj.bgColor || "#7d8e91",
        listColor: obj.listColor || "red",
        scWidth: obj.scWidth || "300",
        scHeight: obj.scHeight || "25"
    };
    if ($("#scheduleX7").length === 1) {
        $("#scheduleX7").append('<div class="xList7"> <span class="xNum7"></span></div>');
        if (scheX7.again) {
            $(".xList7").css("width", "0");
        }
        $("#scheduleX7").css({
            "background-color": scheX7.bgColor,
            "width": scheX7.scWidth + "px",
            "height": scheX7.scHeight + "px"
        })
        $(".xList7").css("background-color", scheX7.listColor);
        var num = 0;
        var numAll = Math.round(scheX7.fulfill / scheX7.listAll * 100);
        var xNumAll = setInterval(function () {
            num++;
            $(".xNum7").html(num + "%");
            if (num == numAll) {
                clearInterval(xNumAll)
            }
        }, scheX7.speed)
        $(".xList7").animate({
            "width": numAll + "%"
        }, scheX7.speed * numAll)
    }
}

function scheduleX8(obj) {
    var scheX8 = {
        fulfill: obj.fulfill || 55,
        listAll: obj.listAll || 100,
        speed: obj.speed || 25,
        again: obj.again || true,
        bgColor: obj.bgColor || "#7d8e91",
        listColor: obj.listColor || "red",
        scWidth: obj.scWidth || "300",
        scHeight: obj.scHeight || "25"
    };
    if ($("#scheduleX8").length === 1) {
        $("#scheduleX8").append('<div class="xList8"> <span class="xNum8"></span></div>');
        if (scheX8.again) {
            $(".xList8").css("width", "0");
        }
        $("#scheduleX8").css({
            "background-color": scheX8.bgColor,
            "width": scheX8.scWidth + "px",
            "height": scheX8.scHeight + "px"
        })
        $(".xList8").css("background-color", scheX8.listColor);
        var num = 0;
        var numAll = Math.round(scheX8.fulfill / scheX8.listAll * 100);
        var xNumAll = setInterval(function () {
            num++;
            $(".xNum8").html(num + "%");
            if (num == numAll) {
                clearInterval(xNumAll)
            }
        }, scheX8.speed)
        $(".xList8").animate({
            "width": numAll + "%"
        }, scheX8.speed * numAll)
    }
}
