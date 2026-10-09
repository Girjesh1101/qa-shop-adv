const allSize: string[] = ['S', 'M', 'L'];
const s = Math.floor(Math.random() *  allSize.length);
console.log(s);
console.log(allSize[s]);

export type PaymentMethod = "Credit/Debit Card" | "Bank Transfer" | "Cash on Delivery"

function selectPayment(payment: PaymentMethod){

    switch(payment){

        case 'Credit/Debit Card':
            console.log('Debit Credit Card');
            break;
        
        case 'Cash on Delivery':
            console.log('Cash on Delivery');
            break;

        case 'Bank Transfer':
            console.log('Bank Transfer');
            break;
    }
}

selectPayment("Bank Transfer");