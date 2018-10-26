
export class CommonRules {
    pipe = {
        formatterPercent: value => `${value} %`,
        parserPercent: value => value.replace(' %', ''),
        formatterDollar: value => `$ ${value}`,
        parserDollar: value => value.replace('$ ', ''),
        formatterRmb: value => `¥ ${value}`,
        parserRmb: value => value.replace('¥ ', ''),
    }

    regex = {
        /** 手机正则 */
        mobile: /^1[3-9]\d{9}$/
    }
    get adapter() {
        return {
            rmb: { parser: this.pipe.parserRmb, formatter: this.pipe.formatterRmb },
            password: { write: (pwd) => pwd },
            dateArrTransform: { write: (dts: Date[]) => dts.map(dt => dt.format('yyyyMMdd')).join(','), read: (dtStr: string) => Array.isArray(dtStr) ? (dtStr as Date[]).map(dt => dt.format('yyyyMMdd')) : dtStr ? dtStr.split(",") : [] },
            strToDateWrite: {
                write: (str: string) => {
                    let now = new Date();
                    let time = str.split(":");
                    now.setHours(parseInt(time[0]));
                    now.setMinutes(parseInt(time[1]));
                    return now;
                },
                read: (dt: string) => new Date(dt).format('hh点mm分')
            }
        }
    }
}

export let Rules = new CommonRules();