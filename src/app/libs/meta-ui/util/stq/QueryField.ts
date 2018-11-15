export class QueryField {
    $in?: any[];
    /** 大于 */
    $gt?: number | string | Date;
    /** 小于 */
    $lt?: number | string | Date;
    /** :  前后统配 */
    $like?: string;
    /** l: 前通配*/
    $likeStart?: string;
    /** :l 后通配*/
    $likeEnd?: string;
    /** 不等于 */
    $notEq?: string | number;

}