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
    $(this).data('status','selected_no')
  }else{
    $(this).data('status','selected_all')
  }
 })

$(document).on('click',".selectColDate",function(){
	var col = $(this).parent().find('th').index($(this)[0])+1;
	$(this).parents('table').find("tr td:nth-child("+col+")").each(function(){
    if($(this).hasClass('selectColDate')||$(this).hasClass('empty')||$(this).hasClass('disabled')){
      return true;
    }
		$(this).toggleClass('selected');
	})
});
$(document).on('click',".selectRowDate",function(){
	$(this).parent().find('td').each(function(){
    if($(this).hasClass('selectRowDate')||$(this).hasClass('empty')||$(this).hasClass('disabled')){
      return true;
    }
		$(this).toggleClass('selected');
	})
});
