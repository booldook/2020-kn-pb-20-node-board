module.exports = (pager) => {
	pager.stRec = (pager.page - 1) * pager.cnt;
	pager.lastPage = Math.ceil(pager.totalRec / pager.cnt);
	return pager;
}

