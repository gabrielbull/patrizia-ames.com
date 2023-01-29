var Butterflies = new Class({
	initialize: function(triggers, targets) {
		// Objects
		this.targets = targets;
		this.effects = new Array();
		var obj = this;
		// Initialize targets
		$each(targets, function(item, key) {
			item.set('open', 'false').setStyle('display', 'block');
			item.setStyle('display', 'none');
			obj.effects[key] = new Fx.Morph(item, {onComplete: function(item) { if(item.get('open')!='true') item.setStyle('display', 'none'); }});
		});
		// Initialize triggers
		$each(triggers, function(item, key) {
 			item.addEvent('click', function() { obj.toggle(key); });
		});
	},
	// Toggle targets
	toggle: function(key) {
		var target = this.targets[key];
		var obj = this;
		$each(this.targets, function(item, key) {
			// If target open
			if (item==target&&item.get('open')!='true') {
				item.setStyles({'overflow': 'hidden', 'display': 'block', 'opacity': 0});
				item.set('open', 'true');
				obj.effects[key].start({'opacity': 1});
			} 
			// If open close
			else if (item.get('open')=='true') {
				item.set('open', 'false');
				obj.effects[key].start({'opacity': 0});
			}
		});
		
	}
});
	
var butterflies;
window.addEvent('domready', function() { butterflies = new Butterflies($$('a.link'), $$('div.target')); });