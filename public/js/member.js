function onMemberSubmit(f) {
	if($("input[name='useridChk']").val() && $("input[name='userpwChk']").val() && $("input[name='usernameChk']").val()) return true;
	else return false;
}

$("input[name='userid']").blur(function(){
	var $input = $(this);
	$.get('/member/api/idchk', { userid: $(this).val().trim() }, function(r) {
		if(r.code == 200) {
			$input.addClass('border-blue').removeClass('border-red');
			$input.next().attr('class', 'text-primary').html(r.msg);
			$("input[name='useridChk']").val(true);
		}
		else {
			$input.addClass('border-red').removeClass('border-blue');
			$input.next().attr('class', 'text-danger').html(r.msg);
			$("input[name='useridChk']").val(false);
			$input.focus();
		}
	});
});

// console.log( $("body, html") );
// console.log( $("body", "html") ); // $("html").find("body")

$("input[name='userpw'], input[name='userpw2']").blur(function(){
	var $input = $(this);
	var $pw = $("input[name='userpw']");
	var $pw2 = $("input[name='userpw2']");
	var value = $input.val().trim();
	if(value.length < 8 || value.length > 24) {
		$input.addClass('border-red').removeClass('border-blue');
		$input.next().attr('class', 'text-danger').html('패스워드는 8 ~ 24자 입니다.');
		$("input[name='userpwChk']").val(false);
	}
	else {
		$pw2.next().html('');
		if($pw.val() == $pw2.val()) {
			$pw.addClass('border-blue').removeClass('border-red');
			$pw2.addClass('border-blue').removeClass('border-red');
			$pw.next().attr('class', 'text-primary').html('사용하실 수 있습니다.');
			$("input[name='userpwChk']").val(true);
		}
		else {
			$pw.addClass('border-red').removeClass('border-blue');
			$pw2.addClass('border-red').removeClass('border-blue');
			$pw.next().attr('class', 'text-danger').html('패스워드가 일치하지 않습니다.');
			$("input[name='userpwChk']").val(false);
		}
	}
});

$("input[name='username']").blur(function(){
	var $input = $(this);
	var value = $input.val().trim();
	if(value == "") {
		$input.addClass('border-red').removeClass('border-blue');
		$input.next().attr('class', 'text-danger').html('이름을 작성하세요.');
		$("input[name='usernameChk']").val(false);
	}
	else {
		$input.addClass('border-blue').removeClass('border-red');
		$input.next().attr('class', 'text-primary').html('이름을 사용하실 수 있습니다.');
		$("input[name='usernameChk']").val(true);
	}
});