var tTime = {
	value:{
		hour: 8,
		minute: 0,
		hour12: 8,
		meridiem: 'AM',
		formatTime: '8:00AM'
	},
	setValue : function(value, type){
		var h, m, t;
		if(type === 'h'){
			this.value.hour12 = value;
			if(this.value.meridiem == 'AM'){
				if(value == 12){
					this.value.hour = 0;
				}
				else{
					this.value.hour = value;
				}
			}
			else if(this.value.meridiem == 'PM'){
				this.value.hour = this.value.hour12 + 12;
				if(value == 12){
					this.value.hour = 12;
				}
			}
		}
		else if(type === 'm'){
			this.value.minute = +value;
		}
		else if(type === 't'){
			if(value == 'AM'){
				this.value.meridiem = 'AM';
				this.value.hour = this.value.hour12;
				if(this.value.hour12 == 12){
					this.value.hour = 0;
				}
			}
			else if(value == 'PM'){
				this.value.meridiem = 'PM';
				this.value.hour = this.value.hour12 + 12;
				if(this.value.hour12 == 12){
					this.value.hour = 12;
				}
			}
		}
		this.value.minute < 10 ? 
			this.value.formatTime = this.value.hour12 + ':0' + this.value.minute + this.value.meridiem 
			: this.value.formatTime = this.value.hour12 + ':' + this.value.minute + this.value.meridiem;
	},
	setStyle : function(id, styles){
		if(id.style){
			for(style in styles){
				id.style[style] = styles[style];
			}
		}
	},
	isNumber : function(value){
		return typeof value === 'number' && isFinite(value);
	},
	EventHandler : {
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
		keydown: function(id, type){
			var EventHandler = this;
			EventHandler.addHandler(id, 'keydown', function(e){
				e = EventHandler.getEvent(e);
				var target = EventHandler.getTarget(e);
				var hour;
				if(type === 't'){
					if(e.keyCode === 38 || e.keyCode === 40){
						if(target.value === 'PM'){
							target.value = 'AM';
							if(target.parentNode.parentNode.value.hour > 12){
								target.parentNode.parentNode.value.hour -= 12;
							}
						}
						else{
							target.value = 'PM';
							if(target.parentNode.parentNode.value.hour <= 12){
								target.parentNode.parentNode.value.hour += 12;
							}
						}
						hour = target.parentNode.parentNode.value.hour;
					}
					else if(e.key === 'a' || e.key === 'A'){
						target.value = 'AM';
						if(target.parentNode.parentNode.value.hour > 12){
							target.parentNode.parentNode.value.hour -= 12;
						}
					}
					else if(e.key === 'p' || e.key === 'P'){
						target.value = 'PM';
						if(target.parentNode.parentNode.value.hour <= 12){
							target.parentNode.parentNode.value.hour += 12;
						}
					}
					tTime.setValue(target.value, 't');
				}
				else if(type === 'm'){
					if(!isNaN(e.key) && e.keyCode !== 32){
						if(+target.value > 10 || +target.value > 5){
							target.value = '0' + e.key;
						}
						else{
							target.value = target.value.split('')[1] + e.key;
						}
						tTime.setValue(+target.value, 'm');
					}
				}
				else if(type === 'h'){
					if(!isNaN(e.key) && e.keyCode !== 32){
						if(e.key == 0){
							target.value = '12';
						}
						else if(+target.value == 1 && +e.key < 3){
							target.value = '1' + e.key;
						}
						else{
							target.value = e.key;
						}
						tTime.setValue(+target.value, 'h');
					}
					
				}
				EventHandler.preventDefault(e);
			});
		},
		focus: function(id, type){
			var EventHandler = this;
			if(type === 'hmt'){
				EventHandler.addHandler(id, 'focus', function(e){
					e= EventHandler.getEvent(e);
					var target = EventHandler.getTarget(e);
					var style = {
						outlineColor : '#d7daed',
						backgroundColor : '#d7daed',
						crusor: 'pointer'
					}
					tTime.setStyle(id, style); 
				});
			}
		},
		blur: function(id, type){
			var EventHandler = this;
			if(type === 'hmt'){
				EventHandler.addHandler(id, 'blur', function(e){
					e= EventHandler.getEvent(e);
					var target = EventHandler.getTarget(e);
					var style = {
						border : '0px',
						backgroundColor : 'white'
					}
					tTime.setStyle(id, style); 
				});
			}
		},
		preventDefault: function(e){
			if(e.preventDefault){
				e.preventDefault();
			}
			else{
				e.returnValue = false;
			}
		}
	},
	createTime: function(id){
		var tTime = this;
		var p = document.getElementById(id);
		var d = document.createElement('div');
		d.innerHTML = '<input type=\"text\">:<input type=\"text\"><input type=\"text\">';
		p.appendChild(d);
		var hmStyle = {
			height: '16px',
			lineHeight: '16px',
			width: '14px',
			padding: '0px',
			border: 'none',
			font: '12px'
		}
		var timeStyle = {
			height: '16px',
			width: '60px',
			paddingLeft: '7px',
			paddingTop: '5px',
			paddingBottom: '5px',
			paddingRight: '7px',
			backgroundColor: '#DDDDDD',
		}
		var h = d.firstChild;
		var m = h.nextSibling.nextSibling;
		var t = d.lastChild;
		tTime.setStyle(h, hmStyle);
		tTime.setStyle(m, hmStyle);
		tTime.setStyle(t, hmStyle);
		tTime.setStyle(d, timeStyle);
		h.style.textAlign = 'right';
		t.style.width = '22px';
		t.value = 'AM';
		p.value = tTime.value;
		h.value = tTime.value.hour;
		tTime.value.minute < 10 ? m.value = '0' + tTime.value.minute : m.value = tTime.value.minute;
		t.value = tTime.value.meridiem;

		tTime.EventHandler.keydown(t, 't');
		tTime.EventHandler.keydown(m, 'm');
		tTime.EventHandler.keydown(h, 'h');

		tTime.EventHandler.focus(h, 'hmt');
		tTime.EventHandler.focus(m, 'hmt');
		tTime.EventHandler.focus(t, 'hmt');

		tTime.EventHandler.blur(h, 'hmt');
		tTime.EventHandler.blur(m, 'hmt');
		tTime.EventHandler.blur(t, 'hmt');

		return p.value;
	},
	createDate: function(id){
		var tTime = this;
		var p = document.getElementById(id);
		var d = document.createElement('div');
		p.appendChild(d);
		d.innerHTML = '<input type=\"text\"></input>/<input type=\"text\"></input>/<input type=\"text\"></input>';
		var month = d.firstChild;
		var day = month.nextSibling.nextSibling;
		var year = d.lastChild;
		var currTime = new Date();
		day.value = currTime.getDate();
		month.value = currTime.getMonth() + 1;
		year.value = currTime.getFullYear();
	}
};