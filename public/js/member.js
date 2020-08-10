function onMemberSubmit(f) {
	if(f.userid.value.trim() == "") {
		alert("아이디입력");
		f.userid.focus();
		return false;
	}
	if(f.userpw.value.trim() == "") {
		alert("패스워드입력");
		f.userpw.focus();
		return false;
	}
	if(f.userpw2.value.trim() == "") {
		alert("패스워드입력");
		f.userpw2.focus();
		return false;
	}
	if(f.userpw.value.trim() != f.userpw2.value.trim()) {
		alert("패스워드 불일치");
		f.userpw.focus();
		return false;
	}
	if(f.username.value.trim() == "") {
		alert("이름입력");
		f.username.focus();
		return false;
	}
	return true;
}

$("input[name='userid']").blur(function(){
	var $input = $(this);
	$.get('/member/api/idchk', { userid: $(this).val() }, function(r) {
		if(r.code == 200) {
			$input.addClass('border-blue').removeClass('border-red');
			$input.next().attr('class', 'text-primary').html(r.msg);
		}
		else {
			$input.addClass('border-red').removeClass('border-blue');
			$input.next().attr('class', 'text-danger').html(r.msg);
			$input.focus();
		}
	});
});