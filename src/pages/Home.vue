<script setup>
import AppLayout from '../components/AppLayout.vue';
import CocktailThumb from '../components/CocktailThumb.vue';
import { useRootStore } from '../stores/root';
import { storeToRefs } from 'pinia';
import { ref } from "vue";


const rootStore = useRootStore()
rootStore.getIngredients()
const { ingredients, ingredient, cocktails } = storeToRefs(rootStore)

function getCocktails() {
    rootStore.getCocktailByIngr(rootStore.ingredient)
}
function removeIngredient(){
    rootStore.setIngredient(null)
}

</script>
<template>
    <AppLayout imgUrl=".\\src\\assets\\img\\1.jpg" :backFunc = "removeIngredient" :is-back-button-visible="!!ingredient">
        <div class="wrapper">
            <div v-if="!ingredient || !cocktails" class="info">
                <div class="title">Choose your drink</div>
                <div class="line"></div>
                <div class="select-wrapper">

                    <el-select
                    v-model="rootStore.ingredient"
                    placeholder="Выбрать ингредиент"
                    size="large"
                    filterable
                    allow-create
                    class="select"
                    @change="getCocktails"

                    >
                    <el-option
                    v-for="item in ingredients"
                    :key="item.strIngredient1"
                    :label="item.strIngredient1"
                    :value="item.strIngredient1"
                    />
                    </el-select>
                </div>
                <div class="text">
                    Откажи себе в удовольствии, чтобы стало доступно другое удовольствие
                </div>
                <img src="../assets/img/cocktails.png" alt="cocktails" class="imgg">
            </div>
            <div v-else class="info">
                <div class="title">Cocktail with <span class="ingredient">{{ ingredient }}</span></div>
                <div class="line"></div>
                <div class="cocktails">
                    <CocktailThumb v-for="cocktail in cocktails" :key="cocktail.idDrink" :cocktail="cocktail"/>
                </div>
            </div>
        </div>
    </AppLayout>
</template>

<style lang="sass">
@import '../assets/styles/main'


.select-wrapper
    padding-top: 50px

.select
    width: 220px

.text
    max-width: 516px
    margin: 0 auto
    padding-top: 50px
    line-height: 36px
    letter-spacing: 0.1em
    color: $textMuted

.imgg
    height: 200px
    margin-top: 40px

.ingredient
    color: $accent

.cocktails
    display: flex
    flex-wrap: wrap
    max-height: 400px
    overflow-y: auto 
    align-items: center
    margin-top: 60px

</style>