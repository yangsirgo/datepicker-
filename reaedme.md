新增：
1.新增setDisabled项，可以设置阶段禁用日期。
	例如：
	`		$('#div1').fullYearPicker('setDisabled',{`
			`pre_date_dis:$('#pre_date_dis').val(),`
			`aft_date_dis:$('#aft_date_dis').val()`
		  });`
2.解决设置区间没有角色的bug。