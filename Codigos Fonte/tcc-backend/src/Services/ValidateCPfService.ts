export default class validateCPF{
    public execute(cpf: string) : Boolean{
        if(cpf === "" || cpf === null){
            return false
        }
    
        const filteredData: string = cpf.replace(/[^a-zA-Z0-9 ]/g, "")
    
        if(filteredData.length > 11){
            return false
        }
    
        let isEqual: boolean = true;
    
        for(let char: number = 0; char < filteredData.length - 1; char++){
            if(filteredData[char] !== filteredData[char + 1])
                isEqual = false
        }
    
        if(isEqual){
            return false
        }
    
        let cpfAmount: number = 0
        let auxCpfMulti: number = 10
    
        for(let char: number = 0; char < filteredData.length - 2; char++){
            cpfAmount += (Number(filteredData[char]) * auxCpfMulti)
            auxCpfMulti-- 
        }
    
        let firstDigit = ((cpfAmount*10)%11).toString().split('').pop()
    
        if(firstDigit !== filteredData[9]){
            return false
        }
    
        cpfAmount = 0
        auxCpfMulti = 11
    
        for(let char: number = 0; char < filteredData.length - 1; char++){
            cpfAmount += (Number(filteredData[char]) * auxCpfMulti)
            auxCpfMulti-- 
        }
    
        let secondDigit = ((cpfAmount*10)%11).toString().split('').pop()
    
        if(secondDigit !== filteredData[10]){
            return false
        }
    
        return true
    }
}