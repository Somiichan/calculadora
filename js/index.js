
let result = document.getElementById("result");

    function addToResult(value) {
    result.value += value;
    }

    function clearResult() {
    result.value = "";
    }

    function backspace() {
    result.value = result.value.slice(0, -1);
    }

    function calculate() {
    try {
        result.value = eval(result.value);
    } catch (error) {
        result.value = "Error";
    }
    }
