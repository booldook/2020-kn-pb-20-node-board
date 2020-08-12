const alert = (msg, loc) => {
	return html = `
	<script>
		alert('${msg}');
		location.href = '${loc}';
	</script>`;
}

const getIP = req => req.headers['x-forwarded-for'] || req.connection.remoteAddress;

module.exports = { alert, getIP };