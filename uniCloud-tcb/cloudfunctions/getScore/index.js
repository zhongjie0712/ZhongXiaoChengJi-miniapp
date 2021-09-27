'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const collection = db.collection('unicloud-student-score')
	const res = await collection.where(event).get();
	return res
};
