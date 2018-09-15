/**
 * Created by wjjn3481 on 2018/1/2.
 * 以下数据纯属虚构，具体跟与后端约定
 */
module.exports = {
    // 获取用户（是否）登录信息
    '/sessionObj.api': {
        status: true,
        result: {
            sysConfig: {
                token: '123456789abcdefg'
            },
            user: {
                id: 1,
                name: '吴建杰'
            }
        }
    },
    // 获取列表数据
    '/employee/employeeList.api': {
        status: true,
        desc: '获取人才列表',
        page: {
            pageIndex: 1,
            pageSize: 20,
            pageTotal: 1,
            recordCounts: 20
        },
        result: {
            EDU_DEGREE: [{
                text: '大专',
                value: '1'
            }, {
                text: '本科',
                value: '2'
            }, {
                text: '硕士',
                value: '3'
            }, {
                text: '博士',
                value: '4'
            }, {
                text: 'MBA',
                value: '5'
            }],
            list: [
                {
                    id: '1',
                    name: '吴建杰',
                    jobNumber: 'N3481',
                    idNumber: '1234567890', // 证件号码
                    positionName: '高级开发工程师',
                    mobilePhone: '15920416317',
                    email: 'demo@demo.com',
                    firstDeptName: '梦幻事业部',
                    secondDeptName: '二级部门',
                    thirdDeptName: '三级部门',
                    entryType: '社招',
                    employeeStatus: '在职',
                    managerName: '直接主管',
                    highSchool: '南方医科大学',
                    highDegree: '本科'
                }
            ]
        }
    }
}