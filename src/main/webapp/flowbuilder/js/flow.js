$(function () {
    var self = this;

    $("#control-dialog").dialog({
        title: "工具栏",
        resizable: !1,
        width: 100,
        minWidth: 80,
        height: 300,
        position: [10, 50],
        create: function (ev, ui) {
            var b = $(this).closest(".ui-dialog");
            $("a.ui-dialog-titlebar-close", b).remove()
        }
    });

    $("li.menu-item", this.el).bind({
        mouseenter: function () {
            $(this).addClass("hover")
        },
        mouseleave: function () {
            $(this).removeClass("hover")
        }
    });

    $("li.ui-draggable", this.el).draggable({
        appendTo: "body",
        opacity: 0.7,
        cursorAt: {
            left: 2,
            top: 2
        },
        helper: "clone",
        revert: "invalid",
        start: function () {
    
        }

    });




});