<template>
  <v-app>
    <v-app-bar
      app
      color="white"
    >
      <v-autocomplete
        v-model="select"
        :loading="loading"
        :items="items"
        :search-input.sync="search"
        class="mx-4"
        flat
        filled
        hide-details
        label="Enter movie name"
        solo-inverted
        clearable
        prepend-inner-icon="mdi-magnify"
      />
    </v-app-bar>

    <v-btn icon>
      <v-icon>more_vert</v-icon>
    </v-btn>

    <v-main>
      <div
        v-if="films.length"
        class="d-flex flex-wrap ma-4 v-sheet theme--light"
      >
        <v-card
          v-for="film in films"
          :key="film.imdbID"
          class="ma-2 flex-grow-1"
          link
          :href="'https://www.imdb.com/title/'+film.imdbID"
          max-width="500"
        >
          <v-img
            height="250"
            :src="film.Poster"
          />

          <v-card-title>{{ film.Title }}</v-card-title>
          <v-card-subtitle>Year: {{ film.Year }}</v-card-subtitle>
          <v-card-text>imdbID: {{ film.imdbID }}</v-card-text>
        </v-card>
      </div>
    </v-main>
  </v-app>
</template>

<script>

	import {getFilms} from "./service";
  import debounce from "lodash/debounce";

	export default {
		name: 'App',
		components: {},

		data: () => ({
			films: [],
			loading: false,
			items: [],
			search: null,
			select: null,
			//
		}),
		watch: {
			search(val) {
				val && val !== this.select && this.querySelections(val)
			},
			select() {
				if (this.select) {
					this.films = this.films.filter(({Title}) => Title.toLowerCase().trim() === this.select.toLowerCase().trim());
          this.items = this.items.filter(Title => Title.toLowerCase().trim() === this.select.toLowerCase().trim());
				}
      },
		},
		methods: {
			querySelections: debounce(function (v) {
				if (this.isLoading) return;

				this.loading = true;
        getFilms(v)
					.then(({data}) => {
						if (data.Response === 'True') {
							const {Search} = data;
							this.items = [];
              this.createFilmStructure(Search);
              this.films = Search;
						} else {
							this.films = [];
							this.items = [];
							this.createFilmStructure();
						}
					})
					.catch(() => {
						this.createFilmStructure();
						this.films = [];
					})
        .finally(() => {
					this.loading = false;
        })
			}, 150),

      createFilmStructure(films) {
				if (!films) {
					this.items = [];
          return
				}
				for (let item of films) {
					this.items.push(item.Title);
				}
      }
		},
    created() {
			getFilms()
				.then(data => {
					this.films = data;
					this.createFilmStructure(data);
				})
		}
	};
</script>
