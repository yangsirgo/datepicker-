/**
 * Created by yang.guochao on 2017/8/4.
 */

$(document).on('click',".selectRowColDate",function(){
  var parentNode = $(this).parents('table');
  var isselected_num = 0;
	parentNode.find('td').each(function(){
	    if($(this).hasClass('selectRowDate')||$(this).hasClass('empty')||$(this).hasClass('disabled')){
	      return true;
	    }
        isselected_num++;
	    if(!$(this).hasClass('selected')){
	    $(this).addClass('selected');
	    }
	})
  if(parentNode.find('td.selected').length==isselected_num&&$(this).data('status')=='selected_all'){
    parentNode.find('td').removeClass('selected');
    $(this).data('status','selected_no');
  }else{
    $(this).data('status','selected_all');
  }
 })

$(document).on('click',".selectColDate",function(){
	var col = $(this).parent().find('th').index($(this)[0])+1;
	var isselected_num = 0;//已选择的日期列
	var standby_num = 0;//待选择的日期列
	var parentNode =$(this).parents('table');
	parentNode.find("tr td:nth-child("+col+")").each(function(){
	    if($(this).hasClass('selectColDate')||$(this).hasClass('empty')||$(this).hasClass('disabled')){
	      return true;
	    }
		standby_num++;
		if(!$(this).hasClass('selected')){
			$(this).addClass('selected');
		}else{
			isselected_num++;
		}
	})
	if(standby_num==isselected_num){
		$(this).data('status','selected_all');
	}
	if(standby_num==isselected_num&&$(this).data('status')=='selected_all'){
		parentNode.find("tr td:nth-child("+col+")").removeClass('selected');
		$(this).data('status','selected_no')
	}else{
		$(this).data('status','selected_all')
	}
});
$(document).on('click',".selectRowDate",function(){
	var isselected_num = 0;//已选择的日期列
	var standby_num = 0;//待选择的日期列
	var parentNode = $(this).parent();
	$(this).removeClass('selected');
	parentNode.find('td').each(function(){
	    if($(this).hasClass('selectRowDate')||$(this).hasClass('empty')||$(this).hasClass('disabled')){
	      return true;
	    }
		standby_num++;
		if(!$(this).hasClass('selected')){
			$(this).addClass('selected');
		}else{
			isselected_num++;
		}
	})
	if(isselected_num==standby_num){
		$(this).data('status','selected_all');
	}
	if(standby_num==isselected_num&&$(this).data('status')=='selected_all'){
		parentNode.find('td').removeClass('selected');
		$(this).data('status','selected_no')
	}else{
		$(this).data('status','selected_all')
	}
});
