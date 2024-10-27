import { Injectable } from '@angular/core';

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
}
