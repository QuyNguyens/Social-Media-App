import ky from "ky";

const kyInstance = ky.create({
    parseJson : (text) => 
        JSON.parse(text, (key, value) =>{
            if(key.endsWith("At")){
                const formattedDateString = value.replace(" ", "T");
                const dateObj = new Date(formattedDateString);
                return new Date(dateObj);
            }
            return value;
        })
})

export default kyInstance;