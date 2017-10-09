/**
 * Created by yang.guochao on 2017/8/4.
 */
(function () {
	Date.prototype.format = function(fmt) {
		var o = {
			"M+" : this.getMonth()+1,                 //月份
			"d+" : this.getDate(),                    //日
			"h+" : this.getHours(),                   //小时
			"m+" : this.getMinutes(),                 //分
			"s+" : this.getSeconds(),                 //秒
			"q+" : Math.floor((this.getMonth()+3)/3), //季度
			"S"  : this.getMilliseconds()             //毫秒
		};
		if(/(y+)/.test(fmt)) {
			fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
		}
		for(var k in o) {
			if(new RegExp("("+ k +")").test(fmt)){
				fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
			}
		}
		return fmt;
	}
	function Conv_date(data_str){
		var reg = /^\d{4}-\d{2}-\d{2}/;
		if(!reg.test(data_str)){
			return;
		}
		return parseInt(data_str.replace('-','').replace('-',''));
	}
	function tdClass(i, disabledDay, sameMonth, values, dateStr,predd,aftdd,roll_play) {
		var cls = i == 0 || i == 6 ? 'weekend' : '';
		if((predd||aftdd)&&dateStr){
			if(Conv_date(dateStr)<Conv_date(predd)){
				cls += (cls ? ' ' : '') + 'disabled';
			}
			if(Conv_date(dateStr)>Conv_date(aftdd)){
				cls += (cls ? ' ' : '') + 'disabled';
			}
		}
		if (disabledDay && disabledDay.indexOf(i) != -1) cls += (cls ? ' ' : '') + 'disabled';
		if (!sameMonth) cls += (cls ? ' ' : '') + 'empty';
		if (sameMonth && values && values.indexOf(',' + dateStr + ',') != -1) {
			//admin 需要indexOf这个条件
			if(cls.indexOf('disabled') == -1 ){
				cls += (cls ? ' ' : '') + 'selected';
			}
			//user的话 不用indexOf 这个条件
			if(roll_play == 'user'&&cls.indexOf('selected') == -1 ){
				cls += (cls ? ' ' : '') + 'selected';
			}
		}
		return cls == '' ? '' : ' class="' + cls + '"';
	}
	function renderMonth(year, month, clear, disabledDay, values,predd,aftdd,roll_play) {
		var d = new Date(year, month - 1, 1), s = '<table bordercolor="black" border="1" cellspacing="0" cellpadding="0"' + (clear ? ' class="right"' : '') + '>'
			+ '<tr><th colspan="8" class="head">' + year + '年' + month + '月</th></tr>' +
			'<tr><th class="selectRowColDate">+</th><th class="selectColDate">↓</th><th class="selectColDate">↓</th><th class="selectColDate">↓</th><th class="selectColDate">↓</th><th class="selectColDate">↓</th><th class="selectColDate">↓</th><th class="selectColDate">↓</th></tr>'
			+ '<tr><th></th><th class="weekend">日</th><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th class="weekend">六</th></tr>';
		var dMonth = month - 1;
		var firstDay = d.getDay(), hit = false;
		s += '<tr><td class="selectRowDate">→</td>';
		for (var i = 0; i < 7; i++)
			if (firstDay == i || hit) {
				s += '<td' + tdClass(i, disabledDay, true, values, year + '-' + month + '-' + (d.getDate()<10?('0'+d.getDate()):d.getDate()),predd,aftdd,roll_play)+ '>' + (d.getDate()<10?('0'+d.getDate()):d.getDate()) + '</td>';
				d.setDate(d.getDate() + 1);
				hit = true;
			} else s += '<td' + tdClass(i, disabledDay, false) + '>&nbsp;</td>';
		s += '</tr>';
		for (var i = 0; i < 5; i++) {
			s += '<tr><td class="selectRowDate">→</td>';
			for (var j = 0; j < 7; j++) {
				s += '<td' + tdClass(j, disabledDay, d.getMonth() == dMonth, values, year + '-' + month + '-' + (d.getDate()<10?('0'+d.getDate()):d.getDate()),predd,aftdd,roll_play) + '>' + (d.getMonth() == dMonth ? (d.getDate()<10?('0'+d.getDate()):d.getDate()) : '&nbsp;') + '</td>';
				d.setDate(d.getDate() + 1);
			}
			s += '</tr>';
		}
		return s + '</table>' + (clear ? '<br>' : '');
	}
	function getDateStr(td) {
		return td.parentNode.parentNode.rows[0].cells[0].innerHTML.replace(/[年月]/g, '-') + td.innerHTML
	}
	function renderYear(year, el, disabledDay, value,maxmonthnum,startmonth,predd,aftdd,roll_play) {
		el.find('td').unbind();
		var s = '',values = ',' + value.join(',') + ',';
		var maxmonthnum = maxmonthnum || 12;
		var startmonth = startmonth || 1;
		for (var i = startmonth; i <= maxmonthnum; i++) {
			i<10?(i='0'+i):i;
			s += renderMonth(year, i, false, disabledDay, values,predd,aftdd,roll_play);
		}

		el.find('div.picker').append(s).find('td').click(function () {
			if (!/disabled|empty/g.test(this.className)) $(this).toggleClass('selected');
			if (this.className.indexOf('empty') == -1&& !$(this).hasClass('selectRowDate') && typeof el.data('config').cellClick == 'function')
				el.data('config').cellClick(getDateStr(this), this);
		});
	}
	//@config：配置，具体配置项目看下面
	//@param：为方法时需要传递的参数
	$.fn.fullYearPicker = function (config, param) {
		if (config === 'setqujian' ||config === 'setDisabledDay' || config === 'setYear' || config === 'getSelected' || config === 'acceptChange' || config === 'setColors'|| config === 'setDisabled') {//方法
			var me = $(this);
			if (config == 'setYear') {//重置年份
				me.data('config').year = param;//更新缓存数据年份
				me.find('div.year a:first').trigger('click', true);
			}
			else if (config == 'getSelected') {//获取当前当前年份选中的日期集合（注意不更新默认传入的值，要更新值请调用acceptChange方法）
				return me.find('td.selected').map(function () { return getDateStr(this); }).get();
			}
			else if (config == 'acceptChange') {//更新日历值，这样才会保存选中的值，更换其他年份后，再切换到当前年份才会自动选中上一次选中的值
				me.data('config').value = me.fullYearPicker('getSelected');
			}
			else if (config == 'setColors') {//设置单元格颜色 param格式为{defaultColor:'#f00',dc:[{d:'2017-8-2',c:'blue'}..]}，dc数组c缺省会用defaultColor代替，defaultColor也缺省默认红色
				return me.find('td').each(function () {
					var d = getDateStr(this);
					var $t = $(this);
					for (var i = 0; i < param.dc.length; i++)
						if (d == param.dc[i].d&&!$t.hasClass('selected')){
							this.style.backgroundColor = param.dc[i].c || param.defaultColor || '#f00';
							$t.addClass('disabled').attr('title',param.dc[i].title||'');
						}
				});
			}else if(config == 'setqujian'){
				me.data('config').startmonth = param.star;
				me.data('config').endmonth = param.end;
				me.html('');
				me.fullYearPicker({
					disabledDay: me.data('config').disabledDay,
					value:  me.data('config').value,
					startmonth: param.start,
					endmonth: param.end,
					yearScale: me.data('config').yearScale,
					cellClick: me.data('config').cellClick,
					roll_play: me.data('config').roll_play
				});
			}else if(config == 'setDisabledDay'){
				me.data('config').disabledDay = param;//更新不可点击星期
				if (param) {
					me.find('table tr:gt(1)').find('td').each(function () {
						if (param.indexOf(this.cellIndex) != -1)
							this.className = (this.className || '').replace('selected', '') + (this.className ? ' ' : '') + 'disabled';
					});
				}
			} else if(config == 'setDisabled'){//设置禁选日期两个参数 pre_date_dis  aft_date_dis
				return me.find('td').each(function () {
					var d = this.parentNode.parentNode.rows[0].cells[0].innerHTML.replace(/[年月]/g, '') + this.innerHTML;
					var $t = $(this);
					if(!$t.hasClass('selected')){//没有选中日期部分
						if(param.pre_date_dis&&d < Conv_date(param.pre_date_dis)){
							$t.addClass('disabled');
						}else if(param.aft_date_dis&&d > Conv_date(param.aft_date_dis)){
							$t.addClass('disabled');
						}else{
							console.log($t.attr('style'));
							if(typeof($t.attr('style'))=="undefined"){
								$t.removeClass('disabled');
							}
						}
					}
				});
			}
			else {
				me.find('td.disabled').removeClass('disabled');
				me.data('config').disabledDay = param;//更新不可点击星期
				if (param) {
					me.find('table tr:gt(1)').find('td').each(function () {
						if (param.indexOf(this.cellIndex) != -1)
							this.className = (this.className || '').replace('selected', '') + (this.className ? ' ' : '') + 'disabled';
					});
				}
			}
			return this;
		}
		//@year:显示的年份
		//@disabledDay:不允许选择的星期列，注意星期日是0，其他一样
		//@cellClick:单元格点击事件（可缺省）。事件有2个参数，第一个@dateStr：日期字符串，格式“年-月-日”，第二个@isDisabled，此单元格是否允许点击
		//@value:选中的值，注意为数组字符串，格式如['2016-6-25','2016-8-26'.......]
		//@yearScale:配置这个年份变为下拉框，格式如{min:2000,max:2020}
		//@startmonth:配置选择的年月日，格式如2017-06-25
		//@endmonth:配置结束的年月日，格式如2017-06-25
		//@pre_date_dis:这天以前的日期不可选，格式如2017-06-25  可以在使用setDisable选项  设置
		//@aft_date_dis:这天以后的日期不可选，格式如2017-06-25
		//@roll_play:两种user和admin user对禁用日期可提交但是不可编辑，admin是超级管理员。
		config = $.extend({ year: new Date().getFullYear(), disabledDay: '', value: [],pre_date_dis:false,aft_date_dis:false}, config);
		return this.addClass('fullYearPicker').each(function () {
			var me = $(this),
				year = config.year || new Date().getFullYear(),
				newConifg = {
					cellClick: config.cellClick,
					disabledDay: config.disabledDay,
					year: year, value: config.value,
					yearScale: config.yearScale,
					startmonth:config.startmonth,
					endmonth:config.endmonth,
					pre_date_dis:config.pre_date_dis,
					aft_date_dis:config.aft_date_dis,
					roll_play:config.roll_play
				};
			me.data('config', newConifg);
			var selYear = '';
			if (newConifg.yearScale) {
				selYear = '<select>';
				for (var i = newConifg.yearScale.min, j = newConifg.yearScale.max; i < j; i++) selYear += '<option value="' + i + '"' + (i == year ? ' selected' : '') + '>' + i + '</option>';

				selYear += '</select>';
			}
			selYear = selYear || year;
			//me.append('<div class="year"><a href="#">上一年</a>' + selYear + '年<a href="#" class="next">下一年</a></div><div class="picker"></div>')
			me.append('<div class="picker"></div>')
			me.find('a').click(function (e, setYear) {
				if (setYear) year = me.data('config').year;
				else this.innerHTML == '上一年' ? year-- : year++;
				me.find('select').val(year);
				me.find('div.picker').html('');
				renderYear(year, $(this).closest('div.fullYearPicker'), newConifg.disabledDay, newConifg.value);
				this.parentNode.firstChild.nextSibling.data = year + '年';
				return false;
			}).end().find('select').change(function () {
				me.fullYearPicker('setYear', this.value);
			});
			var qujianObj = qujian(newConifg.startmonth,newConifg.endmonth);
			var startmonth = (qujianObj.startyear_monthnum);
			if(qujianObj.zhengnian<0){
				renderYear(qujianObj.startyear, me, newConifg.disabledDay, newConifg.value,(qujianObj.endyear_monthnum),startmonth,newConifg.pre_date_dis?newConifg.pre_date_dis:undefined,newConifg.aft_date_dis?newConifg.aft_date_dis:undefined,newConifg.roll_play);
			}else if(qujianObj.zhengnian>=0){
				renderYear((qujianObj.startyear), me, newConifg.disabledDay, newConifg.value,12,startmonth,newConifg.pre_date_dis?newConifg.pre_date_dis:undefined,newConifg.aft_date_dis?newConifg.aft_date_dis:undefined,newConifg.roll_play);//头一年
				for (var j = 1; j < (qujianObj.zhengnian)+1; j++) {
					renderYear((qujianObj.startyear)+j, me, newConifg.disabledDay, newConifg.value,12,1,newConifg.pre_date_dis?newConifg.pre_date_dis:undefined,newConifg.aft_date_dis?newConifg.aft_date_dis:undefined,newConifg.roll_play);
				}
				renderYear((qujianObj.startyear)+(qujianObj.zhengnian)+1, me, newConifg.disabledDay, newConifg.value, (qujianObj.endyear_monthnum),1,newConifg.pre_date_dis?newConifg.pre_date_dis:undefined,newConifg.aft_date_dis?newConifg.aft_date_dis:undefined,newConifg.roll_play);//最后一年
			}
		});
	};
})();
/*
 * 月份区间
 *
 * */
function qujian(start,end){
	var reg = /^\d{4}-\d{2}/;
	if(reg.test(start)&&reg.test(end)){
		var year1 = start.substr(0, 4);
		var year2 = end.substr(0, 4);
		var month1 = start.substr(5, 2);
		var month2 = end.substr(5, 2);
	}else{
		alert('请输入正确格式的日期，如2013-04-01');
		return {
			zhengnian:0,
			startyear_monthnum:'1',
			endyear_monthnum :'12',
			startyear:new Date().getFullYear()
		}
	}
	return {
		zhengnian:parseInt(year2 - year1 - 1),
		startyear_monthnum:parseInt(month1),
		endyear_monthnum :parseInt(month2),
		startyear:parseInt(year1)
	}
}