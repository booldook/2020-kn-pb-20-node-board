const alert = (msg, loc) => {
	return html = `
	<script>
		alert('${msg}');
		location.href = '${loc}';
	</script>`;
}

module.exports = { alert };