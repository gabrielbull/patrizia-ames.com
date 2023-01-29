var Controler = new Class({
	initialize: function() {
		this.container = $(document.body).getElement('div.player');
		var songs = this.container.getElements('li');
		$each(songs, function(item){
			item.getElement('a').addEvent('click', function(e){
				e.stop();
				controls.play(this);
			});
		});
		// Stop Button
		$(document.body).getElement('a.stop').addEvent('click', function() { controls.stopPlaying(); });
	},
	play: function(item) {
		this.wmpcount = 0;
		// Get item position
		if ($chk(item.getParent('ul').getPrevious('ul'))) var col = 2; else var col = 1;
		var pos = 0, found = false;
		$each(item.getParent('ul').getElements('a'), function (anchor) { if (!found) pos++; if (item==anchor) found = true; });
		this.song = pos+(col-1)*11;
		// Create Player for IE
		if (Browser.Engine.trident) {
			// Play song
			player.url = item;
			// Add events
			player.attachEvent("playStateChange", controls.wmpstatus);
		}
		// Create Player for HTML5
		else {			
			// Create Player
			if ($chk($('player'))) $('player').destroy();
			new Element('audio', {'id': 'player'}).inject($(document.body));
			// Add Events
			$('player').addEventListener("waiting", function() { controls.loader(); }, true);
			$('player').addEventListener("canplay", function() { controls.icon(); }, true);
//			v.addEventListener("ended", function() { alert('ended'); }, true);
			// Play Song
			$('player').set('src', item);
			$('player').play();
		}
	},
	loader: function() {
		// Destroy current icons
		if ($chk($('playerloader'))) $('playerloader').destroy();
		if ($chk($('playericon'))) $('playericon').destroy();
		// Create new loader
		new Element('img', {'src': '/images/elements/player/loading.gif', 'width': 12, 'height': 12, 'id': 'playerloader', 'styles': {
			'position': 'absolute', 'top': 62 + (this.song-(this.song>11 ? 11 : 0)) * 19, 'left': this.song>11 ? 352 : 10
		}}).inject(this.container);
	},
	icon: function() {
		// Destroy current icons
		if ($chk($('playerloader'))) $('playerloader').destroy();
		if ($chk($('playericon'))) $('playericon').destroy();
		// Create icon
		new Element('img', {'src': '/images/elements/player/icon.gif', 'width': 12, 'height': 12, 'id': 'playericon', 'styles': {
			'position': 'absolute', 'top': 62 + (this.song-(this.song>11 ? 11 : 0)) * 19, 'left': this.song>11 ? 352 : 10
		}}).inject(this.container);
		// Create stop button
		$(document.body).getElement('a.stop').setStyle('display', 'block');
	},
	stopPlaying: function() {
		// Destroy current icons
		if ($chk($('playerloader'))) $('playerloader').destroy();
		if ($chk($('playericon'))) $('playericon').destroy();
		// Destroy player
		if (Browser.Engine.trident) {
			var wmvplayer = document.getElementById('player').object;
			wmvplayer.controls.stop();
		} else {
			$('player').destroy();
		}
		// Hide stop button
		$(document.body).getElement('a.stop').setStyle('display', 'none');
	},
	wmpstatus: function() {
		switch (player.playstate) {
			case 3: controls.icon(); break;
			case 6: controls.loader(); break;
		}
	}
});

var controls;
window.addEvent('domready', function() { controls = new Controler(); });