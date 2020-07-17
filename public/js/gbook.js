// uglifyjs ./public/js/gbook.js -c -m -o ./public/js/gbook.min.js.min.js
function onGbookSubmit(f) {
	if(f.writer.value.trim() == "") {
		alert('작성자란이 비어있습니다.');
		f.writer.focus();
		return false;
	}
	if(f.comment.value.trim() == "") {
		alert('한줄 내용이 비어있습니다.');
		f.comment.focus();
		return false;
	}
	return true;
}