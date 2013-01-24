$(document).ready(function()
{
    home_page.init();
});

var home_page  = {

    //Initializes all required event handlers and other required behaviors
    init : function()
    {
        //Sets the background size for IE 7-8
        $(".kitchen-blurry").css({backgroundSize: "cover"});
        $(".logo-main").css({backgroundSize: "cover"});

        //Activate form validation
        $("#mc-embedded-subscribe").click(home_page.subscribe);
        //$("#mc-embedded-subscribe-form").submit(home_page.validateForm);

        //Set event hanlders required
        $(".hoverable")
            .click(home_page.displayDetails)
            .mouseenter(home_page.highlightItem)
            .mouseleave(home_page.unhighlightItem);
        $("#main-content").click(home_page.hideDetails);

        //Initiate display images sequence
        setTimeout(home_page.hideDetails, 800);
        setTimeout(home_page.displayPins, 1000);
    },

    //Triggers the form submition
    subscribe : function(e)
    {
        $("#mc_submit_button").click();
        //$("#mc-embedded-subscribe-form").submit();
    },

    //Validates the form.  NOT USED but could be used for IE
    validateForm : function()
    {
        var email = $("#mce-EMAIL").val();
        if ((email != "") && (validateEmail(email))){
            return true;
        } else {
            $("#mce-EMAIL").select().focus();
            return false;
        }
    },

    //Display the pins on the image
    displayPins : function()
    {
        $(".pin").removeClass("hide").delay(100).fadeIn(300);
    },

    //Display the details for a selected pin
    displayDetails : function(e)
    {
        var icon = $(e.target).parent();
        var iconClasses = icon.attr("class").split(" ");
        var elementName = "";
        for (var i=0; i <= iconClasses.length; i++) {
            var className = iconClasses[i];
            if (className != 'pin'){
                elementName = className;
                break;
            }
        }

        //If the pin clicked is different from the one that is currently active
        if (icon.attr("class") != $(".pin.active").attr("class")){
            //The knives are on the opposite side, so the icon won't be rotated
            if (className != "knives"){
                $(".pin.active").removeClass("active").transition({ rotate: '0deg' });
                //icon.css({ transformOrigin: '5px 2px' });
                icon.transition({ rotate: '180deg' }, 500, 'in-out');
            }
            icon.addClass("active");

            //Display blurry kitchen, corresponding texts and route
            $("#main-content").attr("class", "kitchen-blurry");
            $("#item-thumbnail").attr("class", "content-description-image image-" + elementName);
            $(".content-description-text-long").children().addClass("hide");
            $("#item-text-long-" + elementName).removeClass("hide");
            $(".content-description-text-short").children().addClass("hide");
            $("#item-text-short-" + elementName).removeClass("hide");
            home_page.displayRoute(icon);
        } else {
            //If the pin clicked is the active one, hide the details
            home_page.hideDetails(e);
        }

        //Stops the event propagation
        e.stopPropagation();
        return false;
    },

    //Hide the details for a selected pin
    hideDetails : function(e)
    {
        var elementName = "none";
        $(".pin.active").removeClass("active").transition({ rotate: '0deg' });
        $("#main-content").attr("class", "kitchen-normal");
        $("#item-thumbnail").attr("class", "content-description-image image-" + elementName);
        $(".content-description-text-long").children().addClass("hide");
        $("#item-text-long-" + elementName).removeClass("hide");
        $(".content-description-text-short").children().addClass("hide");
        $("#item-text-short-" + elementName).removeClass("hide");
        home_page.hideRoute();
    },

    //Hightlight item on hover
    highlightItem : function(e)
    {
        var icon = $(e.target).parent();
        icon.transition({ scale: 1.1 }, 100, 'in-out');
    },

    //Brings a item to its normal size after hover
    unhighlightItem : function(e)
    {
        var icon = $(e.target).parent();
        icon.transition({ scale: 1 }, 100, 'in-out');
    },

    //Displays the route from a pin to the enlarged thumbnail
    displayRoute : function(source)
    {
        //Calculate route
        var top = parseInt(source.css("margin-top")) + 27;
        var left = parseInt(source.css("margin-left")) + 16;
        var newWidth = left - 118;
        var newHeight = 570 - top;

        //Display route
        $(".pin-route").css({ "margin-top": top, "width": newWidth, "height": newHeight });
        $(".pin-route").fadeIn(1000);

        //Screoll if necessary
        var diff = $(document).height() - $(window).height();
        if (diff > 150){
            var pos = $(".footer").offset().top - $(window).height() - 20;
            $("body").scrollTo(Math.max(pos, 0), 500);
        }
    },

    //Hides the route
    hideRoute : function()
    {
        $(".pin-route").fadeOut(100);
    }


}


//Validates the email.. NOT USED, but could be used for IE
function validateEmail(email)
{
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
