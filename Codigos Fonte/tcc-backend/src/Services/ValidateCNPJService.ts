export default class validateCNPJ {

    private auxToValidate = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
    private auxCalToValidade: Array<number> = []

    public execute (cnpj: string): boolean {

        if(cnpj === undefined || cnpj === null){
            return false
        }

        const filteredData = cnpj.replace(/[^a-zA-Z0-9 ]/g, "").split("")

        if(filteredData.length !== 14){
            return false
        }

        const firstDigit = Number(filteredData[12])

        for(let cnpjDigit = 0; cnpjDigit < filteredData.length - 2; cnpjDigit++){
            this.auxCalToValidade.push(Number(filteredData[cnpjDigit]) * this.auxToValidate[cnpjDigit])
        }

        let SumProd = this.auxCalToValidade.reduce((prevValue, currentValue) => prevValue + currentValue)

        if(SumProd%11 < 2){
            if(firstDigit !== 0){
                return false
            }
        }else{
            if(firstDigit !== (11 - (SumProd%11))){
                return false
            }
        }

        this.auxToValidate.unshift(6)
        this.auxCalToValidade = []
        SumProd = 0

        const secondDigit = Number(filteredData[13])

        for(let cnpjDigit = 0; cnpjDigit < filteredData.length - 1; cnpjDigit++){
            this.auxCalToValidade.push(Number(filteredData[cnpjDigit]) * this.auxToValidate[cnpjDigit])
        }

        SumProd = this.auxCalToValidade.reduce((prevValue, currentValue) => prevValue + currentValue)
        console.log(SumProd)

        if(SumProd%11 < 2){
            if(secondDigit !== 0){
                return false
            }
        }else{
            if(secondDigit !== (11 - (SumProd%11))){
                return false
            }
        }

        return true
    }
}