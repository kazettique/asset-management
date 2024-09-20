export interface MExternalForex {
  amount: string;
  base_currency_code: string;
  base_currency_name: string;
  rates: Record<
    string,
    {
      currency_name: string;
      rate: string;
      rate_for_amount: string;
    }
  >;
  status: 'success' | 'fail';
  updated_date: string;
}
