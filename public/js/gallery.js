var $grid = $('.list-wrapper').imagesLoaded( function() {
	$(".loader").hide();
	$grid.css("visibility", "visible");
	$grid.masonry({
		itemSelector: '.list',
		columnWidth: '.list-sizer',
		percentPosition: true
	});
});

var id, seq;

function onDetail() {
	$(".modal-wing").css({"opacity": 1, "transform": "translateX(0)"});
}

$(".bt-hide").click(function(){
	$(".modal-wing").css({"opacity": 0, "transform": "translateX(-500px)"});
});

function onDownload() {
	// /gallery/download/3?seq=2, /gallery/download/3?seq=
	location.href = '/gallery/download/'+id+'?seq='+seq;
}

function onModal(idx) {
	id = idx;
	$.get('/gallery/view/'+id, function(r){
		var src, src2;
		if(r.savefile) {
			src = '/upload/' + r.savefile.substr(0, 6) + '/' + r.savefile;
			$(".modal-wrapper").find(".def-img").attr("src", src);
			$(".modal-wrapper").find(".bt-def").show();
		}
		if(r.savefile2) {
			src2 = '/upload/' + r.savefile2.substr(0, 6) + '/' + r.savefile2;
			$(".modal-wrapper").find(".hover-img").attr("src", src2);
			$(".modal-wrapper").find(".bt-hover").show();
		}
		$(".modal-wing").find(".title").html(r.title);
		$(".modal-wing").find(".writer").html(r.writer);
		$(".modal-wing").find(".content").html(r.content);
		$(".modal-wrapper").css("display", "flex");
	});
}

$(".modal-wrapper .bt-close").click(function(){
	$(".modal-wrapper").css("display", "none");
});

$(".modal-wrapper .bt-def").click(function(){
	$(".modal-wrapper").find(".def-img").stop().animate({"opacity": 1}, 500);
	$(".modal-wrapper").find(".hover-img").stop().animate({"opacity": 0}, 500);
	$(".modal-wrapper").find(".modal-pager > i").removeClass("active");
	$(this).addClass("active");
	seq = "";
}).trigger("click");

$(".modal-wrapper .bt-hover").click(function(){
	$(".modal-wrapper").find(".def-img").stop().animate({"opacity": 0}, 500);
	$(".modal-wrapper").find(".hover-img").stop().animate({"opacity": 1}, 500);
	$(".modal-wrapper").find(".modal-pager > i").removeClass("active");
	$(this).addClass("active");
	seq = "2";
});

function onChg(id) {
	location.href = '/gallery/wr/'+id;
}

function onRev(id, savefile, savefile2) {
	if(confirm("정말로 삭제하시겠습니까?")) {
		location.href = '/gallery/rev/'+id+'?savefile='+savefile+'&savefile2='+savefile2;
	}
}

function onImgRev(id, n, file) {
	if(confirm("이미지를 삭제하시겠습니까?")) {
		$.get('/gallery/api-img/'+id, {n: n, file: file}, function(r) {
			if(r.code == 200) {
				if(n == '') {
					$(".wr-wrap .img1").remove();
					$("input[name='savefile']").val('');
				}
				else {
					$(".wr-wrap .img2").remove();
					$("input[name='savefile2']").val('');
				}
			}
			else {
				console.log(r.error);
				alert('회원만 사용하실 수 있습니다. 로그인 후 이용하세요.');
			}
		});
	}
}

/*
$(".wr-wrap .fa-question").mouseenter(function(){
	$(this).find("span").css("opacity", 1);
});
$(".wr-wrap .fa-question").mouseleave(function(){
	$(this).find("span").css("opacity", 0);
});
*/

/* var grid = GridStack.init({
	animate: true,
}); */



function onGallerySubmit(f) {
	var title = f.title.value.trim();
	var writer = f.writer.value.trim();
	if(title == '') {
		alert("제목을 작성해 주세요.");
		f.title.focus();
		return false;
	}
	if(writer == '') {
		alert("작성자를 기재해 주세요.");
		f.writer.focus();
		return false;
	}
	return true;
}