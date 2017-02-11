<template>
    <div id="app">
        <section class="hero is-fullheight is-primary is-bold">
            <div class="hero-head">
                <div class="container">
                    <h1 class="title">Javascript Calculator</h1>
                </div>
            </div>
            <div class="container hero-body has-text-centered main">
                <div class="box">
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
                storage: 0,
                output: 0,
                key: 0,
                currentOperation: null,
                operationPressed: false
            }
        },
        methods: {
            pressedNum(num) {
                if (this.operationPressed) {
                    this.storage = this.output;
                    this.key = num;
                    this.output = num;
                    this.operationPressed = false;
                }
                else {
                    this.output = this.output * 10 + num;
                    this.key = this.output;
                }

            },
            pressedAdd() {
                this.operationPressed = true;
                this.currentOperation = "add";
            },
            pressedMinus() {
                this.operationPressed = true;
                this.currentOperation = "minus";
            },
            pressedMultiply() {
                this.operationPressed = true;
                this.currentOperation = "multiply";
            },
            pressedDivide() {
                this.operationPressed = true;
                this.currentOperation = "divide";
            },
            pressedEqual() {
                this.operationPressed = true;
                if (this.currentOperation === "add") {
                    this.storage += this.key;
                    this.output = this.storage;
                }
                if (this.currentOperation === "minus") {
                    this.storage -= this.key;
                    this.output = this.storage;
                }
                if (this.currentOperation === "multiply") {
                    this.storage *= this.key;
                    this.output = this.storage;
                }
                if (this.currentOperation === "divide") {
                    this.storage /= this.key;
                    this.output = this.storage;
                }
            },
            pressedClear() {
                this.storage = 0;
                this.key = 0;
                this.output = 0;
                this.currentOperation = null
            }
        }
    }
</script>

<style lang="scss">
    @import "css/bulma/utilities/_all.sass";
    @import "css/bulma/base/_all.sass";
    @import "css/bulma/elements/_all.sass";
    @import "css/bulma/grid/_all.sass";
    @import "css/bulma/layout/_all.sass";

    .hero-head {
        margin-top: 20px;
        margin-left: 20px;
    }

    .button {
        width: 50px;
    }

    .main {
        margin: 0 auto;
    }

    #output {
        color: #363636;
    }
</style>
