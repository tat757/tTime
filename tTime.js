var tTime = {
	add: function(id){
			var setStyle = function(d){
			d.style.height = '12px';
			d.style.width = '14px';
			d.style.padding = '0px';
			d.style.border = 'none';
			d.style.backgroundColor = '#f0efe7';
		}
		var EventHandler = {
			addHandler : function(element, type, handler){
				if(element.addEventListener){
					element.addEventListener(type, handler, false);
				}
				else if(element.attachEvent){
					element.attachEvent('on' + type, handler);
				}
				else{
					element['on' + type] = handler;
				}
			},

			getEvent : function(e){
				return e ? e : window.event;
			},

			getTarget : function(e){
				return e.target || e.srcElement;
			},

			keyup : function(id, type, callback){
				EventHandler.addHandler(id, 'keyup', function(e){
					e = EventHandler.getEvent(e);
					var target = EventHandler.getTarget(e);

					if(!isNaN(e.key)){
						if(type === 'h'){
							if(parseInt(target.value) > 12){
								target.value = +e.key;
							}
						}
						else if(type === 'm'){
							if(parseInt(target.value) > 59){
								target.value = +e.key;
							}
						}
						callback(null);
					}
					callback(true);
				});
			},
			keypress : function(id, type){
				EventHandler.addHandler(id, 'keypress', function(e){
					e = EventHandler.getEvent(e);
					var target = EventHandler.getTarget(e);
					console.log(e.key);
					if(type === 'hm'){
						if(!isNaN(e.key)){
							if(target.value.split('').length > 1){
								target.value = target.value.slice(0, 0);
							}
						}
						else{
							EventHandler.preventDefault(e);
						}
					}
					else if(type === 't'){
						console.log(e);
						if(e.key === 'A' || e.key === 'a'){
							target.value = 'AM';
							if(target.parentNode.parentNode.value.hour >= 12){
								target.parentNode.parentNode.value.hour -= 12;
							}
							EventHandler.preventDefault(e);
						}
						else if(e.key === 'P' || e.key === 'p'){
							target.value = 'PM';
							if(target.parentNode.parentNode.value.hour < 12){
								target.parentNode.parentNode.value.hour += 12;
							}
							EventHandler.preventDefault(e);
						}
						else{
							EventHandler.preventDefault(e);
						}
						
					}
				});
			},
			keydown: function(id, type){
				EventHandler.addHandler(id, 'keydown', function(e){
					e = EventHandler.getEvent(e);
					var target = EventHandler.getTarget(e);
					if(e.keyCode === 38 || e.keyCode === 40){
						if(target.value === 'PM'){
							target.value = 'AM';
							if(target.parentNode.parentNode.value.hour >= 12){
								target.parentNode.parentNode.value.hour -= 12;
							}
						}
						else{
							target.value = 'PM';
							if(target.parentNode.parentNode.value.hour < 12){
								target.parentNode.parentNode.value.hour += 12;
							}
						}
						EventHandler.preventDefault(e);
					}
				});
			},
			preventDefault: function(e){
				if(e.preventDefault){
					e.preventDefault();
				}
				else{
					e.returnValue = false;
				}
			}
		}
		var p = document.getElementById(id);
		var d = document.createElement('div');
		console.log(d);
		d.innerHTML = '<input type=\"text\">:<input type=\"text\"><input type=\"text\">';
		p.appendChild(d);
		console.log(d.childElementCount);
		console.log(d.firstChild);
		var style = {
			height: '12px',
			width: '14px',
			padding: '0px',
			border: 'none'
		}
		var h = d.firstChild;
		var m = h.nextSibling.nextSibling;
		var t = d.lastChild;
		setStyle(h);
		setStyle(m);
		setStyle(t);
		t.style.width = '22px';
		t.value = 'AM';
		p.value = {};

		EventHandler.keyup(h, 'h', function(err, res){ p.value.hour = +h.value; console.log(h.value);});
		EventHandler.keyup(m, 'm', function(err, res){ p.value.minute = +m.value; console.log(p.value);});
		EventHandler.keypress(h, 'hm');
		EventHandler.keypress(m, 'hm');
		EventHandler.keypress(t, 't');
		EventHandler.keydown(t, 't');

		return p.value;
	}

};