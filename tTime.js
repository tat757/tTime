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
	create: function(id){
		var tTime = this;
		var setStyle = function(d, styles){
			if(d.style){
				for(style in styles){
					d.style[style] = styles[style];
				}
			}
		}
		var isNumber = function(value){
			return typeof value === 'number' && isFinite(value);
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
			keydown: function(id, type){
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
				if(type === 'hmt'){
					EventHandler.addHandler(id, 'focus', function(e){
						e= EventHandler.getEvent(e);
						var target = EventHandler.getTarget(e);
						var style = {
							outlineColor : '#d7daed',
							backgroundColor : '#d7daed',
							crusor: 'pointer'
						}
						setStyle(id, style); 
					});
				}
			},
			blur: function(id, type){
				if(type === 'hmt'){
					EventHandler.addHandler(id, 'blur', function(e){
						e= EventHandler.getEvent(e);
						var target = EventHandler.getTarget(e);
						var style = {
							border : '0px',
							backgroundColor : 'white'
						}
						setStyle(id, style); 
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
		}
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
		var tTimeStyle = {
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
		setStyle(h, hmStyle);
		setStyle(m, hmStyle);
		setStyle(t, hmStyle);
		setStyle(d, tTimeStyle);
		h.style.textAlign = 'right';
		t.style.width = '22px';
		t.value = 'AM';
		p.value = this.value;
		h.value = this.value.hour;
		this.value.minute < 10 ? m.value = '0' + this.value.minute : m.value = this.value.minute;
		t.value = this.value.meridiem;

		EventHandler.keydown(t, 't');
		EventHandler.keydown(m, 'm');
		EventHandler.keydown(h, 'h');

		EventHandler.focus(h, 'hmt');
		EventHandler.focus(m, 'hmt');
		EventHandler.focus(t, 'hmt');

		EventHandler.blur(h, 'hmt');
		EventHandler.blur(m, 'hmt');
		EventHandler.blur(t, 'hmt');

		return p.value;
	}

};