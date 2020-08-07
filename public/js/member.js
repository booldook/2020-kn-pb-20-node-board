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