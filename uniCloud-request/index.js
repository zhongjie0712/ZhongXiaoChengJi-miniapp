export const uniCloudRequset = (name, data = {}, option = {
	loading: true
}) => {
	if (option.loading) {
		uni.showLoading({
			title: '查询中...'
		})
	}
	return new Promise((resolve, reject) => {
		uniCloud.callFunction({
			name,
			data
		}).then((res) => {
			resolve(res);
		}).catch((err) => {
			reject(err)
			uni.showModal({
				content: `查询失败，错误信息为：${err.message}`,
				showCancel: false
			})
		})
	})

}
