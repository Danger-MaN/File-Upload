$(function(){
var bar1 = '<div class="bar progress">';
var bar2 = '<div style="width: 100%;" class="progressbar"></div>';
var bar3 = '<div class="percents">... Loading</div>';
var bar4 = '</div>';
var Divbar = $('.loadbox');
var timer = Array;
function ProgressBar_Loading( place , Speed , Value , Num, lazy )
{
		place.append( '<div class="bar progress Num'+Num+'">'+bar2+bar3+bar4 )
		var that = ('.Num'+Num)
		$(that +' .progressbar').css({'width':'0%'});
		$(that +' .percents').delay(lazy).html('0%');
		var PerCent = 0;
		timer[Num] = setInterval( function(){
			PerCent = Math.floor(PerCent) + Value;
			setTimeout( function(){
				if( PerCent <= 99 ){
				$(that +' .percents').html( PerCent + '%' )
				$(that +' .progressbar').css({'width': PerCent+'%'})
				}else if( PerCent >= 99 ){
				$(that +' .percents').html( 'يرجى الانتظار' )
				$(that +' .progressbar').css({'width': '100%'})
				clearInterval( timer[Num] )
				}
			}, lazy)
	} , Speed );
}
$('.uploader :input[type="file"]').change(function(){
	var Size = this.files[0].size;
	$(this).next('input[type="hidden"]').attr('value', Size);
})
$('form').submit(function(){
	$('.tabmain').css({'display':'none'})
	var url = 'progress/upload.php'
	var postData = $( this ).serialize()
	var Divbar = $('.loadbox')
	var lazy = 0
	$.ajax({
		type : 'POST',
		url : url,
		async : false,
		data : postData,
		beforeSend : function (){
			$('.loadbox').css({'display':'block'});
		},
		success : function (returnData) {
			var obj = $.parseJSON( returnData );
			$.each(obj, function(i, item) {
				if( i > 0 ){
					lazy = 2000+(i*1000)
				}
				console.log(lazy)
				var ObjInt = parseInt( obj[i] );
				if( $.isNumeric(ObjInt) ){
					if( ObjInt <= 512000 ){
						ProgressBar_Loading( Divbar, 500, 8.6, i, lazy )
					}else if( ObjInt <= 102400 ){ // 100 KB
						ProgressBar_Loading( Divbar, 800, 6.6, i, lazy )
					}else if( ObjInt <= 512000 ){ // 500 KB
						ProgressBar_Loading( Divbar, 900, 5.2, i, lazy  )
					}else if( ObjInt <= 1048576 ){ // 1MB
						ProgressBar_Loading( Divbar, 2000, 1.6, i, lazy  )
					}else if( ObjInt <= 2097152 ){ // 2MB
						ProgressBar_Loading( Divbar, 2000, 1.4, i, lazy  )
					}else if( ObjInt <= 3145728 ){ // 3MB
						ProgressBar_Loading( Divbar, 2000, 1.1, i, lazy  )
					}else if( ObjInt <= 4194304 ){ // 4MB
						ProgressBar_Loading( Divbar, 2000, 0.8, i, lazy  )
					}else if( ObjInt <= 5242880 ){ // 5MB
						ProgressBar_Loading( Divbar, 3000, 1.9, i, lazy  )
					}else if( ObjInt <= 10485760 ){ //10MB
						ProgressBar_Loading( Divbar, 7000, 1.7, i, lazy )
					}else if( ObjInt <= 31457280 ){ //30MG
						ProgressBar_Loading( Divbar, 7000 , 1.2, i, lazy )
					}else if( ObjInt <= 52428800 ){ // 50MG
						ProgressBar_Loading( Divbar, 10000 , 1.8, i, lazy )
					}else if( ObjInt <= 104857600 ){ // 100MG
						ProgressBar_Loading( Divbar, 20000 , 1.2, i, lazy )
					}else if( ObjInt <= 209715200 ){ // 200MG
						ProgressBar_Loading( Divbar, 30000 , 0.8, i, lazy )
					}else if( ObjInt <= 314572800 ){ // 300MG
						ProgressBar_Loading( Divbar, 40000, 0.4, i, lazy )
					}else if( ObjInt <= 524288000 ){ // 500MG
						ProgressBar_Loading_+i( Divbar, 60000, 0.3, i, lazy )
					}else{
						ProgressBar_Loading( Divbar, 3000, 0.5, i )
					} // End speed
				}
			});
		},
		error : function () {
		},
		complete : function (){
		}
	});
})
})