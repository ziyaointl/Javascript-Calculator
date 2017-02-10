<template>
    <div id="app">
        <section class="hero is-fullheight is-primary is-bold">
            <div class="hero-head">
                <div class="container">
                    <h1 class="title">Javascript Calculator</h1>
                </div>
            </div>
            <div class="container hero-body has-text-centered">
                <div class="box">
                    <div class="columns">
                        <div class="column">
                            <h1 class="screen">0123</h1>
                        </div>
                    </div>
                    <div class="columns">
                        <div class="column">
                            <a href="#" class="button is-primary is-outlined is-large">1</a>
                            <a href="#" class="button is-primary is-outlined is-large">2</a>
                            <a href="#" class="button is-primary is-outlined is-large">3</a>
                            <a href="#" class="button is-primary is-outlined is-large">+</a>
                        </div>
                    </div>
                    <div class="columns">
                        <div class="column">
                            <a href="#" class="button is-primary is-outlined is-large">4</a>
                            <a href="#" class="button is-primary is-outlined is-large">5</a>
                            <a href="#" class="button is-primary is-outlined is-large">6</a>
                            <a href="#" class="button is-primary is-outlined is-large">-</a>
                        </div>
                    </div>
                    <div class="columns">
                        <div class="column">
                            <a href="#" class="button is-primary is-outlined is-large">7</a>
                            <a href="#" class="button is-primary is-outlined is-large">8</a>
                            <a href="#" class="button is-primary is-outlined is-large">9</a>
                            <a href="#" class="button is-primary is-outlined is-large">*</a>
                        </div>
                    </div>
                    <div class="columns">
                        <div class="column">
                            <a href="#" class="button is-primary is-outlined is-large">C</a>
                            <a href="#" class="button is-primary is-outlined is-large">0</a>
                            <a href="#" class="button is-primary is-outlined is-large">=</a>
                            <a href="#" class="button is-primary is-outlined is-large">/</a>
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
            return {}
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

    .screen {
        text-align: right;
    }

    .button {
        width: 50px;
    }

    .button-wide {
        width: 100px;
    }
</style>
