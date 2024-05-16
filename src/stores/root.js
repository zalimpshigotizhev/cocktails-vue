import axios from 'axios'
import { defineStore } from 'pinia'
import { INGREDIENTS_URL, GET_COCKTAILS_BY_INGR_URL } from '../constants'
import Cocktail from '@/pages/Cocktail.vue'



export const useRootStore = defineStore('root', {
  state: () => ({
    ingredients: [],
    ingredient: null,
    cocktails: [],
    cocktail: null
  }),
  actions: {
    async getIngredients(){
      const data = await axios.get(INGREDIENTS_URL)
      this.ingredients = data?.data?.drinks
    },
    async getCocktailByIngr(ingredient){
      const data = await axios.get(`${GET_COCKTAILS_BY_INGR_URL}${ingredient}`)
      this.cocktails  = data?.data?.drinks
    },
    setIngredient(val){
      this.ingredient = val;
    }
  }
})
