const readline = require('readline');

function calculateTax(income){

    //defining taxslabs provided
    const taxSlabs= [
        
        {limit: 24000, rate: 0.1},
        {limit: 32333, rate:0.25},
        {limit:500000, rate: 0.3},
        {limit: 800000, rate: 0.35},

    ];

    let tax =0;
    
    let remainIncome = income;

    for (const slab of taxSlabs){
    //calculate taxable amount within the current slab    
        if(remainIncome <=0) break;
        const taxableAmount =Math.min(remainIncome, slab.limit);
         tax+= taxableAmount *slab.rate;

         remainIncome -= taxableAmount
    }

    return tax;
}
//defining NHIF rates
function calculateNHIFDeductions(grossPay){
    const nhifRates = [
        {limit:5999, deduction: 150},
        {limit:11999, deduction: 400},
        {limit:29999, deduction: 850},
        {limit:100000, deduction: 1700},

    ];
    for (const rate of nhifRates){
        if (grossPay<= rate.limit){
            return rate.deduction;
        }
    }
    
   return nhifRates[nhifRates.length - 1].deduction;

}
// defining nssf rates
function calculateNSSFContributions(pensionPay){
    
    const tierIRate = 0.06;
    const tierIILowestLimit = 7001; 
if(pensionPay <= tierIILowestLimit){
     return pensionPay * tierIRate;
} else {
     return tierIILowestLimit * tierIRate;
}
}
//caluculation of the net salary equation
function calculateNetSalary(basicSalary, benefits){
    
    const grossSalary = basicSalary + benefits;
    const tax = calculateTax(grossSalary);
    const NHIFDeductions = calculateNHIFDeductions(grossSalary);
    const NSSFDeductions = calculateNSSFContributions(basicSalary);
    //final net salary equation after 
    const netSalary = grossSalary - tax - NHIFDeductions - NSSFDeductions;

    return{
        grossSalary,
        tax,
        NHIFDeductions,
        NSSFDeductions,
        netSalary
    };
}
//function to get the user input on the terminal
function getUserInput(question){
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout

    });
 
 return new Promise((resolve) => {
    rl.question(question, (answer) =>{
        rl.close();
        resolve(parseFloat(answer));
    });
 });
}
async function run(){

    const basicSalary = await getUserInput("your basic salary = ");
    const benefits = await getUserInput("Your Benefits = ");
    const salaryDetails = calculateNetSalary(basicSalary, benefits);
    console.log("Gross = ", salaryDetails.grossSalary);
    console.log("Tax = ", salaryDetails.tax);
    console.log("NHIF Ded = ", salaryDetails.NHIFDeductions);
    console.log("NSSF Ded = ", salaryDetails.NSSFDeductions);
    console.log("Net = ", salaryDetails.netSalary);
 }

 run();
//type in the salary and the benefit and calculation will be done