/**
 * 日期操作
 * @namespace dates
 * @see module:utils
 */
/**
 * DOM操作
 * @namespace dom
 * @see module:utils
 */
/**
 * 字符串操作
 * @namespace strings
 * @see module:utils
 */
/**
 * 路径操作
 * @namespace paths
 * @see module:utils
 */
/**
 * 一些常用公共方法
 * @module utils
 * @see dates 
 * @see dom 
 * @see strings 
 * @see paths 
 */ 

 import _ from 'lodash'
 import {Promise,extend} from './core'
 import {noop} from 'jquery'
     
        /**
         *  获取一年所有月份的天数
         * @param {date} year
         * @returns {array} 
         * @memberOf dates
         */
        function getYearMonthDays(year) {
            return [31, leapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        }
        /**
         *  获取月份天数
         * @param {date} date
         * @returns {number} 
         * @memberOf dates
         */
        function getMonthLastDay(date) {
            var days = getYearMonthDays(date.getFullYear());
            return days[date.getMonth()];
        }
        /**
         * 是否小于当前年份
         * @param {date} date
         * @returns {date} 
         * @memberOf dates
         */
        function isLtNowYear(date) {
            var nowYear = new Date(), year = nowYear.getFullYear();
            return date.getFullYear() < year;
        }
        /**
         * 当前日期时间
         * @returns {date} 
         * @memberOf dates
         */
        function nowDate() {
            return new Date();
        }
        /**
         * 获取从年初截止当前第几天
         * @param {type} d
         * @returns {type} 
         * @memberOf dates
         */
        function getTotalDay(d) {
            var d = nowDate(), m = d.getMonth(), t = d.getDate();
            return _.sum(getYearMonthDays().slice(0, m).concat(t));
        }
        /**
         * 获取年份总天数
         * @param {number} year
         * @returns {date} 
         * @memberOf dates
         */
        function getYearTotalDay(year) {
            return leapYear(year) ? 366 : 365;
        }
        /**
         * 判断是否闰年
         * @param {(number|date)} year 
         * @returns {boolean} true闰年false不是
         * @memberOf dates
         */
        function leapYear(year) {
            year = year || (new Date()).getFullYear();
            return year % 100 != 0 && year % 4 == 0 || year % 400 == 0;
        }
        /**
         * 获取从开始到截止范围一个日期数组
         * @param {(date|string)} begin 开始日期
         * @param {(date|string)} end 截止日期 
         * @param {string} format  字符格式化类型
         * @returns {array}
         * @memberOf dates
         */
        function getDateRange(begin, end, strformat) {
            var dates = [], i = 0, t = differDay(begin, end);
            for (; i <= t; i++) {
                dates.push(format(dateAdd(begin, i), strformat));
            }
            return dates;
        }
        /**
         * 比较日期
         * @param {(date|string)} date 当前日期
         * @param {(date|string)} target 目标日期
         * @returns {number}  返回1：date大于target ，-1:date小于<target ，0:date等于target 
         * @memberOf dates
         */
        function compare(date, target) {
            return compareWhole(format(date), format(target));
        }
        /**
         * 比较日期日间
         * @param {(date|string)} date 当前日期
         * @param {(date|string)} target 目标日期
         * @returns {number}  返回1：date大于target ，-1:date小于<target ，0:date等于target 
         * @memberOf dates
         */
        function compareWhole(date, target) {
            var c = getTime(date),
                t = getTime(target);
            return c > t ? 1 : c < t ? -1 : 0;
        }
        /**
         * 获取日期时间戳
         * @param {(string|date)} date 
         * @return {number}
         * @memberOf dates
         */
        function getTime(date) {
            return parse(date).getTime();
        }
        /**
         * 比较日期之间的相差天数
         * @param {(string|date)} begin 开始时间
         * @param {(string|date)} end 结束时间
         * @param {boolean} [compareDat=true] true计算日期,false计算时间 
         * @returns {number}
         * @memberOf dates
         */
        function differDay(begin, end,isFormat=true) {
            begin = parse(isFormat?format(begin):begin);
            end = parse(isFormat?format(end):end);
            var bTime = begin.getTime(), eTime = end.getTime(), t = Math.abs((eTime - bTime)) / (24 * 3600 * 1000);
            return Math.floor(t);
        }
         /**
         * 比较日期之间的相差月数
         * @param {(string|date)} begin 开始时间
         * @param {(string|date)} end 结束时间
         * @returns {number}
         * @memberOf dates
         */
        function differMonth(begin, end) {
            begin = parse(format(begin));
            end = parse(format(end));
            var m = end.getMonth() + 1, m2 = begin.getMonth() + 1, y = end.getFullYear(), y2 = begin.getFullYear(), y3 = y - y2;
            return Math.abs(y3 * 12 + (m - m2));
        }
        /**
         * 比较开始时间是否小于结束时间
         * @param {number} month 月数，开始时间增量值
         * @param {(string|date)} begin 开始时间 
         * @param {(string|date)} end 结束时间
         * @returns {boolean} 返回begin+month<end
         * @memberOf dates
         */
        function gtDifferMonth(month, begin, end) {
            begin = parse(format(begin));
            end = parse(format(end));
            begin.setMonth(begin.getMonth() + month);
            return begin.getTime() < end.getTime();
        }
        /**
         * 获取月份第一天和最后一天
         * @param {(string|date)} value 日期
         * @returns {array} [start,last]
         * @memberOf dates
         */
        function getMonthStartAndEndDate(value) {
            var start = parse(value);
            var end = parse(value);
            start.setDate(1);
            end.setMonth(end.getMonth() + 1);
            end.setDate(0);
            return [start, end];
        }
          /**
         * 获取上个月份第一天和最后一天
         * @param {(string|date)} value 日期
         * @returns {array} [start,last]
         * @memberOf dates
         */
        function getPrevMonthStartAndEndDate(value) {
            value = value || nowDate();
            return getMonthStartAndEndDate(dateAdd(value, -1, 'M'));
        }
        function addWeek(date, value) {
            return dateAdd(date, value * 7);
        }


        /**
         * 增加时期时间
         * @param {(string|date)} date 日期时间 
         * @param {number} value 
         * @param {string} type y:年,M:月,d:天,h:时,m:分,s:秒
         * @returns {date} 
         * @memberOf dates
         */
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
        /**
         * 日期转换
         * @param {(string|date)} date 是字符串就转换成date,是date类型就克隆
         * @returns {date}
         * @memberOf dates
         */
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
        /**
         * 日期格式化
         * @param {(string|date)} date 
         * @param {string} format 格式化格式:yyyy-MM-dd 
         * @returns {string}
         * @memberOf dates
         */
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
        /**
         * 获取日期是星期几
         * @param {(string|date)} date 
         * @returns {number}
         * @memberOf dates
         */
        function getWeek(date) {
            date = parse(date);
            return date.getDay();
        }
        /**
         * 获取日期中文星期几
         * @param {(string|date)} date 
         * @param {string}
         * @memberOf dates
         */
        function getWeekChinese(date) {
            return WEEKSTRS[getWeek(date)];
        }
          /**
         * 格式化日期星
         * @param {(string|date)} date  
         * @param {string} format 格式式类型
         * @returns {string} 例如：2011-07-03(一)
         * @memberOf dates
         */
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
        /**
         * 获取日期对应是第几周
         * @param {(string|date)} date 
         * @returns {number}
         * @memberOf dates
         */
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
        /**
         * 获取日期月份第一天是第几周
         * @param {(string|date)} date 
         * @returns {number}
         * @memberOf dates
         */
        function getMonthFirstWeek(date) {
            var current = parse(date);
            current.setDate(1);
            return getWeek(current);
        }


        export const dates ={
            getMonthFirstWeek: getMonthFirstWeek, 
            getDateWeek: getDateWeek, 
            getMonthLastDay: getMonthLastDay, 
            getYearMonthDays: getYearMonthDays, 
            isLtNowYear: isLtNowYear,
            nowDate: nowDate, 
            getTotalDay: getTotalDay, 
            getYearTotalDay: getYearTotalDay,
            leapYear: leapYear, 
            getDateRange: getDateRange,
            compare: compare, 
            compareWhole: compareWhole,
            getTime: getTime, 
            differDay: differDay,
            differMonth: differMonth,
            gtDifferMonth: gtDifferMonth,
            getMonthStartAndEndDate: getMonthStartAndEndDate,
            getPrevMonthStartAndEndDate: getPrevMonthStartAndEndDate,
            addWeek: addWeek,
            dateAdd: dateAdd,
            parse: parse, 
            format: format, 
            getWeekChinese: getWeekChinese, 
            getWeek: getWeek,
            formatWeek: formatWeek
        };

   /**
    * 加载图像
    * @param {string} src 图片路径
    * @returns {promise}
    * @memberOf dom
    */
   function loadImage(src) {
            var img = new Image(), imgDeferred = $.Deferred();
            img.onload = imgDeferred.resolve;
            img.onerror = img.onabort = imgDeferred.reject;
            img.src = src;
            return imgDeferred;
        }
    
/**
 * @typedef {object} windowSize
 * @property {number} width 宽
 * @property {number} height 高
*/


export const dom={
    loadImage,
    /**
     * 返回元素的大小及其相对于视口的位置
     * @param {element} element  元素
     * @returns {DOMRect}
     * @memberOf dom
     */
    getBoundingClientRect(element)
    {
         return element.getBoundingClientRect();
    },
    /** 
     * 判断页面是否钳套页面
     * @returns {boolean} 
     * @memberOf dom
    */
    isSelf()
    {
        return window.top===window.self;
    },
      /** 
     * 获取窗口大小
     * @returns {windowSize} 窗口大小
     * @memberOf dom
    */
    windowSize(top=false)
    {
        var {innerWidth:width,innerHeight:height}=top?window.top:window.self;
        return {width,height}
    }
}
export const utils={
        /**
     * 获取图像文件原始宽高
     * @param {file} file  
     * @returns {Promise}
     */
    getImageFileSize(file)
    {
        return Promise(({resolve,reject})=>{
            let img=new Image();
            img.onload=function(){
                resolve({
                    width:img.naturalWidth||img.width,
                    height:img.naturalHeight ||img.height,
                    size:file.size
                });
                window.URL.revokeObjectURL(img.src);
            }
            img.onerror=img.onabort=function(){
                reject();
            }
            if(window.URL)
            {
            img.src=window.URL.createObjectURL(file);
            }else{
                reject();
            }

        })       
    },
    /**
     * 
     * @param {*} file  文件
     * @param {*} options 
     */
    checkImageFile(file,options)
    {
        options=extend({
            limitExtensions:[],
            limitSize:-1,
            maxWidth:-1,
            maxHeight:-1,
            minWidth:-1,
            minHeight:-1,
            onLimitExtendsion:noop,
            onLimitSize:noop,
            onLimit:noop
        },options);
        var {limitExtensions,limitSize,maxWidth,maxHeight,minWidth,minHeight,onLimitExtendsion,onLimitSize,onLimit}=options;
        return Promise(function({resolve,reject}){        
            if (limitExtensions.length>0&&limitExtensions.indexOf(file.type) == -1) {
                reject(file);
                onLimitExtendsion(file);
                return false;
            }
            if (limitSize!=-1&&file.size > limitSize) {
                reject(file);
                onLimitSize(file);
                return false;
            }
            utils.getImageFileSize(file).then((img)=>{
                var {width:w,height:h}=img;
                if (maxWidth!=-1&&w>maxWidth||minWidth!=-1&&w<minWidth||maxHeight!=-1&&h>maxHeight||minHeight!=-1&&h<minHeight) {
                    reject(file);
                    onLimit(img,file);
                    return;
                }
                resolve(img);
            },function(){
                reject(file);
            })
        })
    }
}

export const  strings = {
            /**
             * 返回格式化字符
             * @param {string} str 格式化文本
             * @param {(...string|...number)} [data] 格式值
             * @returns {string}
             * @memberOf strings
             * @example
             * var str=format('1*2={0}',3)
             */
            format (str,...data) {
                return str.replace(/\{(\d+)\}/g, function (s, i) {
                    return data[i];
                });
            }
};

export const paths = {
            /** 
             * 连接路径
             * @returns {string}
             * @memberOf paths
            */
            join () {
                var paths = _.slice(arguments, 0).map(function (d, index) {
                    if (index == 0) {
                        return d.replace(/[\\/]$/, '');
                    }
                    return d.replace(/[\\/]/g, '');
                });
                return paths.join('/');
            }
  };