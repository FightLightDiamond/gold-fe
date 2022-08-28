/**
 * Tạo ra sẵn tất cả các kèo từ trước 100 kèo
 */
export interface MatchInterface {
  id: number;
  hero_info: string;
  turns: string;
  turn_number: number;
  /**
   * PEND_STATUSING | PROCESSING | DONE
   */
  status: number;
  winner: number;
  loser: number;
  type: number;
}
