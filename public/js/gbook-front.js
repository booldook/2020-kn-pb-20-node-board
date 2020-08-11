init(1);
function init(page) {
	function onResponse(r) {
		if(r.user && r.user.userid) {
			$(".navi.logout").hide();
			$(".navi.login").show();
			$("input[name='writer']").val(r.user.username);
		}
		else {
			$(".navi.logout").show();
			$(".navi.login").hide();
		}
		var $lists = $("tbody.lists"), html = '';
		if(r.code == 200) {
			pagerInit(r.pager);
			$lists.find('tr').css({"opacity": 0});
			setTimeout(function(){
				$lists.empty();
				for(var i in r.lists) {
					html = '<tr style="opacity: 0; transition: all 0.2s ease '+(i* 0.1)+'s;">';
					html+= '<td>'+r.lists[i].id+'</td>';
					html+= '<td>'+r.lists[i].writer+'</td>';
					html+= '<td>'+r.lists[i].createdAt+'</td>';
					html+= '<td class="text-left">'+r.lists[i].comment+'</td>';
					html+= '</tr>';
					$lists.append(html);
				}
				setTimeout(function(){
					$lists.find("tr").css({"opacity": 1});
				}, 300);
			}, ($lists.find("tr").length > 0) ? ($lists.find("tr").length * 100 + 100) : 0);
		}
		else {
			alert("통신오류가 발생하였습니다. 잠시 후 시도해 주세요.");
		}
	}
	$.get('/gbook/api/list/'+page, onResponse);
}

function pagerInit(pager) {
	console.log(pager);
	var html = '';
	html += '<li class="page-item" onclick="init(1);"><i class="page-link fa fa-angle-double-left"></i></li>';
	html += '<li class="page-item" onclick="init('+pager.prev+');"><i class="page-link fa fa-angle-left"></i></li>';
	for(var i=pager.grpSt; i<=pager.grpEd; i++) {
		html += '<li class="page-item '+((i == pager.page) ? 'active' : '')+'" onclick="init('+i+');"><i class="page-link">'+i+'</i></li>';
	}
	html += '<li class="page-item" onclick="init('+pager.next+');"><i class="page-link fa fa-angle-right"></i></li>';
	html += '<li class="page-item" onclick="init('+pager.lastPage+');"><i class="page-link fa fa-angle-double-right"></i></li>';
	$(".pagination").html(html);
}

$("#btSave").click(onSave);
function onSave() {
	var $f = $("form[name='gbookForm']");
	var $writer = $("form[name='gbookForm']").find("input[name='writer']");
	var $comment = $("form[name='gbookForm']").find("input[name='comment']");
	if($writer.val().trim() == "") {
		alert('작성자란이 비어있습니다.');
		$writer.focus();
		return false;
	}
	if($comment.val().trim() == "") {
		alert('한줄 내용이 비어있습니다.');
		$comment.focus();
		return false;
	}
	var sendData = {
		writer: $writer.val().trim(),
		comment: $comment.val().trim()
	}
	function onResponse(r) {
		if(r.code == 200) init(1);
		else alert("저장이 실패했습니다. 관리자에게 문의하세요.");
	}
	$("form[name='gbookForm']")[0].reset();
	$.post('/gbook/api/save', sendData, onResponse);
}

