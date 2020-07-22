init(1);
function init(page) {
	var sendData = { page: page }, html = '';
	function onResponse(r) {
		if(r.code == 200) {
			$("tbody.lists").empty();
			for(var i in r.lists) {
				html = '<tr>';
				html+= '<td>'+r.lists[i].id+'</td>';
				html+= '<td>'+r.lists[i].writer+'</td>';
				html+= '<td>'+r.lists[i].createdAt+'</td>';
				html+= '<td>'+r.lists[i].comment+'</td>';
				html+= '</tr>';
				$("tbody.lists").append(html);
			}
		}
		else {
			alert("통신오류가 발생하였습니다. 잠시 후 시도해 주세요.");
		}
	}
	$.get('/gbook/api/list', sendData, onResponse);
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
		console.log(r);
	}
	$.post('/gbook/api/save', sendData, onResponse);
}

