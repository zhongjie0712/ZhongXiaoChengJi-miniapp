<template>
	<view class="content">
		<view class="title">
			<view style="font-weight: bold;">钟家村寄宿学校</view>
			<view style="font-size: 40rpx;margin-top: 16rpx;">{{(new Date()).getFullYear()}}学年成绩查询</view>
		</view>
		<view class="cell-list">
			<van-cell-group>
				<van-field value="英语" label="学 科:" placeholder="请输入姓名" input-align="right" readonly />
				<view @click="popupShow">
					<van-field :value="gradeClass" label="班 级:" placeholder="请选择班级" input-align="right" readonly>
						<van-icon slot="right-icon" name="arrow-down" />
					</van-field>
				</view>
				<van-popup :show="show" position="bottom" @click="onClose">
					<van-picker :columns="selector" :loading="pickerLoading" show-toolbar @cancel="onClose" @confirm="onConfirm" />
				</van-popup>
				<van-field :value="name" label="姓 名:" placeholder="请输入姓名" input-align="right" maxlength="6" clearable @change="onChangeName" />
				<van-field :value="studentNumber" label="学 号:" placeholder="请输入学号" input-align="right" maxlength="10" clearable
				 @change="onChangeStudentNumber" />
			</van-cell-group>
		</view>
		<view class="btn-box">
			<van-button type="primary" :disabled="gradeClass && name && studentNumber ? false : true" block @click="getScore">查询</van-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				pickerLoading: true,
				name: '',
				studentNumber: '',
				gradeClass: '',
				selector: []
			}
		},
		mounted() {
			// this.getGradeClassList()
		},
		methods: {
			onChangeName(event) {
				this.name = event.detail
			},
			onChangeStudentNumber(event) {
				this.studentNumber = event.detail
			},

			popupShow() {
				this.show = true
				if (this.selector.length === 0) {
					this.getGradeClassList()
				}
			},

			onConfirm(event) {
				const {
					picker,
					value,
					index
				} = event.detail;
				this.gradeClass = value
				this.onClose()
			},

			onClose() {
				this.show = false
			},
			async getGradeClassList() {
				try {
					const {
						result
					} = await uniCloud.callFunction({
						name: 'getGradeClassList'
					})
					this.selector = result
				} catch (e) {
					uni.showModal({
						content: `查询失败，错误信息为：${e.message}`,
						showCancel: false
					})
				} finally {
					this.pickerLoading = false
				}
			},

			async getScore() {
				try {
					const {
						gradeClass,
						name,
						studentNumber
					} = this
					uni.showLoading({
						title: '查询中...'
					})
					const {
						result
					} = await uniCloud.callFunction({
						name: 'getScore',
						data: {
							gradeClass,
							name,
							studentNumber
						}
					})
					uni.hideLoading()
					if (result.data.length > 0) {
						uni.showModal({
							content: `查询成功，成绩为 ${result.data[0].score} 分`,
							showCancel: false
						})
					} else {
						uni.showModal({
							content: `该班级查无此人，请确认正确的班级、姓名及学号！`,
							showCancel: false
						})
					}
				} catch (e) {
					uni.hideLoading()
					uni.showModal({
						content: `查询失败，错误信息为：${e.message}`,
						showCancel: false
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.title {
		text-align: center;
		font-size: 56rpx;
		padding: 32rpx;

		:first-child {
			font-weight: blod;
		}
	}

	.cell-list {
		width: 600rpx;
		margin: 32rpx auto;

		.slot-icon {
			width: 50rpx;
			height: 50rpx;
		}

		.u-cell .u-cell__value {
			color: #333333 !important;
		}
	}

	.btn-box {
		padding: 48rpx 100rpx 32rpx;
	}
</style>
