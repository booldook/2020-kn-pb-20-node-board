var grid = GridStack.init({
	animate: true,
});



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