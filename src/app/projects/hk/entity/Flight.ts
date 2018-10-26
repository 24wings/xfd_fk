import { BaseAduitEntity } from './BaseAduitEntity';

/**
 * 航司：自动从航班号带出 航班号: [出发信息] 出发机场:三字代码查询 出发时间:当地时间 [经停信息] 经停机场: 到达时间:当地时间 经停时长:分钟数
 * [到达信息] 到达机场: 到达时间:当地时间 +天数:-1 班次信息：出发日期规则
 * @author 廖为民
 * @version 1.0
 * @updated 2018-9-22 15:03:47
 */
/**航班信息*/
export class Flight extends BaseAduitEntity {
    id: number;
    /**航班代码(航司2字代码+4字航班号*/
    code: string;
    /**航班信息*/
    flightInfo: string;
    /**航司二字代码*/
    airCompanyCode: string | any;
    /**航司名称*/
    airCompanyName: string | any;
    /**出发机场三字代码*/
    startAirportCode: string;
    /**出发机场名称*/
    startAirportName: string;
    /**出发时间*/
    startTime: Date | string;
    /**经停机场三字代码*/
    stopAirportCode: string;
    /**经停机场名称*/
    stopAirportName: string;
    /**经停到达时间*/
    stopTime: Date | any;
    /**经停时长(分钟数)*/
    stopMinutes: number;
    /**到达机场三字代码*/

    endAirportCode: string;
    /**到达机场名称*/
    endAirportName: string;
    /**到达时间*/
    endTime: Date | any;
    /**到达时间加减天数*/
    plusDays: number;
    startCityCode: string;
    startCityName: string;

    stopCityCode: string;
    stopCityName: string;


}
