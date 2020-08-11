function onMemberSubmit(f) {
	if($("form[name='memberForm']").find("input[name='useridChk']").val() && $("form[name='memberForm']").find("input[name='userpwChk']").val() && $("form[name='memberForm']").find("input[name='usernameChk']").val()) return true;
	else return false;
}

$("form[name='memberForm']").find("input[name='userid']").blur(function(){
	var $input = $(this);
	$.get('/member/api/idchk', { userid: $(this).val().trim() }, function(r) {
		if(r.code == 200) {
			$input.addClass('border-blue').removeClass('border-red');
			$input.next().attr('class', 'text-primary').html(r.msg);
			$("form[name='memberForm']").find("input[name='useridChk']").val(true);
		}
		else {
			$input.addClass('border-red').removeClass('border-blue');
			$input.next().attr('class', 'text-danger').html(r.msg);
			$("form[name='memberForm']").find("input[name='useridChk']").val(false);
			$input.focus();
		}
	});
});

// console.log( $("body, html") );
// console.log( $("body", "html") ); // $("html").find("body")

$("form[name='memberForm']").find("input[name='userpw'], input[name='userpw2']").blur(function(){
	var $input = $(this);
	var $pw = $("form[name='memberForm']").find("input[name='userpw']");
	var $pw2 = $("form[name='memberForm']").find("input[name='userpw2']");
	var value = $input.val().trim();
	if(value.length < 8 || value.length > 24) {
		$input.addClass('border-red').removeClass('border-blue');
		$input.next().attr('class', 'text-danger').html('패스워드는 8 ~ 24자 입니다.');
		$("form[name='memberForm']").find("input[name='userpwChk']").val(false);
	}
	else {
		$pw2.next().html('');
		if($pw.val() == $pw2.val()) {
			$pw.addClass('border-blue').removeClass('border-red');
			$pw2.addClass('border-blue').removeClass('border-red');
			$pw.next().attr('class', 'text-primary').html('사용하실 수 있습니다.');
			$("form[name='memberForm']").find("input[name='userpwChk']").val(true);
		}
		else {
			$pw.addClass('border-red').removeClass('border-blue');
			$pw2.addClass('border-red').removeClass('border-blue');
			$pw.next().attr('class', 'text-danger').html('패스워드가 일치하지 않습니다.');
			$("form[name='memberForm']").find("input[name='userpwChk']").val(false);
		}
	}
});

$("form[name='memberForm']").find("input[name='username']").blur(function(){
	var $input = $(this);
	var value = $input.val().trim();
	if(value == "") {
		$input.addClass('border-red').removeClass('border-blue');
		$input.next().attr('class', 'text-danger').html('이름을 작성하세요.');
		$("form[name='memberForm']").find("input[name='usernameChk']").val(false);
	}
	else {
		$input.addClass('border-blue').removeClass('border-red');
		$input.next().attr('class', 'text-primary').html('이름을 사용하실 수 있습니다.');
		$("form[name='memberForm']").find("input[name='usernameChk']").val(true);
	}
});


var $userid = $("form[name='loginForm']").find("input[name='userid']"); 
var $userpw = $("form[name='loginForm']").find("input[name='userpw']");
function onLoginSubmit(f) {
	var userid = $userid.val().trim(); 
	var userpw = $userpw.val().trim(); 
	if(userid == "") {
		$userid.next().removeClass("d-none");
		$userid.focus();
		return false;
	}
	if(userpw == "") {
		$userpw.next().removeClass("d-none");
		$userpw.focus();
		return false;
	}
	return true;
}
$userid.keyup(onKeyUp);
$userpw.keyup(onKeyUp);
function onKeyUp() {
	if($(this).val().trim().length > 0) {
		$(this).next().addClass("d-none");
	}
}
