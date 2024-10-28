import { Injectable } from '@angular/core';
import { MOOD_STATUS } from '../components/mood-form/mood-form.component';

@Injectable({
  providedIn: 'root',
})
export class Utility {
  constructor() {}

  static isToday(timestamp: number): boolean {
    const today = new Date();
    const date = new Date(timestamp);

    return (
      today.getFullYear() === date.getFullYear() &&
      today.getMonth() === date.getMonth() &&
      today.getDate() === date.getDate()
    );
  }

  static getStartOfWeek(date: Date): Date {
    const day = date.getDay(); // 0: Chủ Nhật, 1: Thứ Hai, ..., 6: Thứ Bảy
    const diff = date.getDate() - day + (day === 0 ? -6 : 1); // Lấy thứ Hai
    return new Date(date.setDate(diff));
  }

  static isThisWeek(timestamp: number): boolean {
    const today = new Date();
    const startOfWeek = Utility.getStartOfWeek(new Date()); // Thứ Hai tuần này

    const date = new Date(timestamp);
    return date >= startOfWeek && date <= today;
  }

  static isThisMonth(timestamp: number): boolean {
    const today = new Date();
    const date = new Date(timestamp);

    return (
      today.getFullYear() === date.getFullYear() &&
      today.getMonth() === date.getMonth()
    );
  }

  // get item last 7 day
  static getItemLast7Days(data: any) {
    const now = Date.now();
    const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000;
    return data.filter((item: any) => item.createdTime >= sevenDaysAgo);
  }

  static getRateAverageLast7Days(data: any) {
    const dataConvert = Utility.getItemLast7Days(data)?.map(
      (x: any) => MOOD_STATUS?.[x?.status?.key]?.value
    );
    const sum = dataConvert.reduce((acc: any, val: any) => acc + val, 0);
    return Math.ceil(sum / dataConvert.length);
  }

  // Fake data for lines on weekdays
  static generateWeeklyData(): number[] {
    const data: number[] = [];

    // Loop through 7 days of the week
    for (let i = 0; i < 7; i++) {
      // Generate a random number between 1 and 5 (inclusive)
      const value = Math.floor(Math.random() * 5) + 1;
      data.push(value);
    }

    return data;
  }

  static generateMonthlyData(): number[] {
    const data: number[] = [];

    for (let i = 0; i < Utility.getDaysInCurrentMonth(); i++) {
      const value = Math.floor(Math.random() * 5) + 1; // Giá trị ngẫu nhiên từ 1 đến 5
      data.push(value);
    }

    return data;
  }

  static getDaysInCurrentMonth(): number {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();

    const lastDayOfMonth = new Date(year, month + 1, 0);
    return lastDayOfMonth.getDate();
  }
}
