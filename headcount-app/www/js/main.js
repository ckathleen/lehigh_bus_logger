// list of all templates
var hb_t = {};

// List of template names. For entry "abc" in this list,
// we will create field hb_t.abc in the above map using file
// "templates/abc.hb"
var hblist = [ "headcountForm" ];

// When the page has been loaded and all js code is available, call
// loadTemplates to fetch and parse the templates. When all templates
// are loaded, buildPage will run
$(document).ready(function() {
    loadTemplates(buildPage);
});

// Load the handlebar template files. Once all the templates are loaded,
// run "action
function loadTemplates(action) {
    // keep track of the number of templates we still need to load
    var remain = hblist.length;
    // Function to load template then call action() iff all templates loaded
    var loader = function(i) {
        
    }
}