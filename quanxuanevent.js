/**
 * Created by yang.guochao on 2017/8/4.
 */
$(document).on('click',".selectRowColDate",function(){
	$(this).parents('table').find('td').each(function(){
		if (!/disabled|empty|selectColDate|selected/g.test(this.className)) $(this).toggleClass('selected');
	})
});

$(document).on('click',".selectColDate",function(){
	var col = $(this).parent().find('th').index($(this)[0])+1;
	$(this).parents('table').find("tr td:nth-child("+col+")").each(function(){
		if (!/disabled|empty|selectRowDate|selected/g.test(this.className)) $(this).toggleClass('selected');
	})

	//开始检测对应日期的竞品。
	//var ddate = [];
	//$(" tr td:nth-child("+col+") input:enabled").each(function(){
	//	// ddate.push('"'+$(this).val()+'"');
	//	ddate.push($(this).val());
	//});
	//var sdate 		= ddate;
	//var channId		= $('input[name=orderchannel]').val();
	//var adPlaceId	= $('#orderadplace').val();
	//var adBrandId		= $('#form_brandid').val();
	////alert(ddate);
	////	alert(sdate);alert(channId);alert(adPlaceId);alert(adBrandId);
	//$.post("ajax_check_vie_brand.php",{type:2,'sdate':sdate,channId:channId,adPlaceId:adPlaceId,adBrandId:adBrandId},function(data){
	//	if(data['status']==0){
	//		$.messager.alert('提示消息',data['info'],'question');
	//	}
	//},'json');
});
$(document).on('click',".selectRowDate",function(){
	$(this).parent().find('td').each(function(){
		if (!/disabled|empty|selectCowDate|selected/g.test(this.className)) $(this).toggleClass('selected');
	})
	//开始检测对应日期的竞品。
	//var cdate = [];
	//$(this).parent().find("input:enabled").each(function(){
	//	cdate.push($(this).val());
	//});
	//var sdate2 		= cdate;
	//var channId2	= $('input[name=orderchannel]').val();
	//var adPlaceId2	= $('#orderadplace').val();
	//var adBrandId2	= $('#form_brandid').val();
	//$.post("ajax_check_vie_brand.php",{type:2,'sdate':sdate2,channId:channId2,adPlaceId:adPlaceId2,adBrandId:adBrandId2},function(data){
	//	if(data['status']==0){
	//		$.messager.alert('提示消息',data['info'],'question');
	//	}
	//},'json');

});