export type PaymentMethod = "Credit/Debit Card" | "Bank Transfer" | "Cash on Delivery";

export interface CardDetails {
    cardNumber : string;
    cardName : string;
    cardExpire: string;
}