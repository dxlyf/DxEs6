 import _ from 'lodash'

 /**
         *  获取一年所有月份的天数
         * @param {date} year
         * @returns {array} 
         */
        function getYearMonthDays(year) {
            return [31, leapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        }
        /**
         *  获取月份天数
         * @param {date} date
         * @returns {number} 
         */
        function getMonthLastDay(date) {
            var days = getYearMonthDays(date.getFullYear());
            return days[date.getMonth()];
        }
        /**
         * 是否小于当前年份
         * @param {type} date
         * @returns {date} 
         */
        function isLtNowYear(date) {
            var nowYear = new Date(), year = nowYear.getFullYear();
            return date.getFullYear() < year;
        }
        /**
         * 当前日期时间
         * @returns {date} 
         */
        function nowDate() {
            return new Date();
        }
        /**
         * 获取从年初截止当前第几天
         * @param {type} d
         * @returns {type} 
         */
        function getTotalDay(d) {
            var d = nowDate(), m = d.getMonth(), t = d.getDate();
            return _.sum(getYearMonthDays().slice(0, m).concat(t));
        }
        /**
         * 获取年份总天数
         * @param {number} year
         * @returns {date} 
         */
        function getYearTotalDay(year) {
            return leapYear(year) ? 366 : 365;
        }
        function leapYear(year) {
            year = year || (new Date()).getFullYear();
            return year % 100 != 0 && year % 4 == 0 || year % 400 == 0;
        }
        function getDateRange(begin, end, strformat) {
            var dates = [], i = 0, t = differDay(begin, end);
            for (; i <= t; i++) {
                dates.push(format(dateAdd(begin, i), strformat));
            }
            return dates;
        }
        function compare(date, target) {
            return compareWhole(format(date), format(target));
        }
        function compareWhole(date, target) {
            var c = getTime(date),
                t = getTime(target);
            return c > t ? 1 : c < t ? -1 : 0;
        }
        function getTime(date) {
            return parse(date).getTime();
        }
        function differDay(begin, end) {
            begin = parse(format(begin));
            end = parse(format(end));
            var bTime = begin.getTime(), eTime = end.getTime(), t = Math.abs((eTime - bTime)) / (24 * 3600 * 1000);
            return t;
        }
        function differMonth(begin, end) {
            begin = parse(format(begin));
            end = parse(format(end));
            var m = end.getMonth() + 1, m2 = begin.getMonth() + 1, y = end.getFullYear(), y2 = begin.getFullYear(), y3 = y - y2;
            return Math.abs(y3 * 12 + (m - m2));
        }
        function gtDifferMonth(month, begin, end) {
            begin = parse(format(begin));
            end = parse(format(end));
            begin.setMonth(begin.getMonth() + month);
            return begin.getTime() < end.getTime();
        }
        function getMonthStartAndEndDate(value) {
            var start = parse(value);
            var end = parse(value);
            start.setDate(1);
            end.setMonth(end.getMonth() + 1);
            end.setDate(0);
            return [start, end];
        }
        function getPrevMonthStartAndEndDate(value) {
            value = value || nowDate();
            return getMonthStartAndEndDate(dateAdd(value, -1, 'M'));
        }
        function addWeek(date, value) {
            return dateAdd(date, value * 7);
        }
        function dateAdd(date, value, type) {
            type = type || 'd';
            var cloneDate = parse(date);
            if (type == 'd') {
                cloneDate.setDate(cloneDate.getDate() + value);
            } else if (type == 'M') {
                var orgDate = cloneDate.getDate();
                cloneDate.setMonth(cloneDate.getMonth() + value);
                if (orgDate != cloneDate.getDate()) {
                    cloneDate.setDate(0);
                }
            } else if (type == 'y') {
                cloneDate.setFullYear(cloneDate.getFullYear() + value);
            } else if (type == 'h') {
                cloneDate.setHours(cloneDate.getHours() + value);
            } else if (type == 'm') {
                cloneDate.setMinutes(cloneDate.getMinutes() + value);
            } else if (type == 's') {
                cloneDate.setSeconds(cloneDate.getSeconds() + value);
            }
            return cloneDate;
        }
        function parse(date) {
            try {
                var result, str, len;
                if (_.isDate(date)) {
                    result = new Date(date.getTime());
                } else {
                    str = date.split(/[^\d]/g);
                    len = str.length;
                    switch (len) {
                        case 1:
                            result = new Date(parseInt(str[0]));
                            break;
                        case 2:
                            result = new Date(parseInt(str[0]), parseInt(str[1]) - 1);
                            break;
                        case 3:
                            result = new Date(parseInt(str[0]), parseInt(str[1]) - 1, parseInt(str[2]));
                            break;
                        case 4:
                            result = new Date(parseInt(str[0]), parseInt(str[1]) - 1, parseInt(str[2]), parseInt(str[3]));
                            break;
                        case 5:
                            result = new Date(parseInt(str[0]), parseInt(str[1]) - 1, parseInt(str[2]), parseInt(str[3]), parseInt(str[4]));
                            break;
                        case 6:
                            result = new Date(parseInt(str[0]), parseInt(str[1]) - 1, parseInt(str[2]), parseInt(str[3]), parseInt(str[4]), parseInt(str[5]));
                            break;
                    }
                }
                if (!result) {
                    throw 'parse date error';
                }
                return result;
            } catch (e) {
                throw 'parse date error';
            }
        }
        function format(date, format) {
            var dates, result;
            if (!_.isDate(date)) {
                date = parse(date)
            }
            dates = {
                'y': String(date.getFullYear()),
                'M': date.getMonth() + 1,
                'd': date.getDate(),
                'h': date.getHours(),
                'm': date.getMinutes(),
                's': date.getSeconds()
            };
            format = format || "yyyy-MM-dd";
            result = format.replace(/y{1,4}/g, function (str) {
                return dates.y.substr(-str.length);
            }).replace(/M{1,2}/g, function (str) {
                return str.length < 2 ? dates.M : _.padStart(dates.M, 2, '0');
            }).replace(/d{1,2}/g, function (str) {
                return str.length < 2 ? dates.d : _.padStart(dates.d, 2, '0');
            }).replace(/h{1,2}/ig, function (str) {
                return str.length < 2 ? dates.h : _.padStart(dates.h, 2, '0');
            }).replace(/m{1,2}/g, function (str) {
                return str.length < 2 ? dates.m : _.padStart(dates.m, 2, '0');
            }).replace(/s{1,2}/g, function (str) {
                return str.length < 2 ? dates.s : _.padStart(dates.s, 2, '0');
            });

            return result;
        }
        var WEEKSTRS = ['日', '一', '二', '三', '四', '五', '六'];
        function getWeek(date) {
            date = parse(date);
            return date.getDay();
        }
        function getWeekChinese(date) {
            return WEEKSTRS[getWeek(date)];
        }
        function formatWeek(date, dformat) {
            var week = getWeekChinese(date);
            var strDate = format(date, dformat);
            return strDate + '(' + week + ')';
        }
        function startOfWeek(dirtyDate) {
            var weekStartsAt = 1
            var date = new Date(dirtyDate.getTime());
            var day = date.getDay();
            var diff = (day < weekStartsAt ? 7 : 0) + day - weekStartsAt;
            date.setDate(date.getDate() - diff);
            date.setHours(0, 0, 0, 0);
            return date;
        };
        // 获取当前周
        function getDateWeek(date) {
            date = new Date(date.getTime());
            date.setHours(0, 0, 0, 0);
            var end;
            var year = date.getFullYear();
            var time = date.getTime();
            var next = startOfWeek(new Date(year + 1, 0, 4));
            var current = startOfWeek(new Date(year, 0, 4));
            if (time >= next.getTime()) {
                year += 1;
            } else if (time < current.getTime()) {
                year -= 1;
            }
            end = startOfWeek(new Date(year, 0, 4));
            return Math.floor((time - end.getTime()) / (3600000 * 24 * 7)) + 1;
        }
        function getMonthFirstWeek(date) {
            var current = parse(date);
            current.setDate(1);
            return getWeek(current);
        }
        export default {
            getMonthFirstWeek: getMonthFirstWeek, // 获取月份第一天是周几
            getDateWeek: getDateWeek, // 获取当前第几周
            getMonthLastDay: getMonthLastDay, // 获取月份最后一天
            getYearMonthDays: getYearMonthDays, // 根据年份获取所有月份天数
            isLtNowYear: isLtNowYear,// 是否小于当前年份
            nowDate: nowDate, // 获取当前日期
            getTotalDay: getTotalDay, // 获取截止当前天数 
            getYearTotalDay: getYearTotalDay,//  啊其他的取年份总天数
            leapYear: leapYear, // 是否闰年
            getDateRange: getDateRange,// 返回一个日期范围的数组
            compare: compare, // 日期比较
            compareWhole: compareWhole,// 时间比较 
            getTime: getTime,  // 获取时间戳
            differDay: differDay,// 获取时期范围的相差天数
            differMonth: differMonth,// 获取时期范围的相差月数
            gtDifferMonth: gtDifferMonth,//根据月份差判断日期是否大于目标日期
            getMonthStartAndEndDate: getMonthStartAndEndDate,
            getPrevMonthStartAndEndDate: getPrevMonthStartAndEndDate,
            addWeek: addWeek,// 设置星期
            dateAdd: dateAdd,// 设置日期(date,value,dateType)  dateType {string} d,M,y  @列子,加一天 mjb.dates.dateAdd(new Date(),+1,'d')
            parse: parse, // 日期字符串转换date 对象
            format: format, // 日期对象字符串格式化
            getWeekChinese: getWeekChinese, // 星期阿拉伯数字转换为中文
            getWeek: getWeek,// 根据日获取对应周几
            formatWeek: formatWeek
        };

   function loadImage(src) {
            var img = new Image(), imgDeferred = $.Deferred();
            img.onload = imgDeferred.resolve;
            img.onerror = img.onabort = imgDeferred.reject;
            img.src = src;
            return imgDeferred;
        }
    
 
export const dom={loadImage}
export const  strings = {
            format: function (str) {
                var arr_params = _.slice(arguments, 1);
                return str.replace(/\{(\d+)\}/g, function (s, i) {
                    return arr_params[i];
                });
            }
};
export const paths = {
            join: function () {
                var paths = _.slice(arguments, 0).map(function (d, index) {
                    if (index == 0) {
                        return d.replace(/[\\/]$/, '');
                    }
                    return d.replace(/[\\/]/g, '');
                });
                return paths.join('/');
            }
  };