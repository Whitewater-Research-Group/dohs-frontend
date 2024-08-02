export default function Suma (){
    //hook defined
    const [input, setInput] = React.useState({
        num1: "",
        num2: "",
    });

    const [result, setResult] = React.useState("")

    //handle input change 

    const handleInput = function(e){
        setInput({
            ...input, 
            [e.target.name]: e.target.value
        });
    };

    //suma function

    const suma = function(){
        const { num1, num2 } = input;
        setResult(Number(num1) + Number(num2));
    }

    return (
        <div>
            <input onChange={handleInput} name="num1" value={input.num1} type="number"></input>
            <input onChange={handleInput} name="num2" value={input.num2} type="number"></input>
            <button onclick={suma}>+</button>
            <span>resultado: {result}</span>
        </div>
    )
};