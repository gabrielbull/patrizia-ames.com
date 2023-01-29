var BrowserFixes = function() {
	// Internet Explorer
	if (Browser.Engine.trident) {
		// Fix PNGs
		if (Browser.Engine.version==4) { var css = new Element('link', {'href': '/css/iepngfix.css', 'rel': 'stylesheet', 'type': 'text/css'}).inject($(document)); }
		// Fix clears
		/*$each($(document.body).getElements('br'), function(item) {
			if ($chk(item.get("style"))) {
				new Element('div', {'html': '<!-- Internet Explorer Fix -->', 'styles': {'clear': 'both', 'height': 0, 'overflow': 'hidden'}}).inject(item, 'after');
				item.destroy();
			}
		});*/
		// Fix white space under images
		$each($(document.body).getElements('img'), function(item){ item.addEvent('load', function(item) { this.set('alt', ''); }).setStyle('display', 'block').set('GALLERYIMG', 'no'); });
		// Fix HR
		$each($(document.body).getElements('hr'), function(item){
			new Element('div', {'html': '<!-- Internet Explorer Fix -->', 'class': 'hr'}).inject(item, 'after');
			item.destroy();
		});
		// Fix Legends
		$each($(document.body).getElements('legend'), function(item){ item.setStyles({'position': 'absolute', 'left': '-7px'}); });
		// Fix last and first childs in tables for styling and lists for IE6 only (implemented in IE7 and IE8)
		var rowgroups = $(document.body).getElements('thead, tbody, tfoot, ul, ol');
		// Do rows
		rowgroups.each(function(group){
		    var rows = group.getElements('td, th, li');
		    // Add style to columns for first row
		    if (Browser.Engine.version==4) { rows[0].addClass('first-child'); }
		    // Add style to columns for last row
			rows[(rows.length-1)].addClass('last-child');
		});
		// Fix Buttons Spaces
		$(document.body).getElements('a.button').each(function(item){ item.set('html', item.get('html').replace(/ /g, '&nbsp;')); });
	}
	// Firefox
	else if (Browser.Engine.gecko) {
		// Fix Legends
		$each($(document.body).getElements('legend'), function(item){
			new Element('div', {'class': 'legend', 'html': item.get('html'), 'styles': {'top': '-40px', 'left': '-10px'}}).inject(item, 'after');
			item.destroy();
		}); 
	}
	// All browsers add class to target=_blank links
	$each($(document.body).getElements('a.[target=_blank]'), function(item) { item.addClass('external'); });
	
}

var language;

window.addEvent('domready', function() {
	// Fix Browser spesific bugs
	BrowserFixes.run();	
	// Find language of the page
	var meta = document.getElement('meta');
	var proceed = true;
	do {
		if (meta.get('content')=="en"||meta.get('content')=="fr"||meta.get('content')=="en-CA"||meta.get('content')=="fr-CA") {
			proceed=false;
			if (meta.get('content')=="fr"||meta.get('content')=="fr-CA") language = 'fr'; else language = 'en';
		} else meta = meta.getNext('meta');
	} while (proceed);
	$(document.body).addClass(language);
});