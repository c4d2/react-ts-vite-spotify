
// 编写时间戳转换函数
export function timetampTotime(dt: number): string {
    if (dt <= 0) return '0:00';
    // 四舍五入
    const alltime = Math.floor(dt / 1000);
    const minutes = Math.floor(alltime / 60);
    const second = alltime % 60;
    return (minutes + ':' + String(second).padStart(2, '0'));
}