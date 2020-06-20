'use strict';

const uniID = require('uni-id')

exports.main = async (event, context) => {
    //event为客户端上传的参数
    console.log('event : ' + event)


    let params = event.params
    let res = {}

    let payload = {}

    switch (event.action) {
        case 'register':
            res = uniID.register(event.params, context);
            break;
        case 'login':
            res = uniID.login(event.params, context);
            break;
        case 'logout':
            payload = await uniID.checkToken(event.uniIdToken)
            console.log('index::payload:', payload);

            if (payload.code && payload.code > 0) {
                return payload
            }
            res = logout(payload.uid, context);
            break;
        case 'updatePassword':
            payload = await uniID.checkToken(event.uniIdToken)
            console.log('index::payload:', payload);

            if (payload.code && payload.code > 0) {
                return payload
            }
            params.uid = payload.uid

            res = updatePwd(params, context);
            break;
        case 'setAvatar':
            payload = await uniID.checkToken(event.uniIdToken)
            console.log('index::payload:', payload);

            if (payload.code && payload.code > 0) {
                return payload
            }
            params.uid = payload.uid

            res = uniID.setAvatar(params, context);
            break;
        case 'bindMobile':
            payload = await uniID.checkToken(event.uniIdToken)
            console.log('index::payload:', payload);

            if (payload.code && payload.code > 0) {
                return payload
            }
            params.uid = payload.uid

            res = uniID.bindMobile(params, context);
            break;
        case 'bindEmail':
            payload = await uniID.checkToken(event.uniIdToken)
            console.log('index::payload:', payload);

            if (payload.code && payload.code > 0) {
                return payload
            }
            params.uid = payload.uid

            res = uniID.bindEmail(params, context);
            break;
        default:
            res = {
                code: 403,
                msg: '非法访问'
            }
            break;
    }

    //返回数据给客户端
    return res
};
