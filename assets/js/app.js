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
import "phoenix_html";
// Import local files
// Local files can be imported directly using // paths "./socket" or full ones "web/static/js/socket".
// import socket from "./socket"
import axios from "axios";
import "./vue-table";

Vue.use(VueTables.client, {
  compileTemplates: true,
  chunk: 5
});
new Vue({
  el: "#product-app",
  data: {
    columns: ["nsn", "name", "part_number"],
    options: {
      headings: {
        nsn: "NSN",
        name: "Name",
        part_number: "Part Number"
      }
    },
    products: [],
    search: "",
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
  ready: function() {
    this.$on("vue-tables.row-click", function(row) {
      console.log("click row");
    });
  },
  created() {
    axios
      .get(this.url)
      .then(response => {
        console.log(response);
        this.products = response.data.data;
      })
      .catch(error => {
        console.log(error);
      });
  },
  //methods: {},
  computed: {
    filteredProducts: function() {
      return this.products.filter(product => {
        return (
          product.name.toLowerCase().match(this.search) ||
          product.nsn.toString().match(this.search) ||
          product.nsn_formatted.match(this.search)
        );
      });
    }
  }
});
