'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const collection = db.collection('unicloud-student-class')
	const {
		data
	} = await collection.where(event).get();
	return data.map((item) => {
		return item = item.gradeClass
	})
};
