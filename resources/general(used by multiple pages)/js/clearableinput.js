$(document).ready(function() {
    $(".clearableinput").each(function() {
        var $inp = $(this).find("input:text"),
            $cle = $(this).find(".clearableinput_X");
    
        $inp.on("input", function() {
            $cle.toggle(!!this.value);
        });
        
        $cle.on("touchstart click", function(e) {
            e.preventDefault();
            $inp.val("").trigger("input");
        });
    
  });
});