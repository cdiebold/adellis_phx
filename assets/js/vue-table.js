!(function(f) {
  if ("object" == typeof exports && "undefined" != typeof module)
    module.exports = f();
  else if ("function" == typeof define && define.amd) define([], f);
  else {
    var g;
    (g =
      "undefined" != typeof window
        ? window
        : "undefined" != typeof global
          ? global
          : "undefined" != typeof self
            ? self
            : this),
      (g.VueTables = f());
  }
})(function() {
  return (function e(t, n, r) {
    function s(o, u) {
      if (!n[o]) {
        if (!t[o]) {
          var a = "function" == typeof require && require;
          if (!u && a) return a(o, !0);
          if (i) return i(o, !0);
          var f = new Error("Cannot find module '" + o + "'");
          throw ((f.code = "MODULE_NOT_FOUND"), f);
        }
        var l = (n[o] = { exports: {} });
        t[o][0].call(
          l.exports,
          function(e) {
            var n = t[o][1][e];
            return s(n ? n : e);
          },
          l,
          l.exports,
          e,
          t,
          n,
          r
        );
      }
      return n[o].exports;
    }
    for (
      var i = "function" == typeof require && require, o = 0;
      o < r.length;
      o++
    )
      s(r[o]);
    return s;
  })(
    {
      1: [
        function(require, module, exports) {
          function displayableColumns(columns, windowWidth, display) {
            return display
              ? columns.filter(function(column) {
                  if (!display[column]) return !0;
                  var range = display[column],
                    operator = range[2],
                    inRange =
                      (!range[0] || windowWidth >= range[0]) &&
                      (!range[1] || windowWidth < range[1]);
                  return "not" == operator ? !inRange : inRange;
                })
              : columns;
          }
          module.exports = function() {
            return displayableColumns(
              this.columns.concat(this.customColumns),
              this.windowWidth,
              this.columnsDisplay
            );
          };
        },
        {}
      ],
      2: [
        function(require, module, exports) {
          module.exports = function() {
            return this.templatesKeys.diff(this.columns);
          };
        },
        {}
      ],
      3: [
        function(require, module, exports) {
          module.exports = function() {
            return JSON.stringify(this.customQueries);
          };
        },
        {}
      ],
      4: [
        function(require, module, exports) {
          module.exports = function() {
            var columns = Object.keys(this.options.listColumns),
              res = {};
            return (
              columns.forEach(
                function(column) {
                  (res[column] = {}),
                    this.options.listColumns[column].forEach(function(item) {
                      res[column][item.id] = item.text;
                    });
                }.bind(this)
              ),
              res
            );
          };
        },
        {}
      ],
      5: [
        function(require, module, exports) {
          module.exports = function() {
            return this.options.filterByColumn
              ? JSON.stringify(this.query)
              : this.query;
          };
        },
        {}
      ],
      6: [
        function(require, module, exports) {
          module.exports = function() {
            return Object.keys(this.options.templates);
          };
        },
        {}
      ],
      7: [
        function(require, module, exports) {
          module.exports = function() {
            return Math.ceil(this.count / this.limit);
          };
        },
        {}
      ],
      8: [
        function(require, module, exports) {
          module.exports = function(source) {
            return {
              dateColumns: [],
              listColumns: {},
              datepickerOptions: { locale: { cancelLabel: "Clear" } },
              perPage: 10,
              perPageValues: [10, 25, 50, 100],
              params: {},
              sortable: !0,
              trackBy: "$index",
              filterable: !0,
              filtersInitialValues: {},
              customFilters: [],
              templates: {},
              compileTemplates: !1,
              delay: 500,
              dateFormat: "DD/MM/YYYY",
              toMomentFormat: !1,
              skin: "table-striped table-bordered table-hover",
              wrapperClasses: "",
              columnsDisplay: {},
              texts: {
                count: "{count} Records",
                filter: "Filter Results:",
                filterPlaceholder: "Search query",
                limit: "Records:",
                page: "Page:",
                noResults: "No matching records",
                filterBy: "Filter by {column}",
                loading: "Loading...",
                defaultOption: "Select {column}"
              },
              sortIcon: {
                base: "glyphicon",
                up: "glyphicon-chevron-up",
                down: "glyphicon-chevron-down"
              },
              filterByColumn: !1,
              highlightMatches: !1,
              orderBy: !1,
              footerHeadings: !1,
              headings: {},
              pagination: { dropdown: !1, chunk: 10 }
            };
          };
        },
        {}
      ],
      9: [
        function(require, module, exports) {
          module.exports = function(data, filters) {
            var passing,
              filters = JSON.parse(filters);
            return data.filter(
              function(row) {
                return (
                  (passing = !0),
                  this.options.customFilters.forEach(
                    function(filter) {
                      var value = this.customQueries[filter.name];
                      value && !filter.callback(row, value) && (passing = !1);
                    }.bind(this)
                  ),
                  passing
                );
              }.bind(this)
            );
          };
        },
        {}
      ],
      10: [
        function(require, module, exports) {
          var is_valid_moment_object = require("../helpers/is-valid-moment-object");
          module.exports = function(property) {
            return is_valid_moment_object(property)
              ? property.format(this.options.dateFormat)
              : property;
          };
        },
        { "../helpers/is-valid-moment-object": 21 }
      ],
      11: [
        function(require, module, exports) {
          module.exports = function(property, column) {
            if (
              !this.options.highlightMatches ||
              this.templatesKeys.indexOf(column) > -1
            )
              return property;
            var query = this.options.filterByColumn
              ? this.query[column]
              : this.query;
            return query
              ? ((query = new RegExp(query, "i")),
                (property = String(property).replace(query, function(
                  highlight
                ) {
                  return (
                    "<b class='VueTables__highlight'>" + highlight + "</b>"
                  );
                })))
              : property;
          };
        },
        {}
      ],
      12: [
        function(require, module, exports) {
          module.exports = function(value, column) {
            return this.isListFilter(column) &&
              this.listColumnsObject[column].hasOwnProperty(value)
              ? this.listColumnsObject[column][value]
              : value;
          };
        },
        {}
      ],
      13: [
        function(require, module, exports) {
          module.exports = function(data) {
            var limit = parseInt(this.limit),
              page = parseInt(this.page),
              offset = limit * (page - 1);
            return data.slice(offset, limit + offset);
          };
        },
        {}
      ],
      14: [
        function(require, module, exports) {
          function wrapTemplate(tpl) {
            return "<span class='VueTables__template'>" + tpl + "</span>";
          }
          function getMatches(template) {
            var matches = template.match(/{.+?}/g);
            return matches
              ? matches.map(function(match) {
                  return match.slice(1, -1);
                })
              : !1;
          }
          module.exports = function(value, row, column) {
            if (-1 == this.templatesKeys.indexOf(column)) return value;
            var regex;
            if ("function" == typeof this.options.templates[column]) {
              var tpl = this.options.templates[column].bind(this.$root);
              return wrapTemplate(tpl(row));
            }
            console.warn(
              "vue-tables: using strings as templates is deprecated and will be removed in an upcoming release. Please use a function instead."
            );
            var template = wrapTemplate(this.options.templates[column]),
              matches = getMatches(this.options.templates[column]);
            return matches
              ? (matches.forEach(
                  function(match) {
                    row.hasOwnProperty(match) &&
                      ((regex = new RegExp("{" + match + "}", "g")),
                      (template = template.replace(regex, String(row[match]))));
                  }.bind(this)
                ),
                template)
              : template;
          };
        },
        {}
      ],
      15: [
        function(require, module, exports) {
          function setCurrentQuery(query) {
            return query
              ? "string" == typeof query
                ? query.toLowerCase()
                : query
              : "";
          }
          function foundMatch(query, value, isListFilter) {
            if (isListFilter) return value == query;
            if ("string" == typeof value) return value.indexOf(query) > -1;
            var start = moment(query.start, "YYYY-MM-DD"),
              end = moment(query.end, "YYYY-MM-DD");
            return value >= start && end >= value;
          }
          function getValue(val, filterByDate, dateFormat) {
            return is_valid_moment_object(val)
              ? filterByDate
                ? val
                : val.format(dateFormat)
              : String(val).toLowerCase();
          }
          var object_filled_keys_count = require("../helpers/object-filled-keys-count"),
            is_valid_moment_object = require("../helpers/is-valid-moment-object");
          module.exports = function(data, query) {
            var totalQueries = query ? 1 : 0;
            if (
              (this.options.filterByColumn &&
                ((query = JSON.parse(query)),
                (totalQueries = object_filled_keys_count(query))),
              !totalQueries)
            )
              return this.$dispatch("vue-tables.filtered", data), data;
            var value,
              found,
              currentQuery,
              filterByDate,
              isListFilter,
              dateFormat = this.options.dateFormat,
              filterable =
                this.options.filterable &&
                "object" == typeof this.options.filterable
                  ? this.options.filterable
                  : this.columns,
              filteredData = data.filter(
                function(row, index) {
                  return (
                    (found = 0),
                    filterable.forEach(
                      function(column) {
                        (filterByDate =
                          this.options.dateColumns.indexOf(column) > -1 &&
                          this.options.filterByColumn),
                          (isListFilter =
                            this.isListFilter(column) &&
                            this.options.filterByColumn),
                          (value = getValue(
                            row[column],
                            filterByDate,
                            dateFormat
                          )),
                          (currentQuery = this.options.filterByColumn
                            ? query[column]
                            : query),
                          (currentQuery = setCurrentQuery(currentQuery)),
                          currentQuery &&
                            foundMatch(currentQuery, value, isListFilter) &&
                            found++;
                      }.bind(this)
                    ),
                    found >= totalQueries
                  );
                }.bind(this)
              );
            return (
              this.$dispatch("vue-tables.filtered", filteredData), filteredData
            );
          };
        },
        {
          "../helpers/is-valid-moment-object": 21,
          "../helpers/object-filled-keys-count": 22
        }
      ],
      16: [
        function(require, module, exports) {
          module.exports = function(data) {
            return (this.count = data.length), data;
          };
        },
        {}
      ],
      17: [
        function(require, module, exports) {
          module.exports = function(a) {
            return this.filter
              ? this.filter(function(i) {
                  return a.indexOf(i) < 0;
                })
              : [];
          };
        },
        {}
      ],
      18: [
        function(require, module, exports) {
          module.exports = function(a, b) {
            for (
              var ai = 0, bi = 0, result = [];
              ai < a.length && bi < b.length;

            )
              a[ai] < b[bi]
                ? ai++
                : a[ai] > b[bi]
                  ? bi++
                  : (result.push(a[ai]), ai++, bi++);
            return result;
          };
        },
        {}
      ],
      19: [
        function(require, module, exports) {
          module.exports = function(replacements, template) {
            template = template || require("../table-template.html");
            for (var replacement in replacements)
              template = template.replace(
                "[[" + replacement + "]]",
                replacements[replacement]
              );
            return template;
          };
        },
        { "../table-template.html": 59 }
      ],
      20: [
        function(require, module, exports) {
          module.exports = function(obj) {
            if (null == obj) return !0;
            if (obj.length > 0) return !1;
            if (0 === obj.length) return !0;
            for (var key in obj)
              if (Object.prototype.hasOwnProperty.call(obj, key)) return !1;
            return !0;
          };
        },
        {}
      ],
      21: [
        function(require, module, exports) {
          module.exports = function(val) {
            return val && "function" == typeof val.isValid && val.isValid();
          };
        },
        {}
      ],
      22: [
        function(require, module, exports) {
          module.exports = function(obj) {
            var count = 0;
            for (var prop in obj) {
              var isDateRange = "object" == typeof obj[prop];
              (isDateRange || (obj[prop] && obj[prop].trim())) && count++;
            }
            return count;
          };
        },
        {}
      ],
      23: [
        function(require, module, exports) {
          module.exports = function() {
            return this.charAt(0).toUpperCase() + this.slice(1);
          };
        },
        {}
      ],
      24: [
        function(require, module, exports) {
          module.exports = function() {
            this.data.forEach(
              function(row, index) {
                this.customColumns.forEach(
                  function(custom) {
                    this.$set(
                      "data[" + index + "]." + custom,
                      this.options.templates[custom]
                    );
                  }.bind(this)
                );
              }.bind(this)
            );
          };
        },
        {}
      ],
      25: [
        function(require, module, exports) {
          module.exports = function() {
            var tbody = this.$els.tbody;
            this.$compile(tbody);
          };
        },
        {}
      ],
      26: [
        function(require, module, exports) {
          module.exports = function(text, value) {
            if (!this.options.texts) return "";
            var text = this.options.texts[text];
            return text && value && (text = text.replace(/{.+}/, value)), text;
          };
        },
        {}
      ],
      27: [
        function(require, module, exports) {
          module.exports = function(column) {
            return this.options.filterable
              ? -1 == this.customColumns.indexOf(column) &&
                  (("boolean" == typeof this.options.filterable &&
                    this.options.filterable) ||
                    this.options.filterable.indexOf(column) > -1)
              : !1;
          };
        },
        {}
      ],
      28: [
        function(require, module, exports) {
          var merge = require("merge");
          module.exports = function() {
            var data = {
              query: this.query,
              limit: this.limit,
              orderBy: this.orderBy.column,
              ascending: this.orderBy.ascending,
              page: this.page,
              byColumn: this.options.filterByColumn ? 1 : 0
            };
            (data = merge(data, this.options.params, this.customQueries)),
              this.$dispatch("vue-tables.loading", data);
            var promise = this.$http.get(this.url, { params: data }).then(
              function(data) {
                return data.json();
              }.bind(this),
              function(e) {
                this.$dispatch("vue-tables.error", e);
              }.bind(this)
            );
            return promise.then(function(data) {
              return (this.loading = !1), this.setData(data);
            });
          };
        },
        { merge: 62 }
      ],
      29: [
        function(require, module, exports) {
          module.exports = function(value) {
            return this.options.headings.hasOwnProperty(value)
              ? this.options.headings[value]
              : value
                  .split("_")
                  .join(" ")
                  .ucfirst();
          };
        },
        {}
      ],
      30: [
        function(require, module, exports) {
          var intersection = require("../helpers/array-intersection");
          module.exports = function() {
            var opts = this.options;
            return (
              opts.dateColumns.length &&
              opts.filterByColumn &&
              (opts.filterable ||
                intersection(opts.filterable, opts.dateColumns).length)
            );
          };
        },
        { "../helpers/array-intersection": 18 }
      ],
      31: [
        function(require, module, exports) {
          module.exports = function() {
            var customQueries = {},
              init = this.options.filtersInitialValues;
            return (
              this.options.customFilters.forEach(function(filter) {
                customQueries[filter.name] = init.hasOwnProperty(filter.name)
                  ? init[filter.name]
                  : "";
              }),
              customQueries
            );
          };
        },
        {}
      ],
      32: [
        function(require, module, exports) {
          var merge = require("merge");
          module.exports = function() {
            var el,
              initialValues,
              init = this.options.filtersInitialValues,
              options = {
                autoUpdateInput: !1,
                singleDatePicker: !1,
                locale: { format: this.options.dateFormat }
              },
              datepickerOptions = merge.recursive(
                this.options.datepickerOptions,
                options
              ),
              that = this;
            that.options.dateColumns.forEach(function(column) {
              (el = $(that.$el).find("#VueTables__" + column + "-filter")),
                (initialValues = {}),
                init.hasOwnProperty(column) &&
                  ((initialValues = {
                    startDate: init[column].start.format(
                      that.options.dateFormat
                    ),
                    endDate: init[column].end.format(that.options.dateFormat)
                  }),
                  el.text(
                    initialValues.startDate + " - " + initialValues.endDate
                  )),
                el.daterangepicker(
                  merge.recursive(datepickerOptions, initialValues)
                ),
                el.on("apply.daterangepicker", function(ev, picker) {
                  (that.query[column] = {
                    start: picker.startDate.format("YYYY-MM-DD"),
                    end: picker.endDate.format("YYYY-MM-DD")
                  }),
                    $(this).text(
                      picker.startDate.format(that.options.dateFormat) +
                        " - " +
                        picker.endDate.format(that.options.dateFormat)
                    ),
                    that.search();
                }),
                el.on("cancel.daterangepicker", function(ev, picker) {
                  (that.query[column] = ""),
                    $(this).html(
                      "<span class='VueTables__filter-placeholder'>" +
                        that.display(
                          "filterBy",
                          that.getHeading(column) + "</span>"
                        )
                    ),
                    that.search();
                });
            });
          };
        },
        { merge: 62 }
      ],
      33: [
        function(require, module, exports) {
          var merge = require("merge");
          module.exports = function(defaults, globalOptions, localOptions) {
            return (
              globalOptions &&
                (defaults = merge.recursive(defaults, globalOptions)),
              (localOptions = merge.recursive(defaults, localOptions))
            );
          };
        },
        { merge: 62 }
      ],
      34: [
        function(require, module, exports) {
          module.exports = function(column) {
            return this.options.orderBy
              ? ((this.orderBy.column = this.options.orderBy.column),
                void (this.orderBy.ascending = this.options.orderBy.ascending
                  ? 1
                  : -1))
              : void (this.orderBy.column = column);
          };
        },
        {}
      ],
      35: [
        function(require, module, exports) {
          function getInitialValue(init, column) {
            return init.hasOwnProperty(column)
              ? "undefined" == typeof init[column].start
                ? init[column]
                : {
                    start: init[column].start.format("YYYY-MM-DD"),
                    end: init[column].end.format("YYYY-MM-DD")
                  }
              : "";
          }
          module.exports = function() {
            var init = this.options.filtersInitialValues;
            if (!this.options.filterByColumn)
              return init.hasOwnProperty("GENERIC") ? init.GENERIC : "";
            var query = {},
              filterable =
                this.options.filterable &&
                "object" == typeof this.options.filterable
                  ? this.options.filterable
                  : this.columns;
            return (
              filterable.forEach(
                function(column) {
                  query[column] = getInitialValue(init, column);
                }.bind(this)
              ),
              query
            );
          };
        },
        {}
      ],
      36: [
        function(require, module, exports) {
          module.exports = function() {
            var customQueries = {},
              init = this.options.filtersInitialValues;
            return (
              this.options.customFilters.forEach(function(filter) {
                customQueries[filter] = init.hasOwnProperty(filter)
                  ? init[filter]
                  : "";
              }),
              customQueries
            );
          };
        },
        {}
      ],
      37: [
        function(require, module, exports) {
          module.exports = function(column) {
            return this.options.dateColumns.indexOf(column) > -1;
          };
        },
        {}
      ],
      38: [
        function(require, module, exports) {
          module.exports = function(column) {
            return this.options.listColumns.hasOwnProperty(column);
          };
        },
        {}
      ],
      39: [
        function(require, module, exports) {
          module.exports = function(column) {
            return (
              -1 == this.options.dateColumns.indexOf(column) &&
              !this.options.listColumns.hasOwnProperty(column)
            );
          };
        },
        {}
      ],
      40: [
        function(require, module, exports) {
          module.exports = function(colName) {
            this.sortable(colName) &&
              (colName == this.orderBy.column &&
                (this.orderBy.ascending = 1 == this.orderBy.ascending ? -1 : 1),
              (this.orderBy.column = colName),
              "server" == this.source && this.getData());
          };
        },
        {}
      ],
      41: [
        function(require, module, exports) {
          module.exports = function() {
            this.search(this.byColumn);
          };
        },
        {}
      ],
      42: [
        function(require, module, exports) {
          module.exports = function() {
            this.options.customFilters.forEach(
              function(filter) {
                this.$on(
                  "vue-tables.filter::" + filter.name,
                  function(value) {
                    this.setPage(1), (this.customQueries[filter.name] = value);
                  }.bind(this)
                );
              }.bind(this)
            );
          };
        },
        {}
      ],
      43: [
        function(require, module, exports) {
          module.exports = function() {
            this.options.customFilters.forEach(
              function(filter) {
                this.$on(
                  "vue-tables.filter::" + filter,
                  function(value) {
                    (this.customQueries[filter] = value), this.refresh();
                  }.bind(this)
                );
              }.bind(this)
            );
          };
        },
        {}
      ],
      44: [
        function(require, module, exports) {
          module.exports = function(row) {
            this.$dispatch("vue-tables.row-click", row);
          };
        },
        {}
      ],
      45: [
        function(require, module, exports) {
          module.exports = function() {
            this.setPage(1),
              "server" == this.source &&
                this.options.pagination.dropdown &&
                this.getData();
          };
        },
        {}
      ],
      46: [
        function(require, module, exports) {
          module.exports = function() {
            var expressions = [
              "count",
              "limit",
              "page",
              "orderBy.column",
              "orderBy.ascending"
            ];
            expressions.forEach(
              function(expression) {
                this.$watch(expression, function() {
                  setTimeout(
                    function() {
                      this.compileTemplates();
                    }.bind(this),
                    0
                  );
                });
              }.bind(this)
            );
          };
        },
        {}
      ],
      47: [
        function(require, module, exports) {
          module.exports = function(data) {
            (this.data = data.data),
              (this.count = data.count),
              this.addCustomColumns(),
              setTimeout(
                function() {
                  this.$dispatch("vue-tables.loaded", data);
                }.bind(this),
                0
              );
          };
        },
        {}
      ],
      48: [
        function(require, module, exports) {
          module.exports = function(page) {
            (this.page = page),
              this.options.pagination.dropdown ||
                (this.$refs.pagination.page = page),
              "server" == this.source && this.getData();
          };
        },
        {}
      ],
      49: [
        function(require, module, exports) {
          module.exports = function(column) {
            var cls = this.options.sortIcon.base + " ";
            if (this.sortable(column))
              return column != this.orderBy.column
                ? cls
                : (cls +=
                    1 == this.orderBy.ascending
                      ? this.options.sortIcon.up
                      : this.options.sortIcon.down);
          };
        },
        {}
      ],
      50: [
        function(require, module, exports) {
          module.exports = function(column) {
            return this.sortable(column) ? "VueTables__sortable" : "";
          };
        },
        {}
      ],
      51: [
        function(require, module, exports) {
          module.exports = function(column) {
            var isCustomColumn = this.customColumns.indexOf(column) > -1;
            if (isCustomColumn) return !1;
            var sortAll =
              "boolean" == typeof this.options.sortable &&
              this.options.sortable;
            return sortAll ? !0 : this.options.sortable.indexOf(column) > -1;
          };
        },
        {}
      ],
      52: [
        function(require, module, exports) {
          module.exports = function() {
            this.data.forEach(
              function(row, index) {
                this.options.dateColumns.forEach(
                  function(column) {
                    row[column] = moment(
                      row[column],
                      this.options.toMomentFormat
                    );
                  }.bind(this)
                );
              }.bind(this)
            );
          };
        },
        {}
      ],
      53: [
        function(require, module, exports) {
          module.exports = {
            computed: {
              listColumnsObject: require("../computed/list-columns-object"),
              allColumns: require("../computed/all-columns"),
              customColumns: require("../computed/custom-columns"),
              templatesKeys: require("../computed/templates-keys")
            }
          };
        },
        {
          "../computed/all-columns": 1,
          "../computed/custom-columns": 2,
          "../computed/list-columns-object": 4,
          "../computed/templates-keys": 6
        }
      ],
      54: [
        function(require, module, exports) {
          function getColumnsDisplay(columnsDisplay) {
            var range,
              device,
              operator,
              res = {};
            for (var column in columnsDisplay) {
              operator = getOperator(columnsDisplay[column]);
              try {
                (device = getDevice(columnsDisplay[column])),
                  (range = getRange(device, operator)),
                  (res[column] = range.concat([operator]));
              } catch (err) {
                console.warn("Unknown device " + device);
              }
            }
            return res;
          }
          function getRange(device, operator) {
            var devices = {
              desktop: [1024, null],
              tablet: [480, 1024],
              mobile: [0, 480],
              tabletL: [768, 1024],
              tabletP: [480, 768],
              mobileL: [320, 480],
              mobileP: [0, 320]
            };
            switch (operator) {
              case "min":
                return [devices[device][0], null];
              case "max":
                return [0, devices[device][1]];
              default:
                return devices[device];
            }
          }
          function getOperator(val) {
            var pieces = val.split("_");
            return ["not", "min", "max"].indexOf(pieces[0]) > -1
              ? pieces[0]
              : !1;
          }
          function getDevice(val) {
            var pieces = val.split("_");
            return pieces.length > 1 ? pieces[1] : pieces[0];
          }
          var is_empty = require("../helpers/is-empty");
          module.exports = {
            created: function() {
              is_empty(this.options.columnsDisplay) ||
                ((this.columnsDisplay = getColumnsDisplay(
                  this.options.columnsDisplay
                )),
                window.addEventListener(
                  "resize",
                  function() {
                    this.windowWidth = window.innerWidth;
                  }.bind(this)
                ));
            }
          };
        },
        { "../helpers/is-empty": 20 }
      ],
      55: [
        function(require, module, exports) {
          function makeId() {
            for (
              var text = "",
                possible =
                  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
                i = 0;
              5 > i;
              i++
            )
              text += possible.charAt(
                Math.floor(Math.random() * possible.length)
              );
            return text;
          }
          module.exports = {
            data: function() {
              return {
                id: makeId(),
                customColumns: [],
                allColumns: [],
                customQueries: {},
                totalPages: null,
                query: null,
                page: 1,
                count: 0,
                limit: 10,
                windowWidth: window.innerWidth,
                orderBy: { column: "id", ascending: 1 }
              };
            }
          };
        },
        {}
      ],
      56: [
        function(require, module, exports) {
          module.exports = {
            filters: {
              render: require("../filters/render"),
              highlightMatches: require("../filters/highlight-matches"),
              optionText: require("../filters/option-text")
            }
          };
        },
        {
          "../filters/highlight-matches": 11,
          "../filters/option-text": 12,
          "../filters/render": 14
        }
      ],
      57: [
        function(require, module, exports) {
          module.exports = {
            methods: {
              initQuery: require("../methods/init-query"),
              initOptions: require("../methods/init-options"),
              sortableClass: require("../methods/sortable-class"),
              sortableChevronClass: require("../methods/sortable-chevron-class"),
              display: require("../methods/display"),
              orderByColumn: require("../methods/order-by-column"),
              getHeading: require("../methods/get-heading"),
              addCustomColumns: require("../methods/add-custom-columns"),
              sortable: require("../methods/sortable"),
              display: require("../methods/display"),
              search: require("../methods/search"),
              initOrderBy: require("../methods/init-order-by"),
              compileTemplates: require("../methods/compile-templates"),
              initDateFilters: require("../methods/init-date-filters"),
              setPage: require("../methods/set-page"),
              filterable: require("../methods/filterable"),
              isTextFilter: require("../methods/is-text-filter"),
              isDateFilter: require("../methods/is-date-filter"),
              isListFilter: require("../methods/is-list-filter"),
              hasDateFilters: require("../methods/has-date-filters"),
              rowWasClicked: require("../methods/row-was-clicked")
            }
          };
        },
        {
          "../methods/add-custom-columns": 24,
          "../methods/compile-templates": 25,
          "../methods/display": 26,
          "../methods/filterable": 27,
          "../methods/get-heading": 29,
          "../methods/has-date-filters": 30,
          "../methods/init-date-filters": 32,
          "../methods/init-options": 33,
          "../methods/init-order-by": 34,
          "../methods/init-query": 35,
          "../methods/is-date-filter": 37,
          "../methods/is-list-filter": 38,
          "../methods/is-text-filter": 39,
          "../methods/order-by-column": 40,
          "../methods/row-was-clicked": 44,
          "../methods/search": 45,
          "../methods/set-page": 48,
          "../methods/sortable": 51,
          "../methods/sortable-chevron-class": 49,
          "../methods/sortable-class": 50
        }
      ],
      58: [
        function(require, module, exports) {
          module.exports = {
            ready: function() {
              this.$on(
                "vue-pagination::" + this.id,
                function(page) {
                  this.setPage(page);
                }.bind(this)
              ),
                this.$compile(this.$els.headings);
            }
          };
        },
        {}
      ],
      59: [
        function(require, module, exports) {
          module.exports =
            '<div class="VueTables VueTables--[[source]]">\n  <div class="row">\n    <div class="col-md-6">\n      <div v-if="!options.filterByColumn && options.filterable" class="form-group form-inline pull-left VueTables__search">\n        <label>{{display(\'filter\')}}</label>\n        <input class="form-control"\n        type="text"\n        placeholder="{{display(\'filterPlaceholder\')}}"\n        @keydown="search() | debounce options.delay"\n        v-model="query"/>\n      </div>\n    </div>\n\n    <div class="col-md-6">\n      <div v-if="options.pagination && options.pagination.dropdown && totalPages>0"\n        class="form-group form-inline pull-right VueTables__dropdown-pagination">\n        <label>{{display(\'page\')}}</label>\n        <select class="form-control"\n        v-model="page"\n        @change="setPage(page)">\n        <option v-for="page in totalPages">{{page+1}}</option>\n      </select>\n    </div>\n\n    <div class="form-group form-inline pull-right VueTables__limit">\n     <label>{{display(\'limit\')}}</label>\n     <select class="form-control"\n     v-model="limit"\n     @change="setPage(1)" >\n     <option v-for="value in options.perPageValues">{{value}}</option>\n   </select>\n </div>\n</div>\n</div>\n\n<div class="VueTables__table-wrapper" v-bind:class="options.wrapperClasses">\n  <table class="VueTables__table table" v-bind:class="options.skin">\n    <thead>\n      <tr v-el:headings>\n       <th @click="orderByColumn(column)"\n       v-for="column in allColumns"\n       v-bind:class="sortableClass(column)"><span class="VueTables__heading">{{{getHeading(column)}}}</span>\n       <span v-if="sortable(column)"\n       class="VueTables__sort-icon pull-right"\n       v-bind:class="sortableChevronClass(column)"></span></th>\n     </tr>\n     <tr v-if="options.filterByColumn" class="VueTables__filters-row">\n      <th v-for="column in allColumns">\n        <div class="VueTables__column-filter VueTables__{{column}}-filter-wrapper" v-if="filterable(column)">\n          <input @keydown="search() | debounce options.delay"\n          v-if="isTextFilter(column)"\n          class="form-control"\n          type="text"\n          placeholder="{{display(\'filterBy\',getHeading(column))}}"\n          v-model="query[column]">\n\n          <div class="VueTables__date-filter"\n          id="VueTables__{{column}}-filter"\n          v-if="isDateFilter(column)">\n          <span class="VueTables__filter-placeholder">{{display(\'filterBy\',getHeading(column))}}</span>\n        </div>\n\n        <div class="VueTables__list-filter"\n        id="VueTables__{{column}}-filter"\n        v-if="isListFilter(column)">\n        <select class=\'form-control\'\n        @change="search()"\n        v-model="query[column]">\n        <option value="">{{display(\'defaultOption\',getHeading(column))}}</option>\n        <option v-for="option in options.listColumns[column]" value="{{option.id}}">{{option.text}}</option>\n      </select>\n    </div>\n\n  </div>\n</th>\n</tr>\n</thead>\n<tfoot v-if="options.footerHeadings">\n <tr>\n   <th @click="orderByColumn(column)"\n   v-for="column in allColumns"\n   v-bind:class="sortableClass(column)"><span class="VueTables__heading">{{getHeading(column)}}</span>\n   <span v-if="sortable(column)"\n   class="VueTables__sort-icon pull-right"\n   v-bind:class="sortableChevronClass(column)"></span></th>\n </tr>\n</tfoot>\n<tbody v-el:tbody>\n <tr v-for="row in data [[rowFilters]]" [[trackBy]] @click=\'rowWasClicked(row)\'>\n   <td v-for="column in allColumns"\n   v-html="row[column] | render row column [[columnFilters]]"></td>\n </tr>\n\n <tr v-if="count==0"\n class="VueTables__no-results">\n <td class="text-center"\n colspan="{{allColumns.length}}">\n {{display([[loading]]\'noResults\')}}\n</td>\n</tr>\n</tbody>\n</table>\n</div>\n\n<pagination\nv-ref:pagination\nv-if="options.pagination && !options.pagination.dropdown"\n:for="id"\n:records="count"\n:per-page="parseInt(limit)"\n:chunk="options.pagination.chunk"\n:count-text="options.texts.count">\n</pagination>\n\n<div v-if="count>0 && options.pagination.dropdown" class="VuePagination">\n  <p class="VuePagination__count">{{display(\'count\', count)}}</p>\n</div>\n\n</div>\n\n';
        },
        {}
      ],
      60: [
        function(require, module, exports) {
          var methods = require("./mixins/methods"),
            filters = require("./mixins/filters"),
            computed = require("./mixins/computed"),
            data = require("./mixins/data"),
            created = require("./mixins/created"),
            ready = require("./mixins/ready"),
            template = require("./helpers/generate-table-html"),
            VuePagination = require("v-pagination");
          exports.install = function(Vue, globalOptions, customOptions) {
            Vue.use(VuePagination);
            var customTemplate =
                customOptions && customOptions.template
                  ? customOptions.template
                  : void 0,
              client = {
                template: template(
                  {
                    source: "Client",
                    rowFilters:
                      "| customFilters customQ | search q | orderBy orderBy.column orderBy.ascending | setCount | page",
                    trackBy: ':track-by="options.trackBy"',
                    columnFilters:
                      "| date | optionText column | highlightMatches column",
                    loading: ""
                  },
                  customTemplate
                ),
                mixins: [data, methods, filters, computed, created, ready],
                props: {
                  columns: { type: Array, required: !0 },
                  data: { type: Array, required: !0 },
                  options: {
                    type: Object,
                    required: !1,
                    default: function() {
                      return {};
                    }
                  }
                },
                created: function() {
                  var defaults = require("./config/defaults")("client");
                  (this.options = this.initOptions(
                    defaults,
                    globalOptions,
                    this.options
                  )),
                    this.options.compileTemplates && this.setClientWatchers(),
                    (this.limit = this.options.perPage),
                    this.addCustomColumns(),
                    this.initOrderBy(this.columns[0]),
                    (this.query = this.initQuery()),
                    (this.customQueries = this.initClientFilters()),
                    (this.count = this.data.length);
                },
                ready: function() {
                  this.$watch(
                    "query",
                    function() {
                      this.setPage(1);
                    }.bind(this),
                    { deep: !0 }
                  ),
                    this.registerClientFilters(),
                    this.hasDateFilters() && this.initDateFilters(),
                    this.options.dateColumns.length &&
                      this.options.toMomentFormat &&
                      this.transformDateStringsToMoment();
                },
                data: function() {
                  return { source: "client" };
                },
                computed: {
                  q: require("./computed/q"),
                  customQ: require("./computed/custom-q"),
                  totalPages: require("./computed/total-pages")
                },
                filters: {
                  page: require("./filters/page"),
                  setCount: require("./filters/set-count"),
                  date: require("./filters/date"),
                  search: require("./filters/search"),
                  customFilters: require("./filters/custom-filters")
                },
                methods: {
                  setClientWatchers: require("./methods/set-client-watchers"),
                  transformDateStringsToMoment: require("./methods/transform-date-strings-to-moment"),
                  registerClientFilters: require("./methods/register-client-filters"),
                  initClientFilters: require("./methods/init-client-filters")
                }
              };
            Vue.component("v-client-table", client);
          };
        },
        {
          "./computed/custom-q": 3,
          "./computed/q": 5,
          "./computed/total-pages": 7,
          "./config/defaults": 8,
          "./filters/custom-filters": 9,
          "./filters/date": 10,
          "./filters/page": 13,
          "./filters/search": 15,
          "./filters/set-count": 16,
          "./helpers/generate-table-html": 19,
          "./methods/init-client-filters": 31,
          "./methods/register-client-filters": 42,
          "./methods/set-client-watchers": 46,
          "./methods/transform-date-strings-to-moment": 52,
          "./mixins/computed": 53,
          "./mixins/created": 54,
          "./mixins/data": 55,
          "./mixins/filters": 56,
          "./mixins/methods": 57,
          "./mixins/ready": 58,
          "v-pagination": 63
        }
      ],
      61: [
        function(require, module, exports) {
          var methods = require("./mixins/methods"),
            filters = require("./mixins/filters"),
            computed = require("./mixins/computed"),
            data = require("./mixins/data"),
            created = require("./mixins/created"),
            ready = require("./mixins/ready"),
            template = require("./helpers/generate-table-html"),
            VuePagination = require("v-pagination");
          exports.install = function(Vue, globalOptions, customOptions) {
            Vue.use(VuePagination);
            var customTemplate =
                customOptions && customOptions.template
                  ? customOptions.template
                  : void 0,
              server = {
                template: template(
                  {
                    source: "Server",
                    rowFilters: "",
                    trackBy: "",
                    columnFilters:
                      "| optionText column | highlightMatches column",
                    loading: "loading?'loading':"
                  },
                  customTemplate
                ),
                mixins: [data, methods, filters, computed, created, ready],
                props: {
                  columns: { type: Array, required: !0 },
                  url: { type: String, required: !0 },
                  options: {
                    type: Object,
                    required: !1,
                    default: function() {
                      return {};
                    }
                  }
                },
                created: function() {
                  var defaults = require("./config/defaults")("server");
                  (this.options = this.initOptions(
                    defaults,
                    globalOptions,
                    this.options
                  )),
                    (this.query = this.initQuery()),
                    this.options.compileTemplates &&
                      this.$on("vue-tables.loaded", function() {
                        this.compileTemplates();
                      }),
                    this.initOrderBy(this.columns[0]),
                    (this.limit = this.options.perPage),
                    (this.customQueries = this.initServerFilters()),
                    this.hasDateFilters() &&
                      setTimeout(
                        function() {
                          this.initDateFilters();
                        }.bind(this),
                        0
                      ),
                    this.getData();
                },
                ready: function() {
                  this.registerServerFilters();
                },
                data: function() {
                  return {
                    source: "server",
                    data: [],
                    loading: !0,
                    lastKeyStrokeAt: !1
                  };
                },
                methods: {
                  refresh: require("./methods/refresh"),
                  getData: require("./methods/get-data"),
                  setData: require("./methods/set-data"),
                  registerServerFilters: require("./methods/register-server-filters"),
                  initServerFilters: require("./methods/init-server-filters")
                },
                computed: { totalPages: require("./computed/total-pages") }
              };
            Vue.component("v-server-table", server);
          };
        },
        {
          "./computed/total-pages": 7,
          "./config/defaults": 8,
          "./helpers/generate-table-html": 19,
          "./methods/get-data": 28,
          "./methods/init-server-filters": 36,
          "./methods/refresh": 41,
          "./methods/register-server-filters": 43,
          "./methods/set-data": 47,
          "./mixins/computed": 53,
          "./mixins/created": 54,
          "./mixins/data": 55,
          "./mixins/filters": 56,
          "./mixins/methods": 57,
          "./mixins/ready": 58,
          "v-pagination": 63
        }
      ],
      62: [
        function(require, module, exports) {
          !(function(isNode) {
            function merge_recursive(base, extend) {
              if ("object" !== typeOf(base)) return extend;
              for (var key in extend)
                "object" === typeOf(base[key]) &&
                "object" === typeOf(extend[key])
                  ? (base[key] = merge_recursive(base[key], extend[key]))
                  : (base[key] = extend[key]);
              return base;
            }
            function merge(clone, recursive, argv) {
              var result = argv[0],
                size = argv.length;
              (clone || "object" !== typeOf(result)) && (result = {});
              for (var index = 0; size > index; ++index) {
                var item = argv[index],
                  type = typeOf(item);
                if ("object" === type)
                  for (var key in item) {
                    var sitem = clone ? Public.clone(item[key]) : item[key];
                    recursive
                      ? (result[key] = merge_recursive(result[key], sitem))
                      : (result[key] = sitem);
                  }
              }
              return result;
            }
            function typeOf(input) {
              return {}.toString
                .call(input)
                .slice(8, -1)
                .toLowerCase();
            }
            var Public = function(clone) {
                return merge(clone === !0, !1, arguments);
              },
              publicName = "merge";
            (Public.recursive = function(clone) {
              return merge(clone === !0, !0, arguments);
            }),
              (Public.clone = function(input) {
                var index,
                  size,
                  output = input,
                  type = typeOf(input);
                if ("array" === type)
                  for (
                    output = [], size = input.length, index = 0;
                    size > index;
                    ++index
                  )
                    output[index] = Public.clone(input[index]);
                else if ("object" === type) {
                  output = {};
                  for (index in input)
                    output[index] = Public.clone(input[index]);
                }
                return output;
              }),
              isNode
                ? (module.exports = Public)
                : (window[publicName] = Public);
          })(
            "object" == typeof module &&
              module &&
              "object" == typeof module.exports &&
              module.exports
          );
        },
        {}
      ],
      63: [
        function(require, module, exports) {
          function range(start, count) {
            return Array.apply(0, Array(count)).map(function(element, index) {
              return index + start;
            });
          }
          exports.install = function(Vue) {
            Vue.component("pagination", {
              template: require("./src/template.html"),
              data: function() {
                return { page: 1 };
              },
              props: {
                for: { type: String, required: !0 },
                records: { type: Number, required: !0 },
                perPage: {
                  type: Number,
                  required: !1,
                  default: 25
                },
                chunk: { type: Number, required: !1, default: 10 },
                countText: {
                  type: String,
                  required: !1,
                  default: "{count} records"
                }
              },
              computed: {
                pages: function() {
                  return this.records
                    ? range(this.paginationStart, this.pagesInCurrentChunk)
                    : [];
                },
                totalPages: function() {
                  return this.records
                    ? Math.ceil(this.records / this.perPage)
                    : 1;
                },
                totalChunks: function() {
                  return Math.ceil(this.totalPages / this.chunk);
                },
                currentChunk: function() {
                  return Math.ceil(this.page / this.chunk);
                },
                paginationStart: function() {
                  return (this.currentChunk - 1) * this.chunk + 1;
                },
                count: function() {
                  return this.countText.replace("{count}", this.records);
                },
                pagesInCurrentChunk: function() {
                  return this.paginationStart + this.chunk <= this.totalPages
                    ? this.chunk
                    : this.totalPages - this.paginationStart + 1;
                }
              },
              methods: {
                setPage: function(page) {
                  return this.allowedPage(page)
                    ? ((this.page = page),
                      this.$dispatch("vue-pagination::" + this["for"], page),
                      !0)
                    : !1;
                },
                next: function() {
                  return this.setPage(this.page + 1);
                },
                prev: function() {
                  return this.setPage(this.page - 1);
                },
                nextChunk: function() {
                  return this.setChunk(1);
                },
                prevChunk: function() {
                  return this.setChunk(-1);
                },
                setChunk: function(direction) {
                  this.setPage(
                    (this.currentChunk - 1 + direction) * this.chunk + 1
                  );
                },
                allowedPage: function(page) {
                  return page >= 1 && page <= this.totalPages;
                },
                allowedChunk: function(direction) {
                  return (
                    (1 == direction && this.currentChunk < this.totalChunks) ||
                    (-1 == direction && this.currentChunk > 1)
                  );
                },
                isActive: function(page) {
                  return this.page == page;
                }
              }
            });
          };
        },
        { "./src/template.html": 64 }
      ],
      64: [
        function(require, module, exports) {
          module.exports =
            '<div class="VuePagination">\n  <ul v-show="totalPages>1"\n  class="pagination VuePagination__pagination">\n\n  <li class="VuePagination__pagination-item VuePagination__pagination-item-prev-chunk"\n  v-bind:class="allowedChunk(-1)?\'\':\'disabled\'">\n  <a href="javascript:void(0);"\n  @click="prevChunk()">&lt;&lt;</a>\n</li>\n\n\n<li class="VuePagination__pagination-item VuePagination__pagination-item-prev-page"\nv-bind:class="allowedPage(page-1)?\'\':\'disabled\'">\n<a href="javascript:void(0);"\n@click="prev()">&lt;</a>\n</li>\n\n<li class="VuePagination__pagination-item"\nv-for="page in pages"\nv-bind:class="isActive(page)?\'active\':\'\'">\n<a href="javascript:void(0);"\n@click="setPage(page)">{{page}}</a>\n</li>\n\n<li class="VuePagination__pagination-item VuePagination__pagination-item-next-page"\nv-bind:class="allowedPage(page + 1)?\'\':\'disabled\'">\n<a href="javascript:void(0);"\n@click="next()">&gt;</a>\n</li>\n\n<li class="VuePagination__pagination-item VuePagination__pagination-item-next-chunk"\nv-bind:class="allowedChunk(1)?\'\':\'disabled\'">\n<a href="javascript:void(0);"\n@click="nextChunk()">&gt;&gt;</a>\n</li>\n</ul>\n\n<p v-if="records>0"\nclass="VuePagination__count">{{count}}</p>\n</div>\n';
        },
        {}
      ],
      65: [
        function(require, module, exports) {
          (String.prototype.ucfirst = require("./lib/helpers/ucfirst")),
            (Array.prototype.diff = require("./lib/helpers/array-diff")),
            (exports.client = require("./lib/v-client-table")),
            (exports.server = require("./lib/v-server-table"));
        },
        {
          "./lib/helpers/array-diff": 17,
          "./lib/helpers/ucfirst": 23,
          "./lib/v-client-table": 60,
          "./lib/v-server-table": 61
        }
      ]
    },
    {},
    [65]
  )(65);
});