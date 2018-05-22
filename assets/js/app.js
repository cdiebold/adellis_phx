// Brunch automatically concatenates all files in your
// watched paths. Those paths can be configured at
// config.paths.watched in "brunch-config.js".
//
// However, those files will only be executed if
// explicitly imported. The only exception are files
// in vendor, which are never wrapped in imports and
// therefore are always executed.
// Import dependencies
//
// If you no longer want to use a dependency, remember
// to also remove its path from "config.paths.watched".
import "phoenix_html"
// Import local files
// Local files can be imported directly using // paths "./socket" or full ones "web/static/js/socket".
// import socket from "./socket"
import axios from "axios";
new Vue({
    el: "#product-app",
    data: {
        products: [],
        paginate_by: [
            {
                value: 1,
                active: false
            },
            {
                value: 3,
                active: false
            },
            {
                value: 5,
                active: false
            }
        ],
        url: "http://localhost:4000/api/v1/products"
    },
    created() {
        var self = this;
        let productDataRoute = "api/v1/products";
        // try {
        //     const response = await axios.get(this.url)
        //     console.log(response);
        //     this.products = response.data;
        // } catch (e) {
        //     this.errors.push(e);
        // }
        axios.get(this.url).then(response => {
            console.log(response);
            this.products = response.data.data;
        }).catch(error => {
            console.log(error);
        })
    },
    methods: {}
});