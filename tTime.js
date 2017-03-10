var tTime = {
	value:{
		time : {
			hour: 8,
			minute: 0,
			hour12: 8,
			meridiem: 'AM',
			formatTime: '8:00AM'
		},
		date : {
			month: 0,
			day: 1,
			year: 2017,
			formatDate: '1/01/2017',
			tableMonth: 0,
			tableYear: 2017
		}
	},
	dropTheadStyle : {
		height: '16px',
		width: '232px',
		backgroundColor: 'white',
		borderBottomWidth: '1px',
		borderBottomStyle: 'solid',
		borderBottomColor: '#85144b',
		paddingBottom: '1px',
		paddingLeft: '0px',
		paddingRight: '0px',
		display: 'block',
		float: 'left'
	},
	dropTheadCellStyle : {
		fontSize: '12px', 
		width: '33px',
		padding: '0',
		textAlign: 'center', 
		cursor: 'default',
		display: 'inline-block'
	},
	setValue : function(value, type){
		var tTime = this;
		if(type === 'hour'){
			tTime.value.time.hour12 = value;
			if(tTime.value.time.meridiem == 'AM'){
				if(value == 12){
					tTime.value.time.hour = 0;
				}
				else{
					tTime.value.time.hour = value;
				}
			}
			else if(tTime.value.time.meridiem == 'PM'){
				tTime.value.time.hour = tTime.value.time.hour12 + 12;
				if(value == 12){
					tTime.value.time.hour = 12;
				}
			}
		}
		else if(type === 'minute'){
			tTime.value.time.minute = +value;
		}
		else if(type === 'time'){
			if(value == 'AM'){
				tTime.value.time.meridiem = 'AM';
				tTime.value.time.hour = tTime.value.time.hour12;
				if(tTime.value.time.hour12 == 12){
					tTime.value.time.hour = 0;
				}
			}
			else if(value == 'PM'){
				tTime.value.time.meridiem = 'PM';
				tTime.value.time.hour = tTime.value.time.hour12 + 12;
				if(tTime.value.time.hour12 == 12){
					tTime.value.time.hour = 12;
				}
			}
		}
		else if(type === 'date'){
			var date = new Date(value);
			var day;
			tTime.value.date.month = date.getMonth() + 1;
			tTime.value.date.day = date.getDate();
			tTime.value.date.year = date.getFullYear();
			tTime.value.date.day < 10 ? day = '0' + tTime.value.date.day : day = tTime.value.date.day;
			tTime.value.date.formatDate = tTime.value.date.month + '\/' + day + '\/' + tTime.value.date.year;
		}
		tTime.value.time.minute < 10 ? 
			tTime.value.time.formatTime = tTime.value.time.hour12 + ':0' + tTime.value.time.minute + tTime.value.time.meridiem 
			: tTime.value.time.formatTime = tTime.value.time.hour12 + ':' + tTime.value.time.minute + tTime.value.time.meridiem;
	},
	setDate : function(id){
		id.firstChild.value = tTime.value.date.formatDate;
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
				var check = false;
				var keyValue;
				if(type === 'time'){
					if(e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.keyCode === 38 || e.keyCode === 40){
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
					else if(e.key === 'a' || e.key === 'A' || e.keyCode === 65){
						target.value = 'AM';
						if(target.parentNode.parentNode.value.hour > 12){
							target.parentNode.parentNode.value.hour -= 12;
						}
					}
					else if(e.key === 'p' || e.key === 'P' || e.keyCode === 80){
						target.value = 'PM';
						if(target.parentNode.parentNode.value.hour <= 12){
							target.parentNode.parentNode.value.hour += 12;
						}
					}
					tTime.setValue(target.value, 'time');
				}
				else if(type === 'minute'){
					if(e.key){
						if(!isNaN(e.key) && !(e.key === ' ' || e.keyCode === 32)){
							check = true;
						}
					}
					else{
						if(e.keyCode >= 48 && e.keyCode <= 57){
							check = true;
						}
					}
					if(check){
						e.key ? keyValue = e.key : keyValue = String.fromCharCode(e.keyCode);
						if(+target.value > 10 || +target.value > 5){
							target.value = '0' + keyValue;
						}
						else{
							target.value = target.value.split('')[1] + keyValue;
						}
						tTime.setValue(+target.value, 'minute');
					}
				}
				else if(type === 'hour'){
					if(e.key){
						if(!isNaN(e.key) && !(e.key === ' ' || e.keyCode === 32)){
							check = true;
						}
					}
					else{
						if(e.keyCode >= 48 && e.keyCode <= 57){
							check = true;
						}
					}
					if(check){
						e.key ? keyValue = e.key : keyValue = String.fromCharCode(e.keyCode);
						if(keyValue == 0){
							target.value = '12';
						}
						else if(+target.value == 1 && +keyValue < 3){
							target.value = '1' + keyValue;
						}
						else{
							target.value = keyValue;
						}
						tTime.setValue(+target.value, 'hour');
					}
					
				}
				EventHandler.preventDefault(e);
			});
		},
		focus: function(id, type){
			var EventHandler = this;
			if(type === 'time'){
				EventHandler.addHandler(id, 'focus', function(e){
					e= EventHandler.getEvent(e);
					var target = EventHandler.getTarget(e);
					var style = {
						outlineColor : '#d7daed',
						backgroundColor : '#d7daed',
						cursor: 'pointer'
					}
					tTime.setStyle(id, style); 
				});
			}
			else if(type === 'date'){
				EventHandler.addHandler(id, 'focus', function(e){
					e= EventHandler.getEvent(e);
					var target = EventHandler.getTarget(e);

					tTime.setStyle(target.parentNode.nextSibling, {display: 'block'}); 
				});

			}
		},
		blur: function(id, type){
			var EventHandler = this;
			if(type === 'time'){
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
		mouseover: function(id, type){
			var EventHandler = this;
			if(type === 'dateCell'){
				EventHandler.addHandler(id, 'mouseover', function(e){
					e = EventHandler.getEvent(e);
					var target = EventHandler.getTarget(e);
					if(id.style.backgroundColor !== 'rgb(0, 128, 255)' && id.style.backgroundColor !== '#0080ff'){
						tTime.setStyle(id, {backgroundColor: '#00bfff'});
					}
				});
			}
		},
		mouseout: function(id, type){
			var EventHandler = this;
			if(type === 'dateCell'){
				EventHandler.addHandler(id, 'mouseout', function(e){
					e = EventHandler.getEvent(e);
					var target = EventHandler.getTarget(e);
					if(id.style.backgroundColor !== 'rgb(0, 128, 255)' && id.style.backgroundColor !== '#0080ff'){
						tTime.setStyle(id, {backgroundColor: 'white'});
					}
				});
			}
		},
		click: function(id, type){
			var EventHandler = this;
			if(type === 'window'){
				EventHandler.addHandler(id, 'click', function(e){
					e = EventHandler.getEvent(e);
					var target = EventHandler.getTarget(e);
					if(target.className !== 'tTimeDateInput'){
						if(target.className == 'tTimeDateCell'){
							var oldSelected = document.querySelectorAll('[data-selected]');
							for(selected in oldSelected){
								if(oldSelected[selected].dataset && oldSelected[selected].dataset.selected){
									oldSelected[selected].dataset.selected = false;
									oldSelected[selected].style.backgroundColor = 'white';
								}
							}
							target.style.backgroundColor = '#0080ff';
							target.dataset.selected = true;
							tTime.setValue(target.dataset.date, 'date');
							target.parentNode.parentNode.parentNode.style.display = 'none';
							tTime.setDate(target.parentNode.parentNode.parentNode.previousSibling);

						}
						else if(target.className !== 'tTimeDropTitleLeftButton' && target.className !== 'tTimeDropTitleRightButton'){
							document.getElementsByClassName('tTimeDrop')[0].style.display = 'none';
						}
					}
				});
			}
			else if(type === 'button'){
				EventHandler.addHandler(id, 'click', function(e){
					e = EventHandler.getEvent(e);
					var target = EventHandler.getTarget(e);
					if(target.className == 'tTimeDropTitleLeftButton'){
						if(tTime.value.date.tableMonth == 0){
							tTime.value.date.tableMonth = 11;
							tTime.value.date.tableYear--;
						}
						else{
							tTime.value.date.tableMonth--;
						}
						var title = target.parentNode;
						var tbody = target.parentNode.parentNode.lastChild;
						var tableTime = new Date();
						tableTime.setMonth(tTime.value.date.tableMonth);
						tableTime.setYear(tTime.value.date.tableYear);
						tableTime.setDate(1);
						tbody.innerHTML = '';
						tTime.createDropTbody(tableTime, tbody);
						title.innerHTML = '';
						tTime.createDropTitle(tableTime, title);
					}
					else if(target.className == 'tTimeDropTitleRightButton'){
						if(tTime.value.date.tableMonth == 11){
							tTime.value.date.tableMonth = 1;
							tTime.value.date.tableYear++;
						}
						else{
							tTime.value.date.tableMonth++;
						}
						var title = target.parentNode;
						var tbody = target.parentNode.parentNode.lastChild;
						var tableTime = new Date();
						tableTime.setMonth(tTime.value.date.tableMonth);
						tableTime.setYear(tTime.value.date.tableYear);
						tableTime.setDate(1);
						tbody.innerHTML = '';
						tTime.createDropTbody(tableTime, tbody);
						title.innerHTML = '';
						tTime.createDropTitle(tableTime, title);
					}
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
			font: '12px',
			cursor: 'pointer'
		}
		var timeStyle = {
			height: '16px',
			width: '60px',
			paddingLeft: '7px',
			paddingTop: '5px',
			paddingBottom: '5px',
			paddingRight: '7px',
			backgroundColor: '#DDDDDD',
			float : 'left',
			cursor: 'pointer'
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
		p.value = tTime.value.time;
		h.value = tTime.value.time.hour;
		tTime.value.time.minute < 10 ? m.value = '0' + tTime.value.time.minute : m.value = tTime.value.time.minute;
		t.value = tTime.value.time.meridiem;

		tTime.EventHandler.keydown(t, 'time');
		tTime.EventHandler.keydown(m, 'minute');
		tTime.EventHandler.keydown(h, 'hour');

		tTime.EventHandler.focus(h, 'time');
		tTime.EventHandler.focus(m, 'time');
		tTime.EventHandler.focus(t, 'time');

		tTime.EventHandler.blur(h, 'time');
		tTime.EventHandler.blur(m, 'time');
		tTime.EventHandler.blur(t, 'time');

		return p.value;
	},
	createDropTbody : function(tableTime, dropTbody){
		var tTime = this;
		var start = false;
		var done = false;
		var i, j, cell, row;
		var dayCount = 1;
		tableTime.setDate(1);
		for(i = 0; i < 6; i++){
			row = document.createElement('tr');
			for(j = 0; j < 7; j++){
				cell = document.createElement('td');
				if(start){
					cell.innerHTML = dayCount;
					cell.dataset.date = (tableTime.getMonth() + 1) + '\/' + dayCount + '\/' + tableTime.getFullYear();
					dayCount++;
				}
				else{
					if(j === tableTime.getDay()){
						start = true;
						cell.innerHTML = dayCount;
						cell.dataset.date = (tableTime.getMonth() + 1) + '\/' + dayCount + '\/' + tableTime.getFullYear();
						dayCount++;
					}
				}
				if(start){
					tTime.EventHandler.mouseover(cell, 'dateCell');
					tTime.EventHandler.mouseout(cell, 'dateCell');
				}
				tTime.setStyle(cell, tTime.dropTheadCellStyle);
				cell.className = 'tTimeDateCell';
				cell.style.height = '22px';
				cell.style.cursor = 'pointer';
				cell.style.paddingTop = '0px';
				cell.style.verticalAlign = 'middle';
				cell.style.lineHeight = '22px';
				if(tTime.value.date.tableMonth == tTime.value.date.month - 1 && tTime.value.date.tableYear == tTime.value.date.year && dayCount == tTime.value.date.day + 1){
					cell.style.backgroundColor = '#0080ff';
					cell.dataset.selected = true;
				}
				row.appendChild(cell);
				switch(tableTime.getMonth()){
					case 0:
					case 2:
					case 4:
					case 6:
					case 7:
					case 9:
					case 11:
						if(dayCount > 31){
							done = true;
						}
						break;
					case 3:
					case 5:
					case 8:
					case 10:
						if(dayCount > 30){
							done = true;
						}
						break;
					case 1:
						if(tableTime.getFullYear()%4 === 0){
							if(dayCount > 29){
								done = true;
							}
						}
						else{
							if(dayCount > 28){
								done = true;
							}
						}
						break;
				}
				if(done){
					break;
				}
			}
			dropTbody.appendChild(row);
			row = null;
			if(done){
				break;
			}
		}	
	},
	createDropTitle : function(tableTime, dropTitle){
		var tTime = this;
		var month;
		var year = tableTime.getFullYear();
		var text = document.createElement('p');
		var leftButton = document.createElement('button');
		var rightButton = document.createElement('button');
		var leftArrow = document.createElement('p');
		var rightArrow = document.createElement('p');
		var monthList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		month = monthList[tableTime.getMonth()];
		text.style.margin = '0px';
		text.style.fontWeight = 'bold';
		text.style.fontSize = '16px';
		text.style.lineHeight = '32px';
		text.style.verticalAlign = 'center';
		text.style.textAlign = 'center';
		text.style.cursor = 'default';
		text.style.width = '160px';
		text.style.float = 'left';
		text.innerHTML = month + ' ' + year;
		leftButton.innerHTML = '<';
		leftButton.className = 'tTimeDropTitleLeftButton';
		rightButton.className = 'tTimeDropTitleRightButton';
		rightButton.innerHTML = '>';
		var dropTitleButtonStyle = {
			width : '36px',
			height : '32px',
			float : 'left',
			cursor : 'pointer',
			backgroundColor: 'white'
		}
		tTime.setStyle(leftButton, dropTitleButtonStyle);
		tTime.setStyle(rightButton, dropTitleButtonStyle);
		tTime.EventHandler.click(leftButton, 'button');
		tTime.EventHandler.click(rightButton, 'button');
		dropTitle.appendChild(leftButton);
		dropTitle.appendChild(text);
		dropTitle.appendChild(rightButton);
	},
	createDate: function(id){
		var tTime = this;
		var p = document.getElementById(id);
		var d = document.createElement('div');
		var drop = document.createElement('div');
		var dropTitle = document.createElement('div');
		var dropThead = document.createElement('div');
		var dropTbody = document.createElement('div');
		p.appendChild(d);
		d.innerHTML = '<input type=\"text\"></input>';
		drop.className = 'tTimeDrop';
		p.appendChild(drop);
		
		var date = d.firstChild;
		date.className = 'tTimeDateInput';
		var currTime = new Date();
		tTime.EventHandler.focus(date, 'date');
		tTime.EventHandler.keydown(date, '');
		tTime.EventHandler.click(window, 'window');
		//set style
		var dateStyle = {
			height : '16px',
			width : '70px',
			padding : '0px',
			border : 'none',
			font : '12px',
			textAlign : 'center',
			cursor: 'pointer',
			disabled : true
		};
		var dStyle = {
			height: '16px',
			width: '70px',
			paddingLeft: '7px',
			paddingTop: '5px',
			paddingBottom: '5px',
			paddingRight: '7px',
			backgroundColor: '#DDDDDD',
			position: 'relative',
			float : 'left',
			cursor: 'pointer'
		};
		var dropStype = {
			fontFamily: 'Arial, Helvetica, sans-serif',
			marginTop: '28px',
			height: '181px',
			width: '232px',
			position: 'absolute',
			backgroundColor: 'white',
			display: 'none',
			zIndex: '1'
		};
		var dropTitleStyle = {
			height: '32px',
			backgroundColor: 'white'
		};
		var dropTbodyStyle = {
			float: 'left'
		}
		tTime.setStyle(date, dateStyle);
		tTime.setStyle(d, dStyle);
		tTime.setStyle(drop, dropStype);
		tTime.setStyle(dropTitle, dropTitleStyle);
		tTime.setStyle(dropThead, tTime.dropTheadStyle);
		tTime.setStyle(dropTbody, dropTbodyStyle);
		//initialize value to user's current time
		tTime.setValue(currTime, 'date');
		tTime.value.date.tableMonth = tTime.value.date.month - 1;
		tTime.value.date.tableYear = tTime.value.date.year;
		p.value = tTime.value.date;
		date.value = tTime.value.date.formatDate;

		//set drop
		drop.appendChild(dropTitle);
		drop.appendChild(dropThead);
		drop.appendChild(dropTbody);
		var weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
		var i, j, k;
		var cell, cellText, row, dayCount, wd;
		var tableTime = currTime;
		for(i = 0; i < 7; i++){
			cell = document.createElement('li');
			cell.innerHTML = weekday[i];
			tTime.setStyle(cell, tTime.dropTheadCellStyle);
			dropThead.appendChild(cell);
			cell = null;
			cellText = null;
		}
		dayCount = 1;
		
		tTime.createDropTitle(tableTime, dropTitle);
		tTime.createDropTbody(tableTime, dropTbody);
	}
};