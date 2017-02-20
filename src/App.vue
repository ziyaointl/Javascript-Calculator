<template>
    <div id="app">
        <section class="hero is-fullheight is-primary is-bold">
            <div class="hero-head">
                <div class="container">
                    <h1 class="title">Javascript Calculator</h1>
                </div>
            </div>
            <div class="container hero-body has-text-centered">
                <div class="main box">
                    <div class="columns">
                        <div class="column has-text-right">
                            <h1 class="title" id="output">{{ output }}</h1>
                        </div>
                    </div>
                    <div class="columns">
                        <div class="column">
                            <a @click="pressedNum(1)" class="button is-primary is-outlined is-large">1</a>
                            <a @click="pressedNum(2)" class="button is-primary is-outlined is-large">2</a>
                            <a @click="pressedNum(3)" class="button is-primary is-outlined is-large">3</a>
                            <a @click="pressedAdd" class="button is-primary is-outlined is-large">+</a>
                        </div>
                    </div>
                    <div class="columns">
                        <div class="column">
                            <a @click="pressedNum(4)" class="button is-primary is-outlined is-large">4</a>
                            <a @click="pressedNum(5)" class="button is-primary is-outlined is-large">5</a>
                            <a @click="pressedNum(6)" class="button is-primary is-outlined is-large">6</a>
                            <a @click="pressedMinus" class="button is-primary is-outlined is-large">-</a>
                        </div>
                    </div>
                    <div class="columns">
                        <div class="column">
                            <a @click="pressedNum(7)" class="button is-primary is-outlined is-large">7</a>
                            <a @click="pressedNum(8)" class="button is-primary is-outlined is-large">8</a>
                            <a @click="pressedNum(9)" class="button is-primary is-outlined is-large">9</a>
                            <a @click="pressedMultiply" class="button is-primary is-outlined is-large">*</a>
                        </div>
                    </div>
                    <div class="columns">
                        <div class="column">
                            <a @click="pressedClear" class="button is-primary is-outlined is-large">C</a>
                            <a @click="pressedNum(0)" class="button is-primary is-outlined is-large">0</a>
                            <a @click="pressedEqual" class="button is-primary is-outlined is-large">=</a>
                            <a @click="pressedDivide" class="button is-primary is-outlined is-large">/</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    export default {
        name: 'app',
        data () {
            return {
                storage: math.fraction(0, 1),
                outputFraction: math.fraction(0, 1),
                key: math.fraction(0, 1),
                currentOperation: "add",
                operationPressed: false,
                equalHasBeenPressed: false
            }
        },
        computed: {
            //The output displayed on the UI
            output () {
                //If the value stored is error, display it without further computation.
                if (this.outputFraction === "error") {
                    return this.outputFraction;
                }
                //If the value is 0 in decimal, which mostly occurs after multiple divisions, display integer 0.
                else if ('' + math.number(this.outputFraction).toFixed(11) === "0.00000000000") {
                    return 0;
                }
                //If the number is too long, round it down to 13 digits.
                else if (this.getLength(math.number(this.outputFraction)) > 13) {
                    if (math.number(this.outputFraction) < 1) {
                        return math.number(this.outputFraction).toFixed(11);
                    }
                    else {
                        return math.number(this.outputFraction).toPrecision(12);
                    }
                }
                //If the number does not fit in any case above, display it without manipulation (other than converting it from fraction to decimal.
                else {
                    return math.number(this.outputFraction);
                }
            }
        },
        methods: {
            //Returns the number of digits of a number.
            getLength(num) {
                return num.toString().length;
            },
            pressedNum(num) {
                //If an operation (+. -, * or /) has just been pressed
                if (this.operationPressed) {
                    this.storage = this.outputFraction; //Store the previously displayed number into storage
                    this.key = math.fraction(num, 1); //Store the value of the key pressed
                    this.outputFraction = math.fraction(num, 1); //Display the value of the key pressed
                    this.operationPressed = false; //Set operationPressed back to false, in case the user accidentally presses the button multiple times.
                    this.equalHasBeenPressed = false; //Set equalHasBeenPressed to false
                }

                //If an operation has not been pressed
                else {
                    //If equal has been pressed, but no further operation is given
                    if (this.equalHasBeenPressed === true) {
                        this.pressedClear(); //Reset the calculator
                    }
                    //If the number of digits in display does not exceed 12
                    if (this.getLength(math.number(this.outputFraction)) <= 12) {
                        this.outputFraction = math.multiply(this.outputFraction, math.fraction(10, 1)); //outputFraction *= 10
                        this.outputFraction = math.add(this.outputFraction, math.fraction(num, 1)); //outputFraction += the value of the key pressed
                        this.key = this.outputFraction; //Store the value of the key pressed
                    }
                }
            },
            pressedAdd() {
                //If the user did not click equal when add is pressed
                if (this.equalHasBeenPressed === false) {
                    this.pressedEqual(); //Evaluate the previous operation before proceeding
                }
                this.operationPressed = true;
                this.currentOperation = "add";
            },
            pressedMinus() {
                if (this.equalHasBeenPressed === false) {
                    this.pressedEqual();
                }
                this.operationPressed = true;
                this.currentOperation = "minus";
            },
            pressedMultiply() {
                if (this.equalHasBeenPressed === false) {
                    this.pressedEqual();
                }
                this.operationPressed = true;
                this.currentOperation = "multiply";
            },
            pressedDivide() {
                if (this.equalHasBeenPressed === false) {
                    this.pressedEqual();
                }
                this.operationPressed = true;
                this.currentOperation = "divide";
            },
            pressedEqual() {
                //If an error is being displayed, do nothing
                if (this.outputFraction === "error") {
                    return;
                }
                //If the current operation is add, check whether the result exceeds 13 digits.
                //If it doesn't, store the result in storage. If it does, display error.
                if (this.currentOperation === "add") {
                    if (this.getLength(math.number(math.add(this.storage, this.key))) <= 13) {
                        this.storage = math.add(this.storage, this.key);
                    }
                    else {
                        this.storage = "error";
                    }
                }
                //If the current operation is minus, check whether the result exceeds 13 digits.
                //If it doesn't, store the result in storage. If it does, display error.
                if (this.currentOperation === "minus") {
                    if (this.getLength(math.number(math.subtract(this.storage, this.key))) <= 13) {
                        this.storage = math.subtract(this.storage, this.key);
                    }
                    else {
                        this.storage = "error";
                    }
                }
                //If the current operation is multiply, check whether the result exceeds 13 digits.
                //If it doesn't, store the result in storage. If it does, display error.
                if (this.currentOperation === "multiply") {
                    if (this.getLength(math.number(math.multiply(this.storage, this.key))) <= 13) {
                        this.storage = math.multiply(this.storage, this.key);
                    }
                    else {
                        this.storage = "error";
                    }
                }
                //If the current operation is divide, store the result in storage.
                //Since this calculator only allows division by integer values, the absolute value of the result is always less than or equal to the previous value. Therefore, no check is needed.
                if (this.currentOperation === "divide") {
                    this.storage = math.divide(this.storage, this.key);
                }
                this.outputFraction = this.storage; //Display the result by storing it into outputFraction
                this.equalHasBeenPressed = true;
                this.operationPressed = false;
            },
            pressedClear() {
                this.storage = math.fraction(0, 1);
                this.outputFraction = math.fraction(0, 1);
                this.key = math.fraction(0, 1);
                this.currentOperation = "add";
                this.equalHasBeenPressed = false;
            }
        },
        created() {
            let vm = this;
            Event.$on('pressedNum', function (input) {
                vm.pressedNum(input);
            });
            Event.$on('pressedClear', vm.pressedClear);
            Event.$on('pressedEqual', vm.pressedEqual);
            Event.$on('pressedAdd', vm.pressedAdd);
            Event.$on('pressedDivide', vm.pressedDivide);
            Event.$on('pressedMinus', vm.pressedMinus);
            Event.$on('pressedMultiply', vm.pressedMultiply);
        }
    }
</script>

<style lang="scss">
    @import "css/bulma/utilities/_all.sass";
    @import "css/bulma/base/_all.sass";
    @import "css/bulma/elements/_all.sass";
    @import "css/bulma/grid/_all.sass";
    @import "css/bulma/layout/_all.sass";
    @import url('https://fonts.googleapis.com/css?family=Droid+Sans+Mono');

    html {
        -ms-touch-action: manipulation;
        touch-action: manipulation;
    }

    html, body {
        margin: 0;
        height: 100%;
        overflow: hidden
    }

    .hero-head {
        margin-top: 20px;
        margin-left: 20px;
    }

    .button {
        width: 50px;
    }

    .main {
        margin: auto;
        width: 254px;
    }

    #output {
        font-family: 'Droid Sans Mono', monospace;
        color: #363636;
    }
</style>
