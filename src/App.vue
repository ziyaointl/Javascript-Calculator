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
            output () {
                if (this.outputFraction === "error") {
                    return this.outputFraction;
                }
                else if ('' + math.number(this.outputFraction).toFixed(11) === "0.00000000000") {
                    return 0;
                }
                else if (this.getLength(math.number(this.outputFraction)) > 13) {
                    return math.number(this.outputFraction).toFixed(11);
                }
                else {
                    return math.number(this.outputFraction);
                }
            }
        },
        methods: {
            getLength(num) {
                return num.toString().length;
            },
            pressedNum(num) {
                if (this.operationPressed) {
                    this.storage = this.outputFraction;
                    this.key = math.fraction(num, 1);
                    this.outputFraction = math.fraction(num, 1);
                    this.operationPressed = false;
                    this.equalHasBeenPressed = false;
                }
                else {
                    if (this.equalHasBeenPressed === true) {
                        this.pressedClear();
                        this.equalHasBeenPressed = false;
                    }
                    if (this.getLength(math.number(this.outputFraction)) <= 12) {
                        this.outputFraction = math.multiply(this.outputFraction, math.fraction(10, 1));
                        this.outputFraction = math.add(this.outputFraction, math.fraction(num, 1));
                        this.key = this.outputFraction;
                    }
                }
            },
            pressedAdd() {
                if (this.equalHasBeenPressed === false) {
                    this.pressedEqual();
                }
                else {
                    this.equalHasBeenPressed = false;
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
                if (this.outputFraction === "error") {
                    this.pressedClear();
                    return;
                }
                if (this.currentOperation === "add") {
                    if (this.getLength(math.number(math.add(this.storage, this.key))) <= 13) {
                        this.storage = math.add(this.storage, this.key);
                    }
                    else {
                        this.storage = "error";
                    }
                }
                if (this.currentOperation === "minus") {
                    if (this.getLength(math.number(math.subtract(this.storage, this.key))) <= 13) {
                        this.storage = math.subtract(this.storage, this.key);
                    }
                    else {
                        this.storage = "error";
                    }
                }
                if (this.currentOperation === "multiply") {
                    if (this.getLength(math.number(math.multiply(this.storage, this.key))) <= 13) {
                        this.storage = math.multiply(this.storage, this.key);
                    }
                    else {
                        this.storage = "error";
                    }
                }
                if (this.currentOperation === "divide") {
                    console.log (this.getLength(math.number(math.divide(this.storage, this.key))));
                    this.storage = math.divide(this.storage, this.key);
                }
                this.outputFraction = this.storage;
                this.equalHasBeenPressed = true;
                this.operationPressed = false;
            },
            pressedClear() {
                this.storage = math.fraction(0, 1);
                this.outputFraction = math.fraction(0, 1);
                this.key = math.fraction(0, 1);
                this.currentOperation = "add";
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
