export interface Apartment {
  id: string,
  title: string,
  details: string,
  photos: string[],
  coordinates: number[],
  bookedDates: Date[],
  price: number
}

export interface SearchParams {
  city?: string
  checkInDate?: Date,
  checkOutDate?: Date,
  priceLimit?: number
}

export interface Callback<R> {
  (error?: Error, result?: R): void

}

export declare const database: Apartment;

export declare function addDays(date: Date, days: number): Date;

export declare function cloneDate(date: Date): Date;

export declare class FlatRentSdk {
  database: Apartment[];

  public  get(id: string): Promise<Callback<Apartment | null>>;

  public search(parameters: SearchParams): Promise<Callback<Apartment>>;

  public book(flatId: string, checkInDate: Date, checkOutDate: Date): Promise<Callback<number>>;

  private _assertDatesAreCorrect(checkInDate: Date, checkOutDate: Date): void;

  private _resetTime(date: Date): void;

  private _calculateDifferenceInDays(startDate: Date, endDate: Date): number;

  private _generateDateRange(from: Date, to: Date): Date[];

  private _generateTransactionId(): number;

  private _areAllDatesAvailable(flat: Apartment, dateRange: Date[]): boolean;

  private _readDatabase(): Apartment;

  private _writeDatabase(database: Apartment): void;

  private _syncDatabase(database: Apartment): void;


}
